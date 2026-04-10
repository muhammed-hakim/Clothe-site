import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useWishlistStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { getProducts } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

export default function WishlistPage() {
  const { ids, toggle } = useWishlistStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const all = getProducts();
  const wishlist = all.filter((p) => ids.includes(p.id));
  const recommended = all.filter((p) => !ids.includes(p.id)).slice(0, 3);

  const handleAddToBag = (p: typeof wishlist[0]) => {
    addItem({ productId: p.id, name: p.name, price: p.price, image: p.images[0], size: "M", color: p.colors[0]?.name ?? "", quantity: 1 });
    toast({ title: "Added to your curation ✓" });
  };

  return (
    <Layout>
      <div className="container max-w-lg py-8 pb-28 animate-fade-in">
        <p className="font-accent italic text-muted-foreground text-sm mb-1">Your personal selection</p>
        <h1 className="font-display text-4xl font-bold mb-6">My Curation</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="font-display text-2xl mb-2">Your curation is empty</p>
            <p className="text-muted-foreground text-sm mb-6">Save pieces you love to revisit them later.</p>
            <Link to="/shop" className="btn-primary">EXPLORE ATELIER</Link>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {wishlist.map((item) => (
              <div key={item.id} className="atelier-card overflow-hidden relative">
                {item.stock <= 2 && item.stock > 0 && (
                  <div className="absolute top-3 left-3 z-10 badge-limited">ONLY {item.stock} LEFT</div>
                )}
                <button onClick={() => toggle(item.id)} className="absolute top-3 right-3 z-10 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-rose-dark transition-colors">
                  ✕
                </button>
                <div className="h-64 bg-secondary overflow-hidden">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1 hover:text-rose-dark transition-colors">{item.name}</h3>
                  </Link>
                  <p className="font-semibold text-foreground mb-3">₺ {item.price.toLocaleString()}</p>
                  <button onClick={() => handleAddToBag(item)} className="btn-primary btn-full">
                    <ShoppingBag size={14} /> ADD TO BAG
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommended */}
        {recommended.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-accent italic text-muted-foreground text-sm">Curated for your style</p>
                <h2 className="font-display text-xl font-semibold">Recommended for You</h2>
              </div>
              <Link to="/shop" className="label-text text-rose-dark">VIEW ALL</Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {recommended.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="product-card">
                  <div className="aspect-square bg-secondary"><img src={p.images[0]} alt={p.name} className="product-img" /></div>
                  <div className="p-2">
                    <p className="text-xs font-medium text-foreground line-clamp-1">{p.name}</p>
                    <p className="text-xs text-rose-dark font-semibold">₺{p.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
