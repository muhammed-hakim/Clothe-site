import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Truck, Lock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

const SHIPPING_COST = 12;
const FREE_SHIPPING_THRESHOLD = 200;

const CheckoutPage = () => {
  const { items, subtotal, totalItems, clearCart } = useCartStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const sub = subtotal();
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = sub + shipping;

  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", address: "", city: "", postalCode: "", country: "Turkey",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl mb-4">No items to checkout</h1>
          <Link to="/shop" className="text-primary hover:text-rose-dark underline">Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  const update = (field: string, value: string) => {
    let v = value;
    if (field === "cardNumber") {
      v = value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();
    }
    if (field === "expiry") {
      v = value.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    }
    if (field === "cvv") v = value.replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [field]: v }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.postalCode.trim()) e.postalCode = "Required";
    if (!form.cardName.trim()) e.cardName = "Required";
    if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Valid card number required";
    if (form.expiry.length < 5) e.expiry = "MM/YY required";
    if (form.cvv.length < 3) e.cvv = "Valid CVV required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const orderId = "LF-" + Date.now().toString(36).toUpperCase();
    clearCart();
    navigate("/order-confirmation", { state: { orderId, items, total, form } });
  };

  const inputClass = (field: string) =>
    `w-full bg-card border ${errors[field] ? "border-destructive" : "border-border"} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground`;

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="font-display text-3xl md:text-4xl italic mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery */}
            <div className="bg-card rounded-lg p-6 card-shadow">
              <div className="flex items-center gap-2 mb-6">
                <Truck className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl">Delivery Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Full Name</label>
                  <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={inputClass("fullName")} placeholder="Jane Doe" />
                  {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Phone</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass("phone")} placeholder="+90 555 123 4567" />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Email</label>
                  <input value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass("email")} placeholder="jane@example.com" />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Address</label>
                  <input value={form.address} onChange={(e) => update("address", e.target.value)} className={inputClass("address")} placeholder="Full delivery address" />
                  {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">City</label>
                  <input value={form.city} onChange={(e) => update("city", e.target.value)} className={inputClass("city")} placeholder="Istanbul" />
                  {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Postal Code</label>
                  <input value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} className={inputClass("postalCode")} placeholder="34000" />
                  {errors.postalCode && <p className="text-xs text-destructive mt-1">{errors.postalCode}</p>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card rounded-lg p-6 card-shadow">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl">Payment Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Cardholder Name</label>
                  <input value={form.cardName} onChange={(e) => update("cardName", e.target.value)} className={inputClass("cardName")} placeholder="JANE DOE" />
                  {errors.cardName && <p className="text-xs text-destructive mt-1">{errors.cardName}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Card Number</label>
                  <input value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value)} className={inputClass("cardNumber")} placeholder="1234 5678 9012 3456" />
                  {errors.cardNumber && <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">Expiry Date</label>
                  <input value={form.expiry} onChange={(e) => update("expiry", e.target.value)} className={inputClass("expiry")} placeholder="MM/YY" />
                  {errors.expiry && <p className="text-xs text-destructive mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-1 block">CVV</label>
                  <input value={form.cvv} onChange={(e) => update("cvv", e.target.value)} className={inputClass("cvv")} placeholder="123" />
                  {errors.cvv && <p className="text-xs text-destructive mt-1">{errors.cvv}</p>}
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4 text-[10px] text-muted-foreground">
                <Lock className="w-3 h-3" /> Your payment information is secured with SSL encryption
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-lg p-6 card-shadow h-fit sticky top-24">
            <h2 className="font-display text-xl mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                  <div className="w-12 h-14 rounded bg-secondary overflow-hidden shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.size} • ×{item.quantity}</p>
                  </div>
                  <span className="text-xs font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${sub.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold text-base">
                <span>Total</span><span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            <button type="submit" className="mt-6 w-full bg-primary text-primary-foreground rounded-pill py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-rose-dark transition">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
