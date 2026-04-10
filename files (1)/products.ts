export interface ProductSize { size: string; stock: number; }
export interface ProductColor { name: string; hex: string; }

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  stock: number;
  rating: number;
  reviewCount: number;
  badge?: 'NEW' | 'SALE' | 'EXCLUSIVE' | 'LIMITED';
  featured: boolean;
  isNewArrival: boolean;
  designerNote?: string;
  materials?: string[];
  stylingTips?: string;
}

export const CATEGORIES = [
  { id: 't-shirts-tops', name: 'T-Shirts & Tops', subcategories: ['Casual Tops','Blouses','Crop Tops','Knitwear'] },
  { id: 'pants-jeans',   name: 'Pants & Jeans',  subcategories: ['Jeans','Trousers','Leggings','Shorts'] },
  { id: 'shoes',         name: 'Shoes',           subcategories: ['Heels','Sneakers','Boots','Sandals','Flats'] },
  { id: 'bags',          name: 'Bags & Handbags', subcategories: ['Shoulder Bags','Tote Bags','Clutches','Backpacks'] },
  { id: 'makeup',        name: 'Makeup & Beauty', subcategories: ['Lipstick','Foundation','Skincare','Perfumes'] },
  { id: 'accessories',   name: 'Accessories',     subcategories: ['Jewelry','Scarves','Belts','Sunglasses','Hats'] },
];

export const categoryMap: Record<string, string> = {
  't-shirts-tops': 'T-Shirts & Tops',
  'pants-jeans':   'Pants & Jeans',
  'shoes':         'Shoes',
  'bags':          'Bags & Handbags',
  'makeup':        'Makeup & Beauty',
  'accessories':   'Accessories',
};

const SIZES_CLOTHING: ProductSize[] = [
  { size: 'XS', stock: 3 }, { size: 'S', stock: 5 },
  { size: 'M', stock: 8 }, { size: 'L', stock: 4 },
  { size: 'XL', stock: 2 }, { size: 'XXL', stock: 1 },
];

const COLORS_NEUTRAL: ProductColor[] = [
  { name: 'Rose', hex: '#E8A0B4' },
  { name: 'Ivory', hex: '#FAF7F5' },
  { name: 'Charcoal', hex: '#2C2C2C' },
  { name: 'Mauve', hex: '#B08A9E' },
];

const products: Product[] = [
  {
    id: '1',
    name: 'Atelier Silk Blouse',
    description: 'Crafted from 100% premium mulberry silk, this piece features a delicate cowl neckline and bias-cut silhouette that drapes effortlessly over the body. The subtle rose hue is achieved through natural mineral dyes in our boutique Istanbul atelier.',
    price: 185,
    originalPrice: 240,
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4ebe?w=800&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85',
    ],
    category: 'T-Shirts & Tops',
    subcategory: 'Blouses',
    sizes: [
      { size: 'XS', stock: 2 }, { size: 'S', stock: 2 },
      { size: 'M', stock: 5 }, { size: 'L', stock: 1 }, { size: 'XL', stock: 0 },
    ],
    colors: COLORS_NEUTRAL,
    stock: 10,
    rating: 4.8,
    reviewCount: 124,
    badge: 'NEW',
    featured: true,
    isNewArrival: true,
    designerNote: '"This silhouette was inspired by the golden hour at the Bosphorus. We chose the mulberry silk for its liquid-like drape, catching every beam of light as you move." — AURA DE NİŞANTAŞI',
    materials: ['100% Mulberry Silk', 'Natural mineral dye process', 'Adjustable straps', 'Midi length with side slit'],
    stylingTips: 'Pair with the Riviera Sunglasses and Linen Atelier Blazer for a complete editorial look.',
  },
  {
    id: '2',
    name: 'Nişantaşı Evening Coat',
    description: 'Impeccably tailored in Italian virgin wool, this coat defines effortless elegance. The clean silhouette and subtle texture make it the ultimate investment piece for the modern woman.',
    price: 845,
    images: [
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=85',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=85',
    ],
    category: 'T-Shirts & Tops',
    subcategory: 'Knitwear',
    sizes: [
      { size: 'XS', stock: 0 }, { size: 'S', stock: 1 },
      { size: 'M', stock: 1 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 0 },
    ],
    colors: [{ name: 'Black', hex: '#2C2C2C' }, { name: 'Camel', hex: '#C9A84C' }],
    stock: 2,
    rating: 4.9,
    reviewCount: 56,
    badge: 'LIMITED',
    featured: true,
    isNewArrival: false,
    designerNote: '"Turkish tailoring tradition meets Milanese precision. Each coat is finished by hand in our Nişantaşı workshop."',
    materials: ['100% Italian Virgin Wool', 'Fully lined in silk', 'Mother of pearl buttons'],
  },
  {
    id: '3',
    name: 'Bosphorus Silk Gown',
    description: 'A masterpiece of fluid elegance, designed for the modern muse. Crafted in statement gold silk, this gown commands attention with its dramatic drape and bias-cut construction.',
    price: 1280,
    images: [
      'https://images.unsplash.com/photo-1519238359922-989348752efb?w=800&q=85',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85',
    ],
    category: 'T-Shirts & Tops',
    subcategory: 'Blouses',
    sizes: [
      { size: 'XS', stock: 1 }, { size: 'S', stock: 2 },
      { size: 'M', stock: 2 }, { size: 'L', stock: 1 }, { size: 'XL', stock: 0 },
    ],
    colors: [{ name: 'Gold', hex: '#C9A84C' }, { name: 'Ivory', hex: '#FAF7F5' }],
    stock: 6,
    rating: 5.0,
    reviewCount: 38,
    badge: 'EXCLUSIVE',
    featured: true,
    isNewArrival: true,
    designerNote: '"Every stitch tells a story of the East meeting the West."',
    materials: ['100% Pure Silk', 'Hand-embroidered details', 'Bias-cut for perfect drape'],
  },
  {
    id: '4',
    name: 'Merino Trench',
    description: 'The quintessential layering piece — a fluid trench coat in the finest merino wool blend. Versatile enough for day, refined enough for evening.',
    price: 620,
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=85',
    ],
    category: 'Pants & Jeans',
    subcategory: 'Trousers',
    sizes: SIZES_CLOTHING,
    colors: [{ name: 'Beige', hex: '#F5EFE6' }, { name: 'Charcoal', hex: '#2C2C2C' }],
    stock: 15,
    rating: 4.7,
    reviewCount: 89,
    badge: 'NEW',
    featured: true,
    isNewArrival: true,
  },
  {
    id: '5',
    name: 'Nişantaşı Silk Wrap',
    description: 'Hand-painted in our Istanbul studio, this silk wrap is a wearable work of art. Each piece is unique, carrying the spirit of the artisan\'s hand.',
    price: 4250,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
    ],
    category: 'Accessories',
    subcategory: 'Scarves',
    sizes: [{ size: 'One Size', stock: 2 }],
    colors: [{ name: 'Floral Rose', hex: '#E8A0B4' }],
    stock: 2,
    rating: 4.9,
    reviewCount: 18,
    badge: 'LIMITED',
    featured: true,
    isNewArrival: false,
  },
  {
    id: '6',
    name: 'Pearl Accent Handbag',
    description: 'Structured leather with hand-set pearl detailing. A statement accessory that elevates any ensemble from ordinary to extraordinary.',
    price: 520,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85',
    ],
    category: 'Bags & Handbags',
    subcategory: 'Shoulder Bags',
    sizes: [{ size: 'One Size', stock: 48 }],
    colors: [{ name: 'Tan', hex: '#C9A84C' }, { name: 'Black', hex: '#2C2C2C' }],
    stock: 48,
    rating: 4.6,
    reviewCount: 29,
    featured: false,
    isNewArrival: true,
    badge: 'NEW',
  },
  {
    id: '7',
    name: 'The Atelier Silk Slip Dress',
    description: 'Crafted from 100% premium mulberry silk, this piece features a delicate cowl neckline and bias-cut silhouette that drapes effortlessly over the body.',
    price: 480,
    originalPrice: 595,
    images: [
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4ebe?w=800&q=85',
    ],
    category: 'T-Shirts & Tops',
    subcategory: 'Blouses',
    sizes: [
      { size: 'XS', stock: 1 }, { size: 'S', stock: 2 },
      { size: 'M', stock: 3 }, { size: 'L', stock: 1 }, { size: 'XL', stock: 0 },
    ],
    colors: COLORS_NEUTRAL,
    stock: 7,
    rating: 4.2,
    reviewCount: 124,
    badge: 'SALE',
    featured: true,
    isNewArrival: false,
    designerNote: '"A silhouette born from the golden hours on the Bosphorus."',
    materials: ['100% Mulberry Silk', 'Natural mineral dye', 'Adjustable straps'],
  },
  {
    id: '8',
    name: 'Riviera Sunglasses',
    description: 'Gold acetate frames with gradient lenses — the ultimate summer accessory for the Nişantaşı woman.',
    price: 185,
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=85'],
    category: 'Accessories',
    subcategory: 'Sunglasses',
    sizes: [{ size: 'One Size', stock: 20 }],
    colors: [{ name: 'Gold', hex: '#C9A84C' }, { name: 'Black', hex: '#2C2C2C' }],
    stock: 20,
    rating: 4.5,
    reviewCount: 22,
    featured: false,
    isNewArrival: true,
    badge: 'NEW',
  },
  {
    id: '9',
    name: 'Emerald Satin Blouse',
    description: 'A rich emerald satin blouse with a fluid silhouette and subtle sheen that catches the light beautifully.',
    price: 295,
    images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85'],
    category: 'T-Shirts & Tops',
    subcategory: 'Blouses',
    sizes: SIZES_CLOTHING,
    colors: [{ name: 'Emerald', hex: '#4A7C59' }, { name: 'Black', hex: '#2C2C2C' }],
    stock: 12,
    rating: 4.8,
    reviewCount: 67,
    featured: false,
    isNewArrival: false,
  },
  {
    id: '10',
    name: 'Bosphorus Tote',
    description: 'Full-grain leather tote with gold hardware. Spacious enough for the modern woman\'s daily essentials, elegant enough for the boardroom.',
    price: 680,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85'],
    category: 'Bags & Handbags',
    subcategory: 'Tote Bags',
    sizes: [{ size: 'One Size', stock: 15 }],
    colors: [{ name: 'Cognac', hex: '#C4682E' }, { name: 'Black', hex: '#2C2C2C' }],
    stock: 15,
    rating: 4.9,
    reviewCount: 41,
    featured: true,
    isNewArrival: false,
  },
  {
    id: '11',
    name: 'Palazzo Trousers',
    description: 'Wide-leg palazzo trousers in fluid crepe fabric. The ultimate in effortless elegance.',
    price: 340,
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=85'],
    category: 'Pants & Jeans',
    subcategory: 'Trousers',
    sizes: SIZES_CLOTHING,
    colors: [{ name: 'Ivory', hex: '#FAF7F5' }, { name: 'Black', hex: '#2C2C2C' }, { name: 'Rose', hex: '#E8A0B4' }],
    stock: 20,
    rating: 4.6,
    reviewCount: 33,
    featured: false,
    isNewArrival: true,
    badge: 'NEW',
  },
  {
    id: '12',
    name: 'Gold Accent Belt',
    description: 'Fine Italian leather belt with 24k gold-plated buckle. The finishing touch to any outfit.',
    price: 145,
    images: ['https://images.unsplash.com/photo-1589556264800-08ae9e129a8e?w=800&q=85'],
    category: 'Accessories',
    subcategory: 'Belts',
    sizes: [{ size: 'XS', stock: 5 }, { size: 'S', stock: 5 }, { size: 'M', stock: 5 }, { size: 'L', stock: 3 }],
    colors: [{ name: 'Black', hex: '#2C2C2C' }, { name: 'Tan', hex: '#C9A84C' }],
    stock: 18,
    rating: 4.7,
    reviewCount: 28,
    featured: false,
    isNewArrival: false,
  },
];

export const getProducts = () => products;
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getNewArrivals = () => products.filter((p) => p.isNewArrival);
export const getProductsByCategory = (cat: string) => products.filter((p) => p.category === cat);
