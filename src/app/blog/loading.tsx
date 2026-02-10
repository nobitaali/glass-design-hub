import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Featured Posts Skeleton */}
        <section className="mb-16">
          <Skeleton className="h-10 w-48 mb-8" />
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Skeleton className="h-64 md:h-full" />
              </div>
              <div className="md:w-1/2 p-6">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </Card>
        </section>

        {/* Categories Filter Skeleton */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        </section>

        {/* All Posts Skeleton */}
        <section>
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5 mb-4" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Skeleton */}
        <section className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-6" />
          <div className="flex gap-4 max-w-md mx-auto">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-32" />
          </div>
        </section>
      </main>
    </div>
  );
}
