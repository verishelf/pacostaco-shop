interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-black text-taco-dark">{title}</h2>
      {description && (
        <p className="mt-1 text-gray-600">{description}</p>
      )}
    </div>
  );
}
