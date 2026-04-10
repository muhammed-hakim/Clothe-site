import { useState } from "react";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import AdminLayout from "./AdminLayout";

const TABS = ["ACTIVE", "VIP", "PROSPECTIVE", "DORMANT"];

const customers = [
  { id:"1", name:"Alexandra Sterling", email:"a.sterling@atelier.com",  orders:24, avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80", isVip:true,  spent:12480 },
  { id:"2", name:"Marcus Chen",        email:"m.chen@outlook.com",       orders:8,  avatar:"",  isVip:false, spent:3200  },
  { id:"3", name:"Elena Rossi",        email:"elena.rossi@milan.it",     orders:15, avatar:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&q=80", isVip:true,  spent:8900  },
  { id:"4", name:"Defne Kaya",         email:"defne@nisantasi.com",      orders:6,  avatar:"",  isVip:false, spent:2100  },
  { id:"5", name:"Yuki Tanaka",        email:"yuki.t@fashion.jp",        orders:19, avatar:"",  isVip:true,  spent:9400  },
];

export default function AdminCustomers() {
  const [tab, setTab] = useState("ACTIVE");
  const [q, setQ]     = useState("");

  const filtered = customers.filter((c) => {
    if (tab === "VIP" && !c.isVip) return false;
    if (q && !c.name.toLowerCase().includes(q.toLowerCase()) && !c.email.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <AdminLayout title="THE ATELIER">
      <div className="pb-24">
        <div className="px-4 pt-5 pb-4">
          <h1 className="font-display text-3xl font-bold">Client Portfolio</h1>
          <p className="font-accent italic text-muted-foreground text-sm mt-1">Managing the essence of our Nişantaşı community</p>
          <div className="flex gap-2 mt-4">
            <button className="btn-ghost btn-sm gap-1.5"><Download size={12} />EXPORT LIST</button>
            <button className="btn-primary btn-sm">INVITE MEMBER</button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 space-y-3 mb-4">
          {[
            { label:"TOTAL CUSTOMERS", value:"4,821", sub:"+12.4% vs last year", color:"text-foreground" },
            { label:"NEW THIS MONTH",  value:"148",   sub:"82 awaiting verification", color:"text-foreground" },
            { label:"TOP TIER (VIP)",  value:"214",   sub:"★ Signature Circle Members", color:"text-yellow-600" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <p className="stat-label mb-1">{s.label}</p>
              <p className={`stat-value ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="px-4 mb-3">
          <div className="flex gap-3 border-b border-border overflow-x-auto">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`label-text whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  tab === t ? "border-rose-dark text-rose-dark" : "border-transparent text-muted-foreground"
                }`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 bg-card rounded-xl px-3 py-2.5 card-shadow">
            <Search size={14} className="text-muted-foreground flex-shrink-0" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email or preference..." className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground" />
          </div>
        </div>

        {/* Customer List */}
        <div className="px-4">
          <div className="flex justify-between label-text text-muted-foreground px-2 mb-3">
            <span>CUSTOMER</span><span>ORDERS</span>
          </div>
          <div className="divide-y divide-border">
            {filtered.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    {c.avatar
                      ? <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center font-bold text-rose-dark text-sm">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                    }
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-foreground">{c.name}</p>
                      {c.isVip && <span className="badge-sale">VIP</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">{c.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground text-sm">{c.orders}</p>
                  <p className="text-xs text-muted-foreground">Pieces</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center py-4">
            Showing {filtered.length} of 4,821 clients
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
