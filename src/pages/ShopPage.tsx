import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { getProducts, categoryMap } from "@/data/products";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40", "41", "One Size"];
const allColors = [
  { name: "Black", hex: "#2C2C2C" },
  { name: "Ivory", hex: "#FAF7F5" },
  { name: "Rose", hex: "#E8A0B4" },
  { name: "Camel", hex: "#C4A265" },
  { name: "Emerald", hex: "#4A7C59" },
  { name: "Gold", hex: "#C9A84C" },
  { name: "Burgundy", hex: "#722F37" },
  { name: "Navy", hex: "#1A1A2E" },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Rating", value: "rating" },
];

const ShopPage = () => {
  const { category } = useParams();
  const products = getProducts();

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  };
  const toggleColor = (color: string) => {
    setSelectedColors((prev) => prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedSizes.length) result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s.size)));
    if (selectedColors.length) result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0)); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [products, selectedCategory, priceRange, selectedSizes, selectedColors, sortBy]);

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedCategory("");
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0 || selectedCategory !== "" || priceRange[0] > 0 || priceRange[1] < 1000;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-2">
          {Object.entries(categoryMap).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(selectedCategory === key ? "" : key)}
              className={`block w-full text-left text-sm py-1.5 transition-colors ${selectedCategory === key ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          min={0}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1.5 text-xs border rounded-pill transition-all ${selectedSizes.includes(size) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-foreground"}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(color.name) ? "border-primary ring-2 ring-primary/30" : "border-border"}`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="text-xs text-primary hover:text-rose-dark underline">
          Clear all filters
        </button>
      )}
    </div>
  );

  const pageTitle = category ? categoryMap[category] || "Shop" : "All Products";

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-primary">Home</a>
            <span>/</span>
            <span className="text-foreground">{pageTitle}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl italic mt-2">{pageTitle}</h1>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterPanel />
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">{filtered.length} products</p>
              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <Sheet open={mobileFilters} onOpenChange={setMobileFilters}>
                  <SheetTrigger asChild>
                    <button className="lg:hidden flex items-center gap-1.5 text-sm border border-border rounded-pill px-4 py-2 hover:border-foreground transition">
                      <SlidersHorizontal className="w-4 h-4" /> Filters
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetTitle className="font-display text-xl mb-6">Filters</SheetTitle>
                    <FilterPanel />
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-border rounded-pill px-4 py-2 bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.images[0]}
                    rating={product.rating}
                    badge={product.badge}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-2">No products found</p>
                <button onClick={clearFilters} className="text-primary hover:text-rose-dark text-sm underline">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
