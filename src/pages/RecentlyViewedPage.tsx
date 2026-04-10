import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { getProducts } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

const badges: Record<string, string> = { "1":"ARTISAN CRAFTED", "2":"HANDWOVEN WOOL", "6":"FULL GRAIN LEATHER", "9":"ITALIAN SATIN" };

export default function RecentlyViewedPage() {
  const recent = getProducts().slice(0, 4);
  const more   = getProducts().slice(4, 7);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const addToBag = (p: typeof recent[0]) => {
    addItem({ productId: p.id, name: p.name, price: p.price, image: p.images[0], size: "M", color: p.colors[0]?.name ?? "", quantity: 1 });
    toast({ title: "Added to your curation ✓" });
  };

  return (
    <Layout>
      <div className="container max-w-lg py-6 pb-28 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2 label-text text-foreground">
            <ArrowLeft size={16} /> AURA DE NİŞANTAŞI
          </Link>
          <ShoppingBag size={20} className="text-foreground" />
        </div>

        <p className="label-text text-muted-foreground mb-1">CURATED SELECTION</p>
        <h1 className="font-display text-4xl font-bold mb-1">Recently Viewed</h1>
        <p className="font-accent italic text-muted-foreground text-sm mb-3">Your style journey continues</p>

        <div className="flex justify-end mb-4">
          <button className="label-text text-muted-foreground hover:text-foreground transition-colors">CLEAR ALL ↑</button>
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {recent.map((p) => (
            <div key={p.id} className="product-card">
              <div className="aspect-square bg-secondary overflow-hidden">
                <img src={p.images[0]} alt={p.name} className="product-img" />
              </div>
              <div className="p-3">
                {badges[p.id] && <p className="label-text text-muted-foreground mb-1">{badges[p.id]}</p>}
                <Link to={`/product/${p.id}`}>
                  <h3 className="font-display text-sm font-semibold text-foreground mb-1 line-clamp-1 hover:text-rose-dark transition-colors">{p.name}</h3>
                </Link>
                <p className="font-semibold text-foreground text-sm mb-2">₺{p.price.toLocaleString()}</p>
                <button onClick={() => addToBag(p)} className="btn-primary btn-sm btn-full">ADD TO BAG</button>
              </div>
            </div>
          ))}
        </div>

        {/* Atelier Philosophy */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <div className="h-48 bg-secondary overflow-hidden">
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80" alt="" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="bg-secondary px-5 pt-5 pb-6">
            <p className="label-text text-muted-foreground mb-3">THE ATELIER PHILOSOPHY</p>
            <p className="font-accent italic text-xl text-foreground leading-relaxed mb-3">
              "Luxury is not about visibility; it is about the feeling of silk against skin as you walk along the Bosphorus at dawn."
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every piece at Aura de Nişantaşı is a testament to the artisan's hand and the soul of Istanbul.
            </p>
          </div>
        </div>

        {/* More from collection */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl font-semibold">More From The Collection</h2>
            <p className="label-text text-muted-foreground">CURATED ESSENTIALS</p>
          </div>
          <Link to="/shop" className="label-text text-rose-dark">EXPLORE ALL</Link>
        </div>

        <div className="divide-y divide-border">
          {more.map((p) => (
            <div key={p.id} className="flex items-center gap-4 py-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="label-text text-muted-foreground mb-0.5">{p.subcategory ?? p.category}</p>
                <Link to={`/product/${p.id}`}>
                  <p className="font-medium text-sm text-foreground hover:text-rose-dark transition-colors">{p.name}</p>
                </Link>
                <p className="font-semibold text-foreground text-sm">₺{p.price.toLocaleString()}</p>
              </div>
              <Link to={`/product/${p.id}`} className="label-text text-rose-dark">DISCOVER</Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
