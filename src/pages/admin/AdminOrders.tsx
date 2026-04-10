import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, Search, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import AdminLayout from "./AdminLayout";

const TABS = ["ALL", "PENDING", "CONFIRMED", "SHIPPED", "ARCHIVED"];

const orders = [
  { id:"AT-9024", customer:"Elif Pamuk",   date:"Oct 24, 2024", status:"Confirmed", total:"$450.00",  image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=60&q=80",  item:"Nişantaşı Silk Wrap",    detail:"Ivory · Size S" },
  { id:"AT-9023", customer:"Zeynep Arslan",date:"Oct 24, 2024", status:"Pending",   total:"$1,200.00",image:"https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=60&q=80",  item:"Nişantaşı Evening Coat", detail:"Black · Size M" },
  { id:"AT-9022", customer:"Merve Yılmaz", date:"Oct 23, 2024", status:"Shipped",   total:"$480.00",  image:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=60&q=80", item:"Atelier Silk Slip Dress","detail":"Rose · Size S" },
  { id:"AT-9021", customer:"Leyla Can",    date:"Oct 23, 2024", status:"Delivered", total:"$705.00",  image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=60&q=80",  item:"Atelier Silk Blouse",    detail:"Rose · Size M" },
];

const statusClass: Record<string, string> = {
  Confirmed:"badge-confirmed", Pending:"badge-pending",
  Shipped:"badge-shipped",     Delivered:"badge-delivered", Cancelled:"badge-cancelled",
};

const statsRow = [
  { label:"TOTAL ORDERS",      value:"1,482", sub:"+4.2%",           color:"text-foreground" },
  { label:"PENDING FULFILLMENT",value:"24",   sub:"⏳ hourglass",    color:"text-yellow-600" },
  { label:"CONFIRMED TODAY",    value:"08",   sub:"✓ confirmed",      color:"text-rose-dark"  },
  { label:"REVENUE (MOM)",      value:"₺142k",sub:"Goal: 92%",       color:"text-rose-dark"  },
];

export default function AdminOrders() {
  const [tab, setTab] = useState("ALL");
  const [q, setQ]     = useState("");

  const filtered = orders.filter((o) => {
    if (tab !== "ALL" && o.status.toUpperCase() !== tab) return false;
    if (q && !o.customer.toLowerCase().includes(q.toLowerCase()) && !o.id.includes(q)) return false;
    return true;
  });

  return (
    <AdminLayout title="THE ATELIER ADMIN">
      <div className="pb-24">
        {/* Title */}
        <div className="px-4 pt-5 pb-4">
          <h1 className="font-display text-3xl font-bold text-foreground">Order Curation</h1>
          <p className="font-accent italic text-muted-foreground text-sm mt-1">
            Overseeing the lifecycle of exceptional design
          </p>
          <div className="flex gap-2 mt-4">
            <button className="btn-ghost btn-sm gap-1.5"><Download size={12} />EXPORT</button>
            <button className="btn-primary btn-sm">NEW ORDER</button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 space-y-3 mb-4">
          {statsRow.map((s) => (
            <div key={s.label} className="stat-card">
              <p className="stat-label mb-1">{s.label}</p>
              <div className="flex items-center justify-between">
                <p className={`stat-value ${s.color}`}>{s.value}</p>
                <span className="text-xs text-muted-foreground">{s.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="px-4 mb-3">
          <div className="flex gap-4 overflow-x-auto pb-1 border-b border-border">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`label-text whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  tab === t ? "border-rose-dark text-rose-dark" : "border-transparent text-muted-foreground"
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 bg-card rounded-xl px-3 py-2.5 card-shadow">
            <Search size={14} className="text-muted-foreground flex-shrink-0" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search orders..." className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground" />
          </div>
        </div>

        {/* Order Cards */}
        <div className="px-4 space-y-3">
          {filtered.map((order) => (
            <Link key={order.id} to={`/admin/orders/${order.id}`} className="atelier-card p-4 block hover:border-primary/30 border border-transparent transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-sm text-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <span className={statusClass[order.status]}>{order.status}</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                  <img src={order.image} alt={order.item} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground line-clamp-1">{order.item}</p>
                  <p className="text-xs text-muted-foreground">{order.detail}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{order.customer}</p>
                  <p className="font-semibold text-sm text-foreground">{order.total}</p>
                </div>
                <span className="label-text text-rose-dark">VIEW →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 mt-5">
          <span className="text-xs text-muted-foreground">Displaying {filtered.length} of 84 orders</span>
          <div className="flex gap-2">
            <button className="w-7 h-7 rounded-full bg-card card-shadow flex items-center justify-center"><ChevronLeft size={14} /></button>
            <button className="w-7 h-7 rounded-full bg-card card-shadow flex items-center justify-center"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
