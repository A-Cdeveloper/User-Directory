const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 py-4 md:flex-row md:gap-0">
      <aside
        aria-labelledby="filters-heading"
        className="w-full shrink-0 border-border md:w-[30%] md:border-r md:pr-4"
      >
        <h2 id="filters-heading" className="text-sm font-medium text-muted-foreground">
          Filters
        </h2>
      </aside>

      <main id="main-content" aria-labelledby="main-heading" className="min-w-0 flex-1 md:pl-4">
        <h2 id="main-heading" className="sr-only">
          User list
        </h2>
        <p className="text-muted-foreground">Main area</p>
      </main>
    </div>
  );
};

export default HomePage;
