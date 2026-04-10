import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, Star, Truck, RotateCcw, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { getProductById, getProducts } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

const ProductPage = () => {
  const { id } = useParams();
  const product = getProductById(id || "");
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-primary hover:text-rose-dark underline">Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  const sizeStock = product.sizes.find((s) => s.size === selectedSize)?.stock ?? 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    if (!selectedColor && product.colors.length > 1) {
      toast({ title: "Please select a color", variant: "destructive" });
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor || product.colors[0]?.name || "",
      quantity,
    });
    toast({ title: "Added to cart!", description: `${product.name} × ${quantity}` });
  };

  const relatedProducts = getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-24 rounded-md overflow-hidden shrink-0 border-2 transition-all ${i === selectedImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.badge && (
              <span className={`inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-pill ${
                product.badge === "SALE" ? "bg-gold text-primary-foreground" :
                product.badge === "NEW" ? "bg-rose-dark text-primary-foreground" :
                "bg-foreground text-card"
              }`}>
                {product.badge === "NEW" ? "New Arrival" : product.badge}
              </span>
            )}

            <h1 className="font-display text-3xl md:text-4xl">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold bg-gold/20 text-gold px-2 py-0.5 rounded-pill">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                  Color: <span className="font-normal text-muted-foreground">{selectedColor || "Select"}</span>
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === c.name ? "border-primary ring-2 ring-primary/30 scale-110" : "border-border hover:scale-105"}`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Size</h3>
                <button className="text-xs text-primary hover:text-rose-dark underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    className={`min-w-[3rem] px-4 py-2.5 text-sm border rounded-pill transition-all ${
                      selectedSize === s.size
                        ? "bg-primary text-primary-foreground border-primary"
                        : s.stock === 0
                        ? "border-border text-muted-foreground/40 cursor-not-allowed line-through"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
              {selectedSize && sizeStock <= 5 && sizeStock > 0 && (
                <p className="text-xs text-destructive mt-2">Only {sizeStock} left in stock!</p>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-pill">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-primary transition">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-primary transition">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground rounded-pill py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-rose-dark transition-all hover:scale-[1.01]"
              >
                Add to Cart
              </button>
              <button className="p-3 border border-border rounded-full hover:border-primary hover:text-primary transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl md:text-3xl italic mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} originalPrice={p.originalPrice} image={p.images[0]} rating={p.rating} badge={p.badge} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
