"use client";

import { useMemo, useState } from "react";
import { distributors, type DistributorId } from "@/backoffice/data/distributors";
import {
  catalogItems,
  getCatalogByDistributor,
  getLowStockItems,
  getSuggestedQuantity,
  type CatalogItem,
} from "@/backoffice/data/order-catalog";
import {
  formatOrderCurrency,
  generateOrderId,
  initialOrderHistory,
  ORDER_STORAGE_KEY,
  type OrderLine,
  type PurchaseOrder,
} from "@/backoffice/data/orders";

type Tab = "order" | "history";

interface CartLine {
  catalogItemId: string;
  quantity: number;
}

function readOrderHistory(): PurchaseOrder[] {
  if (typeof window === "undefined") {
    return initialOrderHistory;
  }

  const stored = localStorage.getItem(ORDER_STORAGE_KEY);
  if (!stored) {
    return initialOrderHistory;
  }

  try {
    return JSON.parse(stored) as PurchaseOrder[];
  } catch {
    return initialOrderHistory;
  }
}

function getStockStatus(item: CatalogItem): "low" | "ok" {
  return item.onHand <= item.reorderPoint ? "low" : "ok";
}

function getNextDeliveryDate(distributorId: DistributorId): string {
  const today = new Date();
  const offsets: Record<DistributorId, number> = {
    sysco: 1,
    "la-tortilla": 2,
    "restaurant-depot": 0,
    "coca-cola": 5,
  };
  const delivery = new Date(today);
  delivery.setDate(delivery.getDate() + offsets[distributorId]);
  return delivery.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function OrderingSystem() {
  const [activeTab, setActiveTab] = useState<Tab>("order");
  const [activeDistributor, setActiveDistributor] = useState<DistributorId>("sysco");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orderNotes, setOrderNotes] = useState("");
  const [orderHistory, setOrderHistory] = useState<PurchaseOrder[]>(readOrderHistory);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const distributor = distributors.find((entry) => entry.id === activeDistributor)!;
  const catalog = getCatalogByDistributor(activeDistributor);
  const lowStockCount = getLowStockItems().length;

  const cartLines = useMemo(() => {
    return cart
      .map((line) => {
        const item = catalogItems.find((entry) => entry.id === line.catalogItemId);
        if (!item || item.distributorId !== activeDistributor) {
          return null;
        }
        return { item, quantity: line.quantity };
      })
      .filter((line): line is { item: CatalogItem; quantity: number } => line !== null);
  }, [cart, activeDistributor]);

  const cartSubtotal = cartLines.reduce(
    (sum, line) => sum + line.item.unitPrice * line.quantity,
    0,
  );

  const meetsMinimum =
    distributor.minimumOrder === 0 || cartSubtotal >= distributor.minimumOrder;

  function getCartQuantity(itemId: string): number {
    return cart.find((line) => line.catalogItemId === itemId)?.quantity ?? 0;
  }

  function updateCartQuantity(itemId: string, quantity: number) {
    setSubmitMessage(null);
    if (quantity <= 0) {
      setCart((prev) => prev.filter((line) => line.catalogItemId !== itemId));
      return;
    }
    setCart((prev) => {
      const existing = prev.find((line) => line.catalogItemId === itemId);
      if (existing) {
        return prev.map((line) =>
          line.catalogItemId === itemId ? { ...line, quantity } : line,
        );
      }
      return [...prev, { catalogItemId: itemId, quantity }];
    });
  }

  function addSuggestedItems() {
    const suggestions = catalog
      .map((item) => ({ item, qty: getSuggestedQuantity(item) }))
      .filter((entry) => entry.qty > 0);

    suggestions.forEach(({ item, qty }) => updateCartQuantity(item.id, qty));
    setSubmitMessage(`Added ${suggestions.length} suggested items to your ${distributor.shortName} order.`);
  }

  function clearDistributorCart() {
    setCart((prev) =>
      prev.filter((line) => {
        const item = catalogItems.find((entry) => entry.id === line.catalogItemId);
        return item?.distributorId !== activeDistributor;
      }),
    );
    setOrderNotes("");
    setSubmitMessage(null);
  }

  function submitOrder() {
    if (cartLines.length === 0) {
      setSubmitMessage("Add at least one item before submitting.");
      return;
    }
    if (!meetsMinimum) {
      setSubmitMessage(
        `${distributor.shortName} orders require a $${distributor.minimumOrder} minimum. Add $${(distributor.minimumOrder - cartSubtotal).toFixed(2)} more.`,
      );
      return;
    }

    const lines: OrderLine[] = cartLines.map(({ item, quantity }) => ({
      catalogItemId: item.id,
      name: item.name,
      sku: item.sku,
      quantity,
      unitPrice: item.unitPrice,
      unit: item.unit,
    }));

    const order: PurchaseOrder = {
      id: generateOrderId(),
      distributorId: activeDistributor,
      distributorName: distributor.name,
      status: "submitted",
      createdAt: new Date().toISOString(),
      requestedDelivery: getNextDeliveryDate(activeDistributor),
      lines,
      subtotal: cartSubtotal,
      notes: orderNotes.trim() || undefined,
    };

    const updated = [order, ...orderHistory];
    setOrderHistory(updated);
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updated));
    clearDistributorCart();
    setActiveTab("history");
    setSubmitMessage(`Order ${order.id} submitted to ${distributor.shortName}.`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("order")}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              activeTab === "order"
                ? "bg-taco-teal text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            New Order
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              activeTab === "history"
                ? "bg-taco-teal text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Order History
          </button>
        </div>
        {lowStockCount > 0 && activeTab === "order" && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
            {lowStockCount} items below reorder point
          </span>
        )}
      </div>

      {submitMessage && (
        <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
          {submitMessage}
        </div>
      )}

      {activeTab === "order" ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {distributors.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveDistributor(entry.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  activeDistributor === entry.id
                    ? "border-taco-teal bg-teal-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div
                  className="mb-2 h-1 w-10 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <p className="font-bold text-taco-dark">{entry.shortName}</p>
                <p className="mt-1 text-xs text-gray-500">Acct {entry.accountNumber}</p>
                <p className="mt-2 text-xs text-gray-400">
                  Orders: {entry.orderDays.join(", ")}
                </p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-taco-dark">{distributor.name}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Account {distributor.accountNumber} · Delivery: {distributor.deliveryLead}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {distributor.contactEmail} · {distributor.contactPhone}
                </p>
              </div>
              <button
                type="button"
                onClick={addSuggestedItems}
                className="rounded-xl border border-taco-teal px-4 py-2 text-sm font-bold text-taco-teal transition hover:bg-teal-50"
              >
                Auto-fill from par levels
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div className="space-y-3 lg:hidden">
                {catalog.map((item) => {
                  const qty = getCartQuantity(item.id);
                  const status = getStockStatus(item);
                  const suggested = getSuggestedQuantity(item);

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold text-taco-dark">{item.name}</p>
                          <p className="text-xs text-gray-400">
                            {item.sku} · {formatOrderCurrency(item.unitPrice)}/{item.unit}
                          </p>
                        </div>
                        {status === "low" && (
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                            Low
                          </span>
                        )}
                      </div>
                      <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <dt className="text-gray-400">On Hand</dt>
                          <dd className="font-bold">{item.onHand}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-400">Par</dt>
                          <dd className="font-bold">{item.par}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-400">Suggest</dt>
                          <dd className="font-bold text-taco-teal">{suggested}</dd>
                        </div>
                      </dl>
                      <div className="mt-3 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, suggested)}
                          className="text-xs font-bold text-taco-teal hover:underline"
                        >
                          Use suggested
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, Math.max(qty - 1, 0))}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold">{qty}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, qty + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-bold text-taco-dark">Product</th>
                      <th className="px-4 py-3 font-bold text-taco-dark">On Hand</th>
                      <th className="px-4 py-3 font-bold text-taco-dark">Par</th>
                      <th className="px-4 py-3 font-bold text-taco-dark">Price</th>
                      <th className="px-4 py-3 font-bold text-taco-dark">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalog.map((item) => {
                      const qty = getCartQuantity(item.id);
                      const status = getStockStatus(item);

                      return (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="px-4 py-3">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-gray-400">{item.sku}</p>
                            {status === "low" && (
                              <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                                Below reorder point
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">{item.onHand}</td>
                          <td className="px-4 py-3">{item.par}</td>
                          <td className="px-4 py-3">
                            {formatOrderCurrency(item.unitPrice)}
                            <span className="text-gray-400">/{item.unit}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQuantity(item.id, Math.max(qty - 1, 0))
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min={0}
                                value={qty}
                                onChange={(event) =>
                                  updateCartQuantity(
                                    item.id,
                                    Number.parseInt(event.target.value, 10) || 0,
                                  )
                                }
                                className="w-14 rounded-lg border border-gray-200 px-2 py-1 text-center"
                              />
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, qty + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200"
                              >
                                +
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQuantity(item.id, getSuggestedQuantity(item))
                                }
                                className="text-xs font-bold text-taco-teal hover:underline"
                              >
                                Par
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:sticky lg:top-6 lg:self-start">
              <h3 className="font-bold text-taco-dark">Order Cart — {distributor.shortName}</h3>
              <p className="mt-1 text-xs text-gray-400">
                Est. delivery: {getNextDeliveryDate(activeDistributor)}
              </p>

              {cartLines.length === 0 ? (
                <p className="mt-6 text-sm text-gray-500">
                  No items in cart. Add products or use auto-fill from par levels.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {cartLines.map(({ item, quantity }) => (
                    <li
                      key={item.id}
                      className="flex items-start justify-between gap-2 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-400">
                          {quantity} × {formatOrderCurrency(item.unitPrice)}
                        </p>
                      </div>
                      <p className="font-bold">
                        {formatOrderCurrency(item.unitPrice * quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">{formatOrderCurrency(cartSubtotal)}</span>
                </div>
                {distributor.minimumOrder > 0 && (
                  <p
                    className={`mt-2 text-xs ${
                      meetsMinimum ? "text-green-600" : "text-amber-600"
                    }`}
                  >
                    {meetsMinimum
                      ? "Minimum order met"
                      : `$${(distributor.minimumOrder - cartSubtotal).toFixed(2)} below $${distributor.minimumOrder} minimum`}
                  </p>
                )}
              </div>

              <label className="mt-4 block text-sm font-bold text-taco-dark">
                Delivery notes
                <textarea
                  value={orderNotes}
                  onChange={(event) => setOrderNotes(event.target.value)}
                  rows={3}
                  placeholder="Dock instructions, substitute approvals..."
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-normal"
                />
              </label>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={submitOrder}
                  disabled={cartLines.length === 0}
                  className="rounded-xl bg-taco-teal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit to {distributor.shortName}
                </button>
                <button
                  type="button"
                  onClick={clearDistributorCart}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {orderHistory.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
              No orders yet. Place your first distributor order to see it here.
            </div>
          ) : (
            orderHistory.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-bold text-taco-dark">{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.distributorName}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      Placed{" "}
                      {new Date(order.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                      {" · "}Delivery est. {order.requestedDelivery}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "submitted"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="mt-2 font-bold">{formatOrderCurrency(order.subtotal)}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-1 border-t border-gray-100 pt-4 text-sm">
                  {order.lines.map((line) => (
                    <li key={`${order.id}-${line.sku}`} className="flex justify-between gap-4">
                      <span className="text-gray-600">
                        {line.quantity}× {line.name}
                      </span>
                      <span className="font-medium">
                        {formatOrderCurrency(line.unitPrice * line.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                {order.notes && (
                  <p className="mt-3 text-xs text-gray-400">Notes: {order.notes}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
