import { Award, Heart, Globe, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const values = [
  { icon: Heart, title: "Passion for Fashion", desc: "We curate each piece with love, ensuring every item reflects the elegance our customers deserve." },
  { icon: Award, title: "Premium Quality", desc: "Only the finest fabrics and craftsmanship make it into our collection — quality you can feel." },
  { icon: Globe, title: "Istanbul Heritage", desc: "Rooted in Istanbul's vibrant fashion scene, we bridge Eastern elegance with Western sophistication." },
  { icon: Sparkles, title: "Modern Luxury", desc: "Accessible luxury for the modern woman — timeless pieces that fit every occasion and every budget." },
];

const AboutPage = () => (
  <Layout>
    <div className="bg-secondary py-8">
      <div className="container">
        <h1 className="font-display text-3xl md:text-4xl italic">Our Story</h1>
      </div>
    </div>

    {/* Story */}
    <section className="container py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="label-text text-primary mb-2">ABOUT LADY FASHION</p>
          <h2 className="font-display text-3xl italic mb-4">Where Istanbul Meets Elegance</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Born in the heart of Istanbul's prestigious Nişantaşı district, Lady Fashion was founded with a singular vision: 
            to bring the sophistication of European fashion houses to the modern Turkish woman and beyond.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every piece in our collection is thoughtfully curated — from silk blouses handcrafted in Italian ateliers 
            to accessories that capture the golden light of the Bosphorus. We believe luxury should be accessible, 
            personal, and always empowering.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img src={hero1} alt="Lady Fashion boutique" className="w-full h-80 object-cover" />
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-12 md:py-20 bg-muted">
      <div className="container">
        <p className="label-text text-primary text-center mb-2">OUR VALUES</p>
        <h2 className="font-display text-3xl italic text-center mb-10">Why Choose Lady Fashion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-lg p-6 text-center card-shadow">
              <v.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Brand image */}
    <section className="relative overflow-hidden">
      <img src={hero2} alt="Fashion editorial" className="w-full h-64 md:h-96 object-cover" />
      <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
        <div className="text-center">
          <p className="label-text text-card/80 mb-2">LADY FASHION</p>
          <h2 className="font-display text-3xl md:text-5xl text-card font-bold italic">Elegance Redefined</h2>
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutPage;
