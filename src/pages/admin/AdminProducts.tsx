import { useState } from "react";
import { Search, Download, Plus, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { getProducts } from "@/data/products";

export default function AdminProducts() {
  const products = getProducts();
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(products.map((p) => [p.id, p.stock > 0]))
  );
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const PER = 3;

  const filtered = products.filter((p) =>
    q ? p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()) : true
  );
  const pages   = Math.ceil(filtered.length / PER);
  const visible = filtered.slice((page - 1) * PER, page * PER);

  const totalSKUs   = products.length;
  const activeItems = products.filter((p) => p.stock > 0).length;
  const lowStock    = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock  = products.filter((p) => p.stock === 0).length;

  return (
    <AdminLayout title="Atelier Admin">
      <div className="pb-24">
        <div className="px-4 pt-5 pb-4">
          <h1 className="font-display text-3xl font-bold leading-tight">Inventory</h1>
          <p className="font-accent italic text-muted-foreground text-sm mt-1">Overseeing the house's latest seasonal arrivals.</p>
          <div className="flex gap-2 mt-4">
            <button className="btn-ghost btn-sm gap-1.5"><Download size={12} />EXPORT</button>
            <button className="btn-primary btn-sm gap-1.5"><Plus size={12} />ADD NEW ITEM</button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 grid grid-cols-2 gap-3 mb-4">
          {[
            { label:"TOTAL SKUS",    value: totalSKUs,   normal: true  },
            { label:"ACTIVE ITEMS",  value: activeItems, normal: true  },
            { label:"LOW STOCK",     value: lowStock,    alert: true   },
            { label:"OUT OF STOCK",  value: outOfStock,  normal: true  },
          ].map((s) => (
            <div key={s.label} className={`stat-card ${s.alert ? "border-l-4 border-yellow-400" : ""}`}>
              <p className="stat-label mb-1">{s.label}</p>
              <p className={`stat-value ${s.alert ? "text-yellow-600" : ""}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="px-4 mb-4 space-y-2">
          <div className="flex items-center gap-2 bg-card rounded-xl px-3 py-2.5 card-shadow">
            <Search size={14} className="text-muted-foreground flex-shrink-0" />
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search by artisan, material or SKU..." className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground" />
          </div>
          <button className="flex items-center gap-2 text-xs text-muted-foreground font-medium mx-auto">
            <Filter size={12} /> FILTER
          </button>
        </div>

        {/* Product Cards */}
        <div className="px-4 space-y-4">
          {visible.map((product) => {
            const isLow  = product.stock > 0 && product.stock <= 5;
            const isOut  = product.stock === 0;
            const active = toggles[product.id];
            return (
              <div key={product.id} className="atelier-card p-4">
                {/* Image */}
                <div className="h-44 bg-secondary rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Info */}
                <p className="font-display text-lg font-semibold text-rose-dark mb-0.5">{product.name}</p>
                <p className="label-text text-muted-foreground mb-4">{product.category}{product.subcategory ? ` · ${product.subcategory}` : ""}</p>

                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <div>
                      <p className="label-text text-muted-foreground">PRICE</p>
                      <p className="font-semibold text-foreground">₺{product.price.toLocaleString()}.00</p>
                    </div>
                    <div>
                      <p className="label-text text-muted-foreground">STOCK</p>
                      <span className={`text-xs font-semibold ${isOut ? "text-destructive" : isLow ? "text-yellow-600" : "text-green-600"}`}>
                        {isOut ? "OUT OF STOCK" : isLow ? `LOW STOCK (${product.stock})` : `${product.stock} AVAILABLE`}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <p className="label-text text-muted-foreground">ACTIVE</p>
                    <button onClick={() => setToggles((t) => ({ ...t, [product.id]: !t[product.id] }))}
                      className={`toggle ${active ? "on" : "off"}`}>
                      <span className="toggle-knob" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 mt-5">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30"
            disabled={page === 1}>
            <ChevronLeft size={12} /> PREVIOUS
          </button>
          <div className="flex gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)}
                className={`w-7 h-7 rounded-full text-xs font-medium transition-colors ${n === page ? "bg-rose-dark text-white" : "text-muted-foreground hover:bg-secondary"}`}>
                {n}
              </button>
            ))}
          </div>
          <button onClick={() => setPage((p) => Math.min(pages, p + 1))}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30"
            disabled={page === pages}>
            NEXT <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
