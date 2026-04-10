import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Package, Users, Tag, BarChart3, Bell, Menu, X, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",  href: "/admin" },
  { icon: ShoppingBag,     label: "Orders",     href: "/admin/orders" },
  { icon: Package,         label: "Inventory",  href: "/admin/products" },
  { icon: Tag,             label: "Categories", href: "/admin/categories" },
  { icon: Users,           label: "Clients",    href: "/admin/customers" },
  { icon: BarChart3,       label: "Statistics", href: "/admin/stats" },
];

export default function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      {/* Top Bar */}
      <div className="admin-gradient sticky top-0 z-30 px-4 py-4 flex items-center justify-between">
        <button onClick={() => setOpen(true)}><Menu size={20} className="text-white/80" /></button>
        <p className="font-display text-sm font-semibold text-white">{title}</p>
        <button className="relative"><Bell size={20} className="text-white/80" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full border border-white" />
        </button>
      </div>

      {/* Sidebar */}
      {open && (
        <>
          <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50" onClick={() => setOpen(false)} />
          <div className="fixed top-0 left-0 h-full w-64 bg-card z-50 flex flex-col shadow-2xl animate-slide-right">
            <div className="admin-gradient px-5 py-6 flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-semibold text-white">THE ATELIER</p>
                <p className="font-display text-sm font-semibold text-white/60">ADMIN</p>
              </div>
              <button onClick={() => setOpen(false)}><X size={18} className="text-white/70" /></button>
            </div>
            <nav className="flex-1 py-4 overflow-y-auto">
              <p className="px-5 label-text text-muted-foreground mb-2">MANAGEMENT</p>
              {NAV.map((item) => (
                <Link key={item.href} to={item.href} onClick={() => setOpen(false)}
                  className={`admin-nav-item ${pathname === item.href ? "active" : ""}`}>
                  <item.icon size={18} />{item.label}
                </Link>
              ))}
            </nav>
            <div className="px-5 py-5 border-t border-border">
              <button onClick={() => { logout(); navigate("/"); }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-rose-dark transition-colors w-full">
                <LogOut size={16} /> Sign Out
              </button>
              <p className="font-accent italic text-xs text-muted-foreground mt-3">Aura de Nişantaşı</p>
              <p className="label-text text-muted-foreground/60 mt-0.5">System stable at 99.9%.</p>
            </div>
          </div>
        </>
      )}

      {/* Content */}
      <div>{children}</div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-card border-t border-border z-20">
        <div className="flex items-center justify-around py-2">
          {NAV.slice(0, 4).map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} to={item.href}
                className={`bottom-nav-item ${active ? "active" : ""}`}>
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
