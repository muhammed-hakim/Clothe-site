// ════════════════════════════════════════
// ADMIN DASHBOARD
// ════════════════════════════════════════
import AdminLayout from "./AdminLayout";
import { TrendingUp, AlertTriangle, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const revenueData = [
  { month:"JAN", v:28 }, { month:"FEB", v:35 }, { month:"MAR", v:42 },
  { month:"APR", v:38 }, { month:"MAY", v:51 }, { month:"JUN", v:68 },
];

const stats = [
  { label:"TOTAL REVENUE",    value:"$142,850.00", sub:"+12.5% vs last month" },
  { label:"TOTAL ORDERS",     value:"1,248",       sub:"84 orders today" },
  { label:"ACTIVE CATALOG",   value:"342",         sub:"32 new this week" },
  { label:"TOTAL CUSTOMERS",  value:"8,902",       sub:"210 new registrations" },
];

const alerts = [
  { name:"Silk Wrap Midi Dress", sub:"Crema / Medium" },
  { name:"Petal Gold Pendant",  sub:"18k Gold Plated" },
  { name:"Velvet Slingback",    sub:"Dusty Rose / 38" },
];

const recent = [
  { id:"FLF-9821", customer:"Elena Berova",    total:"$420.00" },
  { id:"FLF-9822", customer:"Julianne Moore",  total:"$6,220.06" },
  { id:"FLF-9823", customer:"Sophia Chen",     total:"$89.11" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="THE ATELIER ADMIN">
      <div className="pb-24">
        <div className="px-4 pt-5 space-y-3">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <p className="stat-label mb-2">{s.label}</p>
              <p className="stat-value">{s.value}</p>
              <p className="stat-sub mt-1.5"><TrendingUp size={11} className="text-green-600" />{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="mx-4 mt-4 atelier-card p-5">
          <h3 className="font-display text-lg font-semibold mb-1">Revenue Performance</h3>
          <p className="label-text text-muted-foreground mb-4">Annual Atelier Growth</p>
          <ResponsiveContainer width="100%" height={110}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" tick={{ fontSize:9, fill:"#8A8A8A" }} axisLine={false} tickLine={false} />
              <Bar dataKey="v" fill="hsl(345 56% 77%)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Low Stock */}
        <div className="mx-4 mt-4 atelier-card p-5">
          <h3 className="font-display text-lg font-semibold mb-4">Atelier Alerts</h3>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.name} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={16} className="text-rose-dark" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="label-text text-rose-dark mt-4">VIEW ALL</button>
        </div>

        {/* Recent Curations */}
        <div className="mx-4 mt-4 atelier-card p-5">
          <h3 className="font-display text-lg font-semibold mb-4">Recent Curations</h3>
          <div className="space-y-0 divide-y divide-border">
            {recent.map((r, i) => (
              <div key={r.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: ["#E8A0B4","#7AA3C4","#7BAF7B"][i] }}>
                    {r.customer.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.customer}</p>
                    <p className="text-xs text-muted-foreground">{r.id}</p>
                  </div>
                </div>
                <p className="font-semibold text-sm text-foreground">{r.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
