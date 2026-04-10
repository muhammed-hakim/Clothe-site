import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCartStore } from "@/store/cartStore";

const SHIPPING_COST = 12;
const FREE_SHIPPING_THRESHOLD = 200;

const CartPage = () => {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();
  const sub = subtotal();
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = sub + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="font-display text-3xl mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Discover our beautiful collections and add items to your cart.</p>
          <Link to="/shop" className="inline-block bg-primary text-primary-foreground rounded-pill px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-rose-dark transition">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="font-display text-3xl md:text-4xl italic mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 bg-card rounded-lg p-4 card-shadow">
                <Link to={`/product/${item.productId}`} className="w-24 h-32 rounded-md overflow-hidden shrink-0 bg-secondary">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/product/${item.productId}`} className="font-medium text-sm hover:text-primary transition truncate">{item.name}</Link>
                    <button onClick={() => removeItem(item.productId, item.size, item.color)} className="p-1 text-muted-foreground hover:text-destructive transition shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Size: {item.size} {item.color && `• Color: ${item.color}`}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-pill">
                      <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)} className="p-2 hover:text-primary transition">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)} className="p-2 hover:text-primary transition">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card rounded-lg p-6 card-shadow h-fit sticky top-24">
            <h2 className="font-display text-xl mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({totalItems()} items)</span>
                <span>${sub.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? <span className="text-success">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-muted-foreground">
                  Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}
                </p>
              )}
              <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-pill py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-rose-dark transition"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground hover:text-primary transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
