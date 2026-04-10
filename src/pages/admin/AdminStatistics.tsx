import { AlertTriangle, Download } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month:"JAN", current:28, forecast:30 }, { month:"FEB", current:35, forecast:36 },
  { month:"MAR", current:42, forecast:40 }, { month:"APR", current:38, forecast:42 },
  { month:"MAY", current:51, forecast:48 }, { month:"JUN", current:68, forecast:60 },
];

const bestSellers = [
  { name:"Nişantaşı Silk Wrap",  units:"342 Units · Top Choice",  rank:1, image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=60&q=80" },
  { name:"Merino Trench",        units:"289 Units · Trending",    rank:2, image:"https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=60&q=80" },
  { name:"Emerald Satin Blouse", units:"210 Units · High Margin", rank:3, image:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=60&q=80" },
];

const topBuyers = [
  { name:"Elif Yılmaz", initials:"EY", color:"#E8A0B4", orders:24, ltv:"$12,450" },
  { name:"Derin Aksoy", initials:"DA", color:"#7AA3C4", orders:18, ltv:"$9,820"  },
  { name:"Selin Can",   initials:"SC", color:"#7BAF7B", orders:15, ltv:"$8,100"  },
];

const alerts = [
  { name:"Velvet Night Blazer",        stock:"Only 2 items remaining",  status:"critical" },
  { name:"Linen Palazzo Pants (Beige)",stock:"Only 5 items remaining",  status:"warning"  },
  { name:"Atelier Signature Scarf",    stock:"Out of Stock",            status:"empty"    },
];

export default function AdminStatistics() {
  return (
    <AdminLayout title="Atelier Admin">
      <div className="pb-24">
        <div className="px-4 pt-5 pb-4">
          <p className="font-accent italic text-muted-foreground text-sm">Aura de Nişantaşı</p>
          <h1 className="font-display text-3xl font-bold">Sales Statistics</h1>
          <p className="label-text text-muted-foreground mt-0.5">Business Intelligence & Performance</p>
          <div className="flex gap-2 mt-4">
            <button className="btn-ghost btn-sm">EXPORT PDF</button>
            <button className="btn-primary btn-sm">📅 LAST 30 DAYS</button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="px-4 space-y-3 mb-4">
          {[
            { label:"TOTAL REVENUE",       value:"$450,230", pct:"+12.5%" },
            { label:"TOTAL ORDERS",        value:"1,240",    pct:"+8.2%"  },
            { label:"AVERAGE ORDER VALUE", value:"$363.00",  pct:"+4.7%"  },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="stat-label mb-2">{s.label}</p>
                  <p className="stat-value">{s.value}</p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{s.pct}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="mx-4 atelier-card p-5 mb-4">
          <h3 className="font-display text-lg font-semibold mb-0.5">Revenue Growth</h3>
          <p className="label-text text-muted-foreground mb-1">Monthly Performance Visualization</p>
          <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose-dark inline-block rounded" />CURRENT</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary inline-block rounded" />FORECAST</span>
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" tick={{ fontSize:9, fill:"#8A8A8A" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius:12, border:"none", boxShadow:"0 8px 32px rgba(0,0,0,.1)", fontSize:12 }} />
              <Line type="monotone" dataKey="current"  stroke="#C4687E" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="forecast" stroke="#E8A0B4" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Best Sellers */}
        <div className="mx-4 atelier-card p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg font-semibold">Curated Best Sellers</h3>
            <button className="label-text text-rose-dark">FULL CATALOGUE</button>
          </div>
          <div className="space-y-3">
            {bestSellers.map((item) => (
              <div key={item.rank} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.units}</p>
                </div>
                <span className="font-display font-bold text-lg text-muted-foreground">#{item.rank}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Elite Clientele */}
        <div className="mx-4 atelier-card p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg font-semibold">Elite Clientele</h3>
            <button className="label-text text-rose-dark">VIEW CRM</button>
          </div>
          <div className="flex justify-between label-text text-muted-foreground mb-3">
            <span className="flex-1">PATRON</span><span className="w-12 text-center">ORDERS</span><span className="w-16 text-right">LTV</span>
          </div>
          <div className="divide-y divide-border">
            {topBuyers.map((b) => (
              <div key={b.name} className="flex items-center py-3">
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: b.color }}>
                    {b.initials}
                  </div>
                  <span className="text-sm font-medium text-foreground">{b.name}</span>
                </div>
                <span className="w-12 text-center text-sm text-muted-foreground">{b.orders}</span>
                <span className="w-16 text-right font-semibold text-sm text-foreground">{b.ltv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Insights */}
        <div className="mx-4 atelier-card p-5 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-yellow-500" />
            <h3 className="font-display text-lg font-semibold">Inventory Insights</h3>
          </div>
          <p className="label-text text-muted-foreground mb-4">Action required for curated stock</p>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.name} className="bg-secondary rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm text-foreground">{a.name}</p>
                  <span className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full ${
                    a.status === "critical" ? "bg-destructive/15 text-red-700" :
                    a.status === "warning"  ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-200 text-gray-700"
                  }`}>{a.status.toUpperCase()}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{a.stock}</p>
                <button className={`w-full rounded-full py-2.5 text-xs font-semibold uppercase tracking-widest transition-all ${
                  a.status === "empty" ? "bg-foreground text-card hover:opacity-90" : "bg-rose-dark text-white hover:opacity-90"
                }`}>
                  {a.status === "empty" ? "EXPRESS ORDER" : "RESTOCK NOW"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
