import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-card pt-16 pb-8">
      <div className="container">
        {/* Newsletter */}
        <div className="text-center mb-12">
          <h3 className="font-display text-2xl mb-2">The Atelier Letter</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Join our inner circle for early access to collections and personal styling notes.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 bg-transparent border border-muted-foreground/30 rounded-pill px-4 py-2.5 text-xs uppercase tracking-wider placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary"
            />
            <button className="bg-primary text-primary-foreground rounded-pill px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-rose-dark transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="label-text text-card/60 mb-4">Boutique</h4>
            <nav className="space-y-2">
              <Link to="/shop" className="block text-sm text-card/80 hover:text-primary transition-colors">New Arrivals</Link>
              <Link to="/shop" className="block text-sm text-card/80 hover:text-primary transition-colors">Dresses</Link>
              <Link to="/shop" className="block text-sm text-card/80 hover:text-primary transition-colors">Accessories</Link>
              <Link to="/shop" className="block text-sm text-card/80 hover:text-primary transition-colors">Sale</Link>
            </nav>
          </div>
          <div>
            <h4 className="label-text text-card/60 mb-4">Support</h4>
            <nav className="space-y-2">
              <Link to="/contact" className="block text-sm text-card/80 hover:text-primary transition-colors">Contact</Link>
              <Link to="/about" className="block text-sm text-card/80 hover:text-primary transition-colors">About</Link>
              <Link to="/" className="block text-sm text-card/80 hover:text-primary transition-colors">Shipping</Link>
              <Link to="/" className="block text-sm text-card/80 hover:text-primary transition-colors">Returns</Link>
            </nav>
          </div>
          <div>
            <h4 className="label-text text-card/60 mb-4">About</h4>
            <nav className="space-y-2">
              <Link to="/about" className="block text-sm text-card/80 hover:text-primary transition-colors">Our Story</Link>
              <Link to="/about" className="block text-sm text-card/80 hover:text-primary transition-colors">Craftsmanship</Link>
              <Link to="/about" className="block text-sm text-card/80 hover:text-primary transition-colors">Sustainability</Link>
            </nav>
          </div>
          <div>
            <h4 className="label-text text-card/60 mb-4">Connect</h4>
            <div className="flex items-center gap-3 mb-3">
              <a href="#" className="text-card/80 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-card/80 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
            <p className="text-sm text-card/60">Istanbul, Turkey</p>
            <p className="text-sm text-card/60">Nişantaşı District</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-card/10 pt-6 text-center">
          <p className="text-xs text-card/40">
            © {new Date().getFullYear()} LADY FASHION. THE ATELIER EDITORIAL.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
