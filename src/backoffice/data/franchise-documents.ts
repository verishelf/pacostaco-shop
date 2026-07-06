export type FranchiseDocumentCategory =
  | "operations"
  | "marketing"
  | "legal"
  | "training";

export interface FranchiseDocument {
  id: string;
  slug: string;
  title: string;
  category: FranchiseDocumentCategory;
  description: string;
  updatedAt: string;
  fileName: string;
  pages?: number;
}

export const categoryLabels: Record<FranchiseDocumentCategory, string> = {
  operations: "Operations",
  marketing: "Marketing",
  legal: "Legal",
  training: "Training",
};

export const franchiseDocuments: FranchiseDocument[] = [
  {
    id: "doc-1",
    slug: "operations-manual",
    title: "Operations Manual v4.2",
    category: "operations",
    description:
      "Daily standards for food quality, guest service, cash handling, and store leadership.",
    updatedAt: "2026-06-01",
    fileName: "operations-manual-v4.2.md",
    pages: 28,
  },
  {
    id: "doc-2",
    slug: "food-safety-guide",
    title: "Food Safety & Sanitation Guide",
    category: "operations",
    description:
      "Temperature controls, allergen protocols, cleaning schedules, and health inspection readiness.",
    updatedAt: "2026-05-20",
    fileName: "food-safety-sanitation-guide.md",
    pages: 16,
  },
  {
    id: "doc-3",
    slug: "opening-closing-procedures",
    title: "Opening & Closing Procedures",
    category: "operations",
    description:
      "Shift checklists for managers and crew leads covering prep, security, and cash reconciliation.",
    updatedAt: "2026-04-15",
    fileName: "opening-closing-procedures.md",
    pages: 8,
  },
  {
    id: "doc-4",
    slug: "inventory-ordering",
    title: "Inventory Par Levels & Ordering Guide",
    category: "operations",
    description:
      "Approved vendors, par levels, receiving standards, and waste tracking for franchise locations.",
    updatedAt: "2026-05-01",
    fileName: "inventory-par-levels-ordering.md",
    pages: 12,
  },
  {
    id: "doc-5",
    slug: "brand-style-guide",
    title: "Brand Style Guide",
    category: "marketing",
    description:
      "Logo usage, color palette, typography, photography standards, and brand voice for Paco's Taco Shop.",
    updatedAt: "2026-05-15",
    fileName: "brand-style-guide.md",
    pages: 14,
  },
  {
    id: "doc-6",
    slug: "local-marketing-playbook",
    title: "Local Store Marketing Playbook",
    category: "marketing",
    description:
      "Grand opening, community partnerships, catering outreach, and co-op marketing fund usage.",
    updatedAt: "2026-03-28",
    fileName: "local-marketing-playbook.md",
    pages: 18,
  },
  {
    id: "doc-7",
    slug: "franchise-agreement",
    title: "Franchise Agreement",
    category: "legal",
    description:
      "Executed franchise agreement outlining territory, fees, term length, and owner obligations.",
    updatedAt: "2024-03-10",
    fileName: "franchise-agreement.md",
    pages: 22,
  },
  {
    id: "doc-8",
    slug: "franchise-disclosure-summary",
    title: "Franchise Disclosure Document Summary",
    category: "legal",
    description:
      "Summary of FDD Items 1–23 including fees, litigation history, and financial performance representations.",
    updatedAt: "2026-01-15",
    fileName: "franchise-disclosure-summary.md",
    pages: 10,
  },
  {
    id: "doc-9",
    slug: "new-hire-training",
    title: "New Hire Training Program",
    category: "training",
    description:
      "14-day onboarding path for crew members covering stations, service standards, and certification.",
    updatedAt: "2026-04-20",
    fileName: "new-hire-training-program.md",
    pages: 15,
  },
  {
    id: "doc-10",
    slug: "manager-certification",
    title: "Manager Certification Roadmap",
    category: "training",
    description:
      "Promotion criteria, P&L literacy, labor scheduling, and leadership competencies for shift leaders.",
    updatedAt: "2026-02-10",
    fileName: "manager-certification-roadmap.md",
    pages: 11,
  },
];

export function getFranchiseDocument(slug: string): FranchiseDocument | undefined {
  return franchiseDocuments.find((doc) => doc.slug === slug);
}
