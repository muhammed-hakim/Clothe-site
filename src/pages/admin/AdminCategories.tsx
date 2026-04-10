import { useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { CATEGORIES } from "@/data/products";

const catImages: Record<string, string> = {
  "T-Shirts & Tops": "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=80&q=80",
  "Pants & Jeans":   "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=80&q=80",
  "Shoes":           "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=80&q=80",
  "Bags & Handbags": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80&q=80",
  "Makeup & Beauty": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=80&q=80",
  "Accessories":     "https://images.unsplash.com/photo-1589556264800-08ae9e129a8e?w=80&q=80",
};

const productCounts: Record<string, number> = {
  "T-Shirts & Tops": 24, "Pants & Jeans": 18, "Shoes": 31,
  "Bags & Handbags": 22, "Makeup & Beauty": 15, "Accessories": 19,
};

export default function AdminCategories() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Record<string, boolean>>(
    Object.fromEntries(CATEGORIES.map((c) => [c.id, true]))
  );

  const filtered = CATEGORIES.filter((c) =>
    q ? c.name.toLowerCase().includes(q.toLowerCase()) : true
  );

  const totalCats   = CATEGORIES.length;
  const activeCats  = Object.values(active).filter(Boolean).length;

  return (
    <AdminLayout title="Atelier Admin">
      <div className="pb-24">
        <div className="px-4 pt-5 pb-4">
          <h1 className="font-display text-3xl font-bold">Categories Management</h1>
          <p className="font-accent italic text-muted-foreground text-sm mt-1">
            Curation of the Atelier's seasonal taxonomy
          </p>
        </div>

        {/* Stats */}
        <div className="px-4 grid grid-cols-3 gap-2 mb-4">
          {[
            { label:"TOTAL",    value: totalCats  },
            { label:"ACTIVE",   value: activeCats },
            { label:"TOP DEPT", value: "TOPS"     },
          ].map((s) => (
            <div key={s.label} className="stat-card text-center">
              <p className="stat-label mb-1">{s.label}</p>
              <p className="font-display text-xl font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search + Add */}
        <div className="px-4 mb-4 flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-card rounded-xl px-3 py-2.5 card-shadow">
            <Search size={14} className="text-muted-foreground flex-shrink-0" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Find categories..." className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground" />
          </div>
          <button className="btn-primary btn-sm gap-1 whitespace-nowrap"><Plus size={12} />ADD</button>
        </div>

        {/* Category List */}
        <div className="px-4 space-y-3">
          {filtered.map((cat) => (
            <div key={cat.id} className="atelier-card p-4 flex items-center gap-3">
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                <img src={catImages[cat.name]} alt={cat.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-base font-semibold text-foreground">{cat.name}</p>
                <p className="text-xs text-muted-foreground mb-2">
                  {productCounts[cat.name] ?? 0} products · {cat.subcategories.length} subcategories
                </p>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-xs text-rose-dark font-medium hover:underline">
                    <Edit size={11} /> Edit
                  </button>
                  <button className="flex items-center gap-1 text-xs text-destructive font-medium hover:underline">
                    <Trash2 size={11} /> Delete
                  </button>
                </div>
              </div>

              {/* Toggle */}
              <button onClick={() => setActive((a) => ({ ...a, [cat.id]: !a[cat.id] }))}
                className={`toggle flex-shrink-0 ${active[cat.id] ? "on" : "off"}`}>
                <span className="toggle-knob" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
