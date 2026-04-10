import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, MoreVertical, MapPin, Phone, Mail, Save } from "lucide-react";
import AdminLayout from "./AdminLayout";

const STATUS_STEPS = ["Pending", "Processing", "Shipped", "Delivered"];

const orderData: Record<string, any> = {
  "AT-9024": {
    id:"AT-9024", status:"Confirmed", customer:"Alexandra Sterling",
    email:"a.sterling@luxurymail.com", phone:"+90 (532) 887 44 22",
    avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    isVip: true,
    items:[
      { name:"Nişantaşı Silk Wrap", size:"S", color:"IVORY", price:450, image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=80&q=80" },
      { name:"Merino Trench",       size:"M", color:"CHARCOAL", price:1200, image:"https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=80&q=80" },
    ],
    subtotal:1650, shipping:0, vat:297,
    address:{ street:"Abdi İpekçi Caddesi, No: 42, Polat Palas Apt, Flat 12", city:"Nişantaşı, 34367", country:"Istanbul, Turkey" },
    note:"Customer requested signature rose-scented packaging and a handwritten gift note for 'Happy Birthday!' Ensure double-checking the fragile items.",
  },
};

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = orderData[id ?? "AT-9024"] ?? orderData["AT-9024"];

  const [status] = useState(order.status);
  const [note, setNote] = useState(order.note);
  const [tracking, setTracking] = useState("");

  const stepIdx = STATUS_STEPS.indexOf(status === "Confirmed" ? "Processing" : status);

  const statusClass: Record<string, string> = {
    Confirmed:"badge-confirmed", Pending:"badge-pending",
    Shipped:"badge-shipped", Delivered:"badge-delivered",
  };

  const fmt = (n: number) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD" }).format(n);

  return (
    <AdminLayout title="THE ATELIER ADMIN">
      <div className="pb-24">
        {/* Header */}
        <div className="sticky top-[57px] z-20 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1"><X size={20} /></button>
          <div className="text-center">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Order Summary</p>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">#{order.id}</span>
              <span className={statusClass[order.status]}>{order.status}</span>
            </div>
          </div>
          <button><MoreVertical size={20} className="text-muted-foreground" /></button>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Actions */}
          <div className="flex gap-2">
            <button className="btn-ghost btn-sm flex-1">PRINT INVOICE</button>
            <button className="btn-primary btn-sm flex-1">UPDATE STATUS</button>
          </div>

          {/* Fulfillment Progress */}
          <div className="atelier-card p-5">
            <h3 className="font-display text-lg font-semibold mb-4">Fulfillment Progress</h3>
            <div className="flex items-center">
              {STATUS_STEPS.map((step, idx) => (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`progress-step-circle ${idx < stepIdx ? "done" : idx === stepIdx ? "active" : "idle"}`}>
                      {idx < stepIdx ? "✓" : idx + 1}
                    </div>
                    <span className="text-[9px] tracking-wider uppercase text-muted-foreground whitespace-nowrap">{step}</span>
                  </div>
                  {idx < STATUS_STEPS.length - 1 && (
                    <div className={`flex-1 h-px mx-1 mb-4 ${idx < stepIdx ? "bg-rose-dark" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ordered Pieces */}
          <div className="atelier-card p-5">
            <h3 className="font-display text-lg font-semibold mb-4">Ordered Pieces</h3>
            <div className="space-y-4">
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-14 h-16 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">SIZE: {item.size} · COLOR: {item.color}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[10px] tracking-widest uppercase text-muted-foreground">PRICE</p>
                      <p className="font-semibold text-sm text-foreground">{fmt(item.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Notes */}
          <div className="atelier-card p-5">
            <h3 className="font-display text-lg font-semibold mb-3">Atelier Internal Notes</h3>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4}
              className="w-full bg-secondary rounded-xl p-3 text-sm font-accent italic text-muted-foreground outline-none resize-none focus:ring-2 focus:ring-primary/20"
              placeholder="Add private notes..." />
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10px] text-muted-foreground">Last edited by Admin, 1 day ago</p>
              <button className="flex items-center gap-1 text-xs text-rose-dark font-medium"><Save size={12} />SAVE NOTE</button>
            </div>
          </div>

          {/* Customer Info */}
          <div className="atelier-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <img src={order.avatar} alt={order.customer} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{order.customer}</p>
                {order.isVip && <p className="label-text text-rose-dark">VIP CLIENT</p>}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} className="text-rose-dark flex-shrink-0" />{order.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} className="text-rose-dark flex-shrink-0" />{order.phone}
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="atelier-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-lg font-semibold">Delivery Address</h3>
              <MapPin size={16} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-foreground">{order.address.street}</p>
            <p className="text-sm text-muted-foreground">{order.address.city}</p>
            <p className="text-sm text-muted-foreground">{order.address.country}</p>
            <div className="mt-3 h-20 bg-secondary rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=300&q=80" alt="" className="w-full h-full object-cover opacity-50" />
            </div>
          </div>

          {/* Order Value — dark card */}
          <div className="admin-gradient rounded-2xl p-5">
            <h3 className="font-display text-lg font-semibold text-white mb-3">Order Value</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/70"><span>SUBTOTAL</span><span>{fmt(order.subtotal)}</span></div>
              <div className="flex justify-between text-sm text-white/70"><span>SHIPPING</span><span className="text-primary">Complimentary</span></div>
              <div className="flex justify-between text-sm text-white/70"><span>LUXURY VAT (18%)</span><span>{fmt(order.vat)}</span></div>
              <div className="flex justify-between font-bold text-white text-base pt-2 border-t border-white/20">
                <span>TOTAL AMOUNT</span><span>{fmt(order.subtotal + order.vat)}</span>
              </div>
            </div>
          </div>

          {/* Tracking */}
          <div className="atelier-card p-5">
            <p className="label-text text-muted-foreground mb-2">LOGISTICS DETAIL</p>
            <input value={tracking} onChange={(e) => setTracking(e.target.value)}
              placeholder="Add tracking number..." className="field" />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
