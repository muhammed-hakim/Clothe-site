import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Package } from "lucide-react";
import Layout from "@/components/layout/Layout";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const state = location.state as { orderId: string; items: any[]; total: number; form: any } | null;

  if (!state) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl mb-4">No Order Found</h1>
          <Link to="/" className="text-primary hover:text-rose-dark underline">Go Home</Link>
        </div>
      </Layout>
    );
  }

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);

  return (
    <Layout>
      <div className="container py-12 md:py-20 max-w-2xl">
        <div className="text-center mb-10">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h1 className="font-display text-3xl md:text-4xl mb-2">Thank You!</h1>
          <p className="text-muted-foreground">Your order has been placed successfully.</p>
        </div>

        <div className="bg-card rounded-lg p-6 card-shadow space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Order ID</p>
              <p className="font-semibold text-primary">{state.orderId}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated Delivery</p>
              <p className="font-medium">{estimatedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" /> Order Items
            </h3>
            <div className="space-y-3">
              {state.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.name} <span className="text-muted-foreground">×{item.quantity} ({item.size})</span></span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4 flex justify-between font-semibold">
            <span>Total Paid</span>
            <span className="text-primary">${state.total.toFixed(2)}</span>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Delivery Address</h3>
            <p className="text-sm text-muted-foreground">
              {state.form.fullName}<br />
              {state.form.address}<br />
              {state.form.city}, {state.form.postalCode}<br />
              {state.form.country}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
          <Link to="/shop" className="bg-primary text-primary-foreground rounded-pill px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-rose-dark transition text-center">
            Continue Shopping
          </Link>
          <Link to="/" className="border border-border rounded-pill px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:border-foreground transition text-center">
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
