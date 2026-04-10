import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ShoppingBag, Heart, Settings, LogOut } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

const mockOrders = [
  { id: "AT-9024", date: "Oct 24, 2024", status: "Shipped",   total: 1240, items: "Silk Slip Dress, Cashmere Wrap, Atelier..." },
  { id: "AT-8812", date: "Sep 12, 2024", status: "Delivered", total: 895,  items: "Nişantaşı Leather Tote, Gold-Plated Cuff" },
];

const statusClass: Record<string, string> = {
  Shipped:   "badge-shipped",
  Delivered: "badge-delivered",
  Pending:   "badge-pending",
  Confirmed: "badge-confirmed",
};

export default function AccountPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const name = user?.fullName?.split(" ")[0] ?? "Alexandra";

  return (
    <Layout>
      <div className="container max-w-lg py-8 pb-28 animate-fade-in">
        {/* Welcome */}
        <p className="font-accent italic text-muted-foreground text-sm mb-1">The Personal Collection</p>
        <h1 className="font-display text-4xl font-bold text-foreground mb-6">
          Welcome,<br />
          <span className="text-rose-dark">{name}</span>
        </h1>

        {/* Profile Card */}
        <div className="atelier-card p-6 mb-4 text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mx-auto mb-3 ring-4 ring-primary/20">
            {user?.avatar
              ? <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center font-display text-3xl font-bold text-rose-dark">
                  {(user?.fullName ?? "A")[0]}
                </div>
            }
          </div>
          <p className="font-display text-lg font-semibold text-foreground">{user?.fullName ?? "Alexandra Sterling"}</p>
          <p className="text-xs text-muted-foreground mb-4">{user?.email ?? "alexandra@atelier.com"}</p>
          <Link to="/profile" className="btn-primary btn-sm">EDIT PROFILE</Link>
        </div>

        {/* Menu */}
        <div className="atelier-card overflow-hidden mb-4">
          {[
            { icon: ShoppingBag, label: "My Orders",   href: "/account",        active: true },
            { icon: Heart,       label: "Wishlist",    href: "/wishlist",        active: false },
            { icon: Settings,    label: "Settings",    href: "/profile",         active: false },
          ].map((item) => (
            <Link key={item.label} to={item.href}
              className={`flex items-center justify-between px-5 py-4 border-b border-border last:border-0 transition-colors hover:bg-secondary ${item.active ? "bg-muted/40" : ""}`}>
              <div className="flex items-center gap-3">
                <item.icon size={18} className={item.active ? "text-rose-dark" : "text-muted-foreground"} />
                <span className={`text-sm font-medium ${item.active ? "text-rose-dark" : "text-foreground"}`}>{item.label}</span>
              </div>
              <ChevronRight size={15} className="text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">Recent Acquisitions</h2>
          <span className="text-xs text-muted-foreground">{mockOrders.length} ORDERS</span>
        </div>

        <div className="space-y-4 mb-6">
          {mockOrders.map((order) => (
            <div key={order.id} className="atelier-card overflow-hidden">
              <div className="h-32 bg-secondary overflow-hidden">
                <img src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80"
                  alt="" className="w-full h-full object-cover opacity-70" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-foreground">Order #{order.id}</span>
                  <span className={statusClass[order.status]}>{order.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">Placed on {order.date}</p>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{order.items}</p>
                <p className="font-semibold text-rose-dark mb-3">${order.total.toLocaleString()}.00</p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="btn-ghost btn-sm">VIEW DETAILS</button>
                  <button className="btn-primary btn-sm">
                    {order.status === "Shipped" ? "TRACK ORDER" : "REORDER"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => { logout(); navigate("/"); }}
          className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-rose-dark transition-colors py-3 uppercase tracking-widest font-medium">
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </Layout>
  );
}
