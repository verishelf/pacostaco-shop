interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-xl font-black text-taco-dark sm:text-2xl">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-gray-600 sm:text-base">{description}</p>
      )}
    </div>
  );
}
