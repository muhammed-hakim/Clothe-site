import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  badge?: "NEW" | "SALE" | "EXCLUSIVE";
}

const ProductCard = ({ id, name, price, originalPrice, image, rating, badge }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-secondary mb-3">
        <div className="aspect-[3/4]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute top-3 right-3 p-2 bg-card/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-primary"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>
        {/* Badge */}
        {badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-pill ${
            badge === "SALE" ? "bg-gold text-primary-foreground" :
            badge === "NEW" ? "bg-rose-dark text-primary-foreground" :
            "bg-foreground text-card"
          }`}>
            {badge === "NEW" ? "New Arrival" : badge}
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-foreground font-sans">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-primary">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
        {rating && (
          <div className="flex items-center gap-0.5 mt-0.5">
            <Star className="w-3 h-3 fill-gold text-gold" />
            <span className="text-xs text-muted-foreground">{rating}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
