import Image from 'next/image';
import Link from 'next/link';
import categories from "@/components/jsondata/category.json"


const CategoriesSection = () => {

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-background text-foreground sm:text-4xl">
            Explore Culinary Worlds
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover recipes by your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link 
              href={`/category/${category.id}`} 
              key={category.id}
              className="group relative block overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-60">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={300}
                  style={{width:"auto", height:"auto"}}
                  className="object-cover transition-transform duration-500 group-hover:scale-105 "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="text-sm opacity-90">{category.count}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs font-medium px-2 py-1 bg-amber-500 rounded-full">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-200"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;