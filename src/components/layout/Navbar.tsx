import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { Menu, X, Search, Heart, ShoppingBag, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const categories = [
  { name: "T-Shirts & Tops", href: "/shop/t-shirts-tops", subcategories: ["Casual Tops", "Blouses", "Crop Tops", "Knitwear"] },
  { name: "Pants & Jeans", href: "/shop/pants-jeans", subcategories: ["Jeans", "Trousers", "Leggings", "Shorts"] },
  { name: "Shoes", href: "/shop/shoes", subcategories: ["Heels", "Sneakers", "Boots", "Sandals", "Flats"] },
  { name: "Bags & Handbags", href: "/shop/bags", subcategories: ["Shoulder Bags", "Tote Bags", "Clutches", "Backpacks"] },
  { name: "Makeup & Beauty", href: "/shop/makeup", subcategories: ["Lipstick", "Foundation", "Skincare", "Perfumes"] },
  { name: "Accessories", href: "/shop/accessories", subcategories: ["Jewelry", "Scarves", "Belts", "Sunglasses", "Hats"] },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 -ml-2" aria-label="Menu">
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="p-6">
              <h2 className="font-display text-xl font-semibold text-rose-dark mb-6">LADY FASHION</h2>
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <div key={cat.name} className="py-2">
                    <Link
                      to={cat.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm font-medium uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                    >
                      {cat.name}
                    </Link>
                    <div className="mt-1 ml-3 space-y-1">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          to={`${cat.href}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-0.5"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-border space-y-3">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-sm font-medium uppercase tracking-wider">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block text-sm font-medium uppercase tracking-wider">Register</Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-wide text-rose-dark">
          LADY FASHION
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              className="label-text text-foreground hover:text-primary transition-colors duration-200"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:text-primary transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/wishlist" className="p-2 hover:text-primary transition-colors hidden sm:block" aria-label="Wishlist">
            <Heart className="w-5 h-5" />
          </Link>
          <Link to="/account" className="p-2 hover:text-primary transition-colors hidden sm:block" aria-label="Account">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/cart" className="p-2 hover:text-primary transition-colors relative" aria-label="Cart">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
