import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, getNewArrivals } from "@/data/products";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import catTops        from "@/assets/cat-tops.jpg";
import catPants       from "@/assets/cat-pants.jpg";
import catShoes       from "@/assets/cat-shoes.jpg";
import catBags        from "@/assets/cat-bags.jpg";
import catMakeup      from "@/assets/cat-makeup.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import promoBanner    from "@/assets/promo-banner.jpg";

const heroSlides = [
  { image: hero1, badge:"SPRING EDITORIAL '24", title:"Spring\nEditorial '24", desc:"A curation of silk silhouettes and tactile luxury.", cta:"EXPLORE NOW",  href:"/shop" },
  { image: hero2, badge:"NEW COLLECTION",       title:"Golden\nEssentials",    desc:"Discover our latest accessories and jewelry.", cta:"SHOP NOW", href:"/shop/accessories" },
];

const categories = [
  { name:"T-Shirts & Tops", image:catTops,        href:"/shop/t-shirts-tops" },
  { name:"Pants & Jeans",   image:catPants,       href:"/shop/pants-jeans"   },
  { name:"Shoes",           image:catShoes,       href:"/shop/shoes"         },
  { name:"Bags & Handbags", image:catBags,        href:"/shop/bags"          },
  { name:"Makeup & Beauty", image:catMakeup,      href:"/shop/makeup"        },
  { name:"Accessories",     image:catAccessories, href:"/shop/accessories"   },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const featured    = getFeaturedProducts().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const cur = heroSlides[slide];

  return (
    <Layout>
      {/* ── Hero Slider ───────────────────────────────── */}
      <section className="relative h-[62vh] md:h-[88vh] overflow-hidden">
        {heroSlides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}>
            <img src={s.image} alt="" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 hero-overlay" />
          </div>
        ))}

        {/* Text */}
        <div className="absolute inset-0 flex items-end pb-14 px-5 md:px-8 md:items-center">
          <div>
            <p className="label-text text-white/70 mb-2">{cur.badge}</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight whitespace-pre-line mb-3">
              {cur.title}
            </h1>
            <p className="font-accent text-base md:text-lg text-white/80 italic mb-6 max-w-xs">{cur.desc}</p>
            <Link to={cur.href} className="btn-primary">{cur.cta}</Link>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? "w-5 bg-primary" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>

        {/* Arrows */}
        <button onClick={() => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => setSlide((s) => (s + 1) % heroSlides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          <ChevronRight size={18} />
        </button>
      </section>

      {/* ── Browse the Atelier ────────────────────────── */}
      <section className="container py-10 md:py-16">
        <p className="label-text text-muted-foreground mb-1">CURATION</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">Browse the Atelier</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Link key={cat.name} to={cat.href}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-square block group">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
              <div className="absolute inset-0 cat-overlay" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="font-display text-sm md:text-base font-semibold text-white italic leading-snug">{cat.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Luxury Essentials ─────────────────────────── */}
      <section className="container py-4 md:py-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="label-text text-muted-foreground mb-1">SELECTION</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">Luxury Essentials</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1 label-text text-rose-dark hover:gap-2 transition-all">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price}
              originalPrice={p.originalPrice} image={p.images[0]} rating={p.rating} badge={p.badge as any} />
          ))}
        </div>
      </section>

      {/* ── Promo Banner ──────────────────────────────── */}
      <section className="container py-6">
        <div className="relative rounded-3xl overflow-hidden">
          <img src={promoBanner} alt="" className="w-full h-56 md:h-72 object-cover" />
          <div className="absolute inset-0 promo-gradient opacity-85" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="font-accent italic text-white/80 text-sm mb-2">Atelier Exclusive</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">20% OFF YOUR FIRST</h3>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">CURATION</h3>
            <Link to="/register" className="btn-secondary border-white text-white hover:bg-white/20">GET THE CODE</Link>
          </div>
        </div>
      </section>

      {/* ── New Arrivals ──────────────────────────────── */}
      <section className="container py-4 md:py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">New Arrivals</h2>
          <Link to="/shop?sort=newest" className="label-text text-rose-dark">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price}
              image={p.images[0]} rating={p.rating} badge="NEW" />
          ))}
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────── */}
      <section className="container py-10 md:py-16">
        <div className="bg-muted rounded-3xl p-8 md:p-12 text-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-rose-dark text-2xl">✉</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">The Atelier Letter</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-md mx-auto leading-relaxed">
            Join our inner circle for early access to collections and personal styling notes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="YOUR EMAIL ADDRESS"
              className="field text-xs tracking-widest text-center flex-1" />
            <button className="btn-primary whitespace-nowrap">SUBSCRIBE</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
