import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Instagram, 
  Twitter, 
  Facebook, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  CreditCard, 
  Headphones, 
  Gift,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// --- Types ---

type Page = 'home' | 'about' | 'shop' | 'services' | 'contact';

interface CartItem extends Product {
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  priceNaira: number;
  image: string;
  gallery: string[];
  category: string;
  description: string;
}

const formatPrice = (ngn: number) => {
  return `₦${ngn.toLocaleString()}`;
};

// --- Constants ---

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Aurelius Gold Edition",
    price: 1250,
    priceNaira: 2000000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1508685096489-7aac296839c8?auto=format&fit=crop&q=80&w=800"
    ],
    category: "ROLEX",
    description: "A timeless masterpiece featuring 18k gold plating and a sapphire crystal face. The Aurelius Gold Edition represents the pinnacle of our craftsmanship, combining traditional watchmaking with modern luxury aesthetics."
  },
  {
    id: 2,
    name: "Midnight Stealth",
    price: 950,
    priceNaira: 1520000,
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800"
    ],
    category: "G-SHOCK",
    description: "Matte black finish with minimalist markers for the modern professional. The Midnight Stealth is designed for those who value understated elegance and precision in every detail."
  },
  {
    id: 3,
    name: "Chronos Heritage",
    price: 1500,
    priceNaira: 2400000,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
    ],
    category: "PATEK",
    description: "Automatic movement with a transparent case back showing the intricate mechanics. The Chronos Heritage is a tribute to the golden age of watchmaking, featuring a complex movement and hand-finished details."
  },
  {
    id: 4,
    name: "Oceanic Diver",
    price: 1100,
    priceNaira: 1760000,
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800"
    ],
    category: "TISSOT",
    description: "Water-resistant up to 200m with a luminous dial for deep sea exploration. The Oceanic Diver combines rugged durability with high-end style, making it the perfect companion for both adventure and formal events."
  },
  {
    id: 5,
    name: "Rose Gold Elegance",
    price: 1350,
    priceNaira: 2160000,
    image: "https://images.unsplash.com/photo-1508685096489-7aac296839c8?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1508685096489-7aac296839c8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800"
    ],
    category: "CARTIER",
    description: "Sophisticated rose gold casing paired with a premium Italian leather strap. The Rose Gold Elegance is a statement of refined taste, perfect for those who appreciate the warmer tones of luxury."
  },
  {
    id: 6,
    name: "Titanium Executive",
    price: 1800,
    priceNaira: 2880000,
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800"
    ],
    category: "HUBLOT",
    description: "Ultra-lightweight titanium construction with a scratch-resistant ceramic bezel. The Titanium Executive is the ultimate tool for the high-flying professional, offering unmatched comfort and durability."
  },
  {
    id: 7,
    name: "Poedegar Classic Leather",
    price: 450,
    priceNaira: 25000,
    image: "https://i.postimg.cc/yNmcS5ry/Poedegar_1.png",
    gallery: [
      "https://i.postimg.cc/0NYDJ3H7/Poedegar-4.png",
      "https://i.postimg.cc/XvfdyhDx/Poedegar_2.png",
      "https://i.postimg.cc/N06mrVPD/Poedegar_3.png",
      "https://i.postimg.cc/FKy3Jqnb/Poedegar_5.png",
      "https://i.postimg.cc/cJRw8j5M/Poedegar_6.png"
    ],
    category: "POEDEGAR LEATHER",
    description: "WATERPROOFS WITH SAPPHIRE GLASS, COMES WITH BRANDED BOX,WARRANTY CARD,EXTRA BATTERY AND CARRIER BAG"
  },
  {
    id: 8,
    name: "Royal Oak Concept",
    price: 2500,
    priceNaira: 4000000,
    image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800"
    ],
    category: "AP",
    description: "A masterpiece of engineering and design. The Royal Oak Concept is a bold statement of luxury."
  },
  {
    id: 9,
    name: "RM 011 Red Quartz",
    price: 5000,
    priceNaira: 8000000,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800"
    ],
    category: "RICHARDMILLI",
    description: "High-performance materials and avant-garde design. A true collector's item."
  },
  {
    id: 10,
    name: "Casio Vintage Gold",
    price: 150,
    priceNaira: 240000,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800"
    ],
    category: "CASIO",
    description: "A retro classic that never goes out of style. Durable and iconic."
  }
];

// --- Components ---

const Navbar = ({ currentPage, setPage, cartCount, onOpenCart }: { 
  currentPage: Page, 
  setPage: (p: Page) => void,
  cartCount: number,
  onOpenCart: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string, id: Page }[] = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Shop', id: 'shop' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-4 shadow-lg' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => setPage('home')} className="flex items-center">
          <img 
            src="https://i.postimg.cc/ChFWJr3D/Fashion-House-NG.png" 
            alt="FashionhouseNG Logo" 
            className="h-12 w-12 md:h-16 md:w-16 object-cover rounded-full border-2 border-gold/20 p-1 bg-white/10"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`text-xs uppercase tracking-[0.2em] transition-colors hover:text-gold ${currentPage === link.id ? 'text-gold' : 'text-white/70'}`}
            >
              {link.name}
            </button>
          ))}
          <button onClick={onOpenCart} className="relative group">
            <ShoppingBag className="w-5 h-5 text-white/70 group-hover:text-gold transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={onOpenCart} className="relative">
            <ShoppingBag className="w-5 h-5 text-white/70" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-t border-white/10 py-10 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { setPage(link.id); setIsOpen(false); }}
                  className={`text-sm uppercase tracking-[0.3em] ${currentPage === link.id ? 'text-gold' : 'text-white'}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-6">
            <img 
              src="https://i.postimg.cc/ChFWJr3D/Fashion-House-NG.png" 
              alt="FashionhouseNG Logo" 
              className="h-12 w-12 object-cover rounded-full border-2 border-gold/20 p-1 bg-white/10"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Crafting timeless elegance for the modern individual. Our watches are more than just timepieces; they are a statement of sophistication.
          </p>
          <div className="flex space-x-4">
            <Instagram className="w-5 h-5 text-white/50 hover:text-gold cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-white/50 hover:text-gold cursor-pointer transition-colors" />
            <Facebook className="w-5 h-5 text-white/50 hover:text-gold cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><button onClick={() => setPage('home')} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => setPage('shop')} className="hover:text-white transition-colors">Shop Collection</button></li>
            <li><button onClick={() => setPage('about')} className="hover:text-white transition-colors">Our Story</button></li>
            <li><button onClick={() => setPage('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Customer Care</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><button onClick={() => setPage('services')} className="hover:text-white transition-colors">Shipping & Returns</button></li>
            <li><button onClick={() => setPage('services')} className="hover:text-white transition-colors">Warranty Info</button></li>
            <li><button onClick={() => setPage('services')} className="hover:text-white transition-colors">Secure Payments</button></li>
            <li><button onClick={() => setPage('contact')} className="hover:text-white transition-colors">FAQ</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Newsletter</h4>
          <p className="text-white/50 text-sm mb-4">Join our elite circle for exclusive previews and offers.</p>
          <div className="flex border-b border-white/20 pb-2">
            <input type="email" placeholder="Your email address" className="bg-transparent border-none outline-none text-sm w-full" />
            <button className="text-gold hover:translate-x-1 transition-transform"><ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-white/30 text-[10px] uppercase tracking-widest">© 2024 FashionhouseNG. All Rights Reserved.</p>
        <div className="text-white/30 text-[10px] uppercase tracking-widest">
          Site developed by <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">Kuteyi Vincent</a>
        </div>
        <div className="flex space-x-6">
          <span className="text-white/30 text-[10px] uppercase tracking-widest cursor-pointer hover:text-white">Privacy Policy</span>
          <span className="text-white/30 text-[10px] uppercase tracking-widest cursor-pointer hover:text-white">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[],
  onUpdateQuantity: (id: number, delta: number) => void,
  onRemoveItem: (id: number) => void
}) => {
  const totalNGN = items.reduce((sum, item) => sum + (item.priceNaira * item.quantity), 0);

  const handleCheckout = () => {
    const phoneNumber = "+2348176578290";
    let message = "Hello FashionhouseNG, I would like to purchase the following items:\n\n";
    
    items.forEach(item => {
      message += `- ${item.name} x ${item.quantity} (${formatPrice(item.priceNaira * item.quantity)})\n`;
    });
    
    message += `\nTotal Price: ${formatPrice(totalNGN)}\n\nThank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-serif">Your Shopping Bag</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-white/10" />
                  <p className="text-white/30 uppercase tracking-widest text-xs">Your bag is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="w-24 h-32 bg-zinc-900 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-serif">{item.name}</h3>
                          <button onClick={() => onRemoveItem(item.id)} className="text-white/30 hover:text-gold">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gold font-mono text-xs mt-1">{formatPrice(item.priceNaira)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-white/10">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-3 py-1 text-white/50 hover:text-white"
                          >-</button>
                          <span className="px-2 text-xs font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-3 py-1 text-white/50 hover:text-white"
                          >+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs uppercase tracking-widest text-white/50">Subtotal</span>
                  <span className="text-lg font-serif text-gold">{formatPrice(totalNGN)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-gold text-black py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300 flex items-center justify-center"
                >
                  Checkout via WhatsApp
                </button>
                <p className="text-[10px] text-center text-white/30 mt-4 uppercase tracking-widest">
                  Secure checkout powered by WhatsApp
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart 
}: { 
  product: Product | null, 
  isOpen: boolean, 
  onClose: () => void,
  onAddToCart: (p: Product) => void
}) => {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (isOpen) setActiveImage(0);
  }, [isOpen]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-[80] backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-20 bg-zinc-950 z-[90] shadow-2xl overflow-y-auto flex flex-col md:flex-row"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white z-10">
              <X className="w-8 h-8" />
            </button>

            {/* Gallery */}
            <div className="w-full md:w-1/2 h-[400px] md:h-full bg-zinc-900 relative">
              <img 
                src={product.gallery[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute bottom-6 left-6 right-6 flex space-x-4 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-gold' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center">
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{product.category}</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-6">{product.name}</h2>
              <p className="text-gold font-mono text-2xl mb-10">{formatPrice(product.priceNaira)}</p>
              <div className="w-12 h-[1px] bg-gold mb-10"></div>
              <p className="text-white/60 leading-relaxed mb-12 text-lg">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => { onAddToCart(product); onClose(); }}
                  className="bg-gold text-black px-12 py-5 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300 luxury-shadow flex-grow"
                >
                  Add to Shopping Bag
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const HomePage = ({ setPage, onAddToCart, onProductClick }: { 
  setPage: (p: Page) => void, 
  onAddToCart: (p: Product) => void,
  onProductClick: (p: Product) => void
}) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Watch" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 block"
          >
            Excellence in Every Second
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-8xl font-serif mb-8 leading-tight"
          >
            Timeless Style.<br />Modern Luxury.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button 
              onClick={() => setPage('shop')}
              className="bg-gold text-black px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300 luxury-shadow"
            >
              Shop Collection
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-12 bg-white/30"></div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif">Featured Timepieces</h2>
          </div>
          <button onClick={() => setPage('shop')} className="text-white/50 hover:text-gold transition-colors text-xs uppercase tracking-widest mt-6 md:mt-0 flex items-center">
            View All Products <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {PRODUCTS.slice(0, 3).map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 mb-6 cursor-pointer" onClick={() => onProductClick(product)}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                
                {/* Desktop Hover Button */}
                <div className="absolute bottom-6 left-6 right-6 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden md:block">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                    className="w-full bg-white text-black py-3 text-xs uppercase tracking-widest font-bold hover:bg-gold transition-colors"
                  >
                    Add to Bag
                  </button>
                </div>

                {/* Mobile Always-Visible Button */}
                <div className="absolute bottom-4 left-4 right-4 md:hidden">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                    className="w-full bg-gold text-black py-2 text-[10px] uppercase tracking-widest font-bold shadow-lg"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
              <div className="cursor-pointer" onClick={() => onProductClick(product)}>
                <h3 className="text-xl font-serif mb-2">{product.name}</h3>
                <p className="text-gold font-mono text-sm">{formatPrice(product.priceNaira)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Intro */}
      <section className="bg-zinc-950 py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 border border-gold/20 -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800" 
              alt="Craftsmanship" 
              className="w-full h-[600px] object-cover luxury-shadow"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 bg-gold p-8 text-black hidden md:block">
              <p className="font-serif text-2xl italic">"Elegance is not being noticed, but being remembered."</p>
            </div>
          </div>
          <div>
            <span className="text-gold uppercase tracking-widest text-xs font-bold mb-6 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">The Art of Precision and Style</h2>
            <p className="text-white/60 leading-relaxed mb-10 text-lg">
              At FashionhouseNG, we believe that a watch is more than a tool for telling time. It is a legacy, a piece of art that rests on your wrist, reflecting your journey and your aspirations.
            </p>
            <p className="text-white/60 leading-relaxed mb-12">
              Every timepiece in our collection is meticulously curated to meet the highest standards of aesthetic appeal and mechanical excellence. From classic dress watches to modern minimalist designs, we offer a range that speaks to the connoisseur in you.
            </p>
            <button onClick={() => setPage('about')} className="border border-gold text-gold px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-gold hover:text-black transition-all duration-300">
              Discover Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <span className="text-gold uppercase tracking-widest text-xs font-bold mb-8 block">Client Experiences</span>
        <div className="relative">
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-10">
            "The craftsmanship of the Aurelius Gold Edition is simply breathtaking. It's the perfect balance of weight, style, and precision. I've never received so many compliments on a timepiece."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-12 h-[1px] bg-gold mb-4"></div>
            <h4 className="text-white uppercase tracking-widest text-xs font-bold">Alexander Vance</h4>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Collector & Entrepreneur</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-40 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1920" 
            alt="Watch Background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-10">Elevate Your Wrist Game</h2>
          <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect timepiece with FashionhouseNG.
          </p>
          <button onClick={() => setPage('shop')} className="bg-white text-black px-12 py-5 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all duration-300">
            Explore The Collection
          </button>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-32 pb-20">
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-20">
          <span className="text-gold uppercase tracking-widest text-xs font-bold mb-6 block">Our Legacy</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8">The FashionhouseNG Story</h1>
          <div className="w-20 h-[1px] bg-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h2 className="text-3xl font-serif mb-6">Born from a Passion for Elegance</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Founded in 2018, FashionhouseNG began with a simple mission: to make luxury timepieces accessible to those who appreciate the finer things in life. We noticed a gap in the market between overpriced heritage brands and low-quality mass-produced watches.
            </p>
            <p className="text-white/60 leading-relaxed mb-6">
              Our journey started in a small studio, where we hand-selected every component, from the movements to the leather straps. Today, we have grown into a premier destination for watch enthusiasts across the nation, known for our uncompromising quality and aesthetic vision.
            </p>
          </div>
          <div className="aspect-square bg-zinc-900 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=800" 
              alt="Watch Workshop" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-10 border border-white/5 bg-zinc-950">
            <h3 className="text-gold font-serif text-2xl mb-4">Our Mission</h3>
            <p className="text-white/50 text-sm leading-relaxed">To empower individuals through timeless style and superior craftsmanship, one wrist at a time.</p>
          </div>
          <div className="p-10 border border-white/5 bg-zinc-950">
            <h3 className="text-gold font-serif text-2xl mb-4">Our Vision</h3>
            <p className="text-white/50 text-sm leading-relaxed">To become the global benchmark for modern luxury accessories, blending heritage with innovation.</p>
          </div>
          <div className="p-10 border border-white/5 bg-zinc-950">
            <h3 className="text-gold font-serif text-2xl mb-4">Our Values</h3>
            <p className="text-white/50 text-sm leading-relaxed">Integrity, Precision, and Aesthetic Excellence are the pillars that support everything we do.</p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-16">Why Choose FashionhouseNG?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { title: "Premium Materials", desc: "We use only the finest sapphire glass, 316L stainless steel, and top-grain leathers." },
              { title: "Precision Movement", desc: "Our watches feature reliable Japanese and Swiss movements for accurate timekeeping." },
              { title: "Unique Designs", desc: "Every piece is designed with a focus on minimalist luxury and modern aesthetics." },
              { title: "Lifetime Support", desc: "We stand by our products with comprehensive warranties and expert customer care." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-6 text-gold font-bold">{i + 1}</div>
                <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-4">{item.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ShopPage = ({ onAddToCart, onProductClick }: { onAddToCart: (p: Product) => void, onProductClick: (p: Product) => void }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'G-SHOCK', 'POEDEGAR LEATHER', 'AP', 'PATEK', 'TISSOT', 'HUBLOT', 'ROLEX', 'CARTIER', 'RICHARDMILLI', 'CASIO'];
  
  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-gold uppercase tracking-widest text-xs font-bold mb-6 block">The Collection</span>
        <h1 className="text-5xl font-serif mb-8">Shop All Watches</h1>
        
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all duration-300 ${filter === cat ? 'bg-gold border-gold text-black' : 'border-white/10 text-white/50 hover:border-white/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
        {filteredProducts.map((product) => (
          <motion.div 
            layout
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 mb-6 cursor-pointer" onClick={() => onProductClick(product)}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-black/80 text-gold text-[10px] uppercase tracking-widest px-3 py-1 border border-gold/30">{product.category}</span>
              </div>
              
              {/* Desktop Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 hidden md:flex">
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                  className="bg-white text-black px-6 py-3 text-[10px] uppercase tracking-widest font-bold luxury-shadow hover:bg-gold transition-colors"
                >
                  Add to Bag
                </button>
              </div>

              {/* Mobile Always-Visible Button */}
              <div className="absolute bottom-4 left-4 right-4 md:hidden">
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                  className="w-full bg-gold text-black py-2 text-[10px] uppercase tracking-widest font-bold shadow-lg"
                >
                  Add to Bag
                </button>
              </div>
            </div>
            <div className="flex justify-between items-start cursor-pointer" onClick={() => onProductClick(product)}>
              <div>
                <h3 className="text-lg font-serif mb-1">{product.name}</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">{product.category}</p>
              </div>
              <p className="text-gold font-mono text-sm">{formatPrice(product.priceNaira)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const services = [
    {
      icon: <Truck className="w-8 h-8 text-gold" />,
      title: "Nationwide Delivery",
      desc: "We offer secure and tracked shipping to all locations across the country. Your timepiece arrives in pristine condition."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-gold" />,
      title: "Secure Payments",
      desc: "Shop with confidence using our encrypted payment gateways. We accept all major cards and bank transfers."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold" />,
      title: "1-Year Warranty",
      desc: "Every FashionhouseNG watch comes with a comprehensive 2-year warranty covering manufacturing defects."
    },
    {
      icon: <Headphones className="w-8 h-8 text-gold" />,
      title: "24/7 Support",
      desc: "Our dedicated concierge team is available around the clock to assist you with any inquiries or issues."
    },
    {
      icon: <Gift className="w-8 h-8 text-gold" />,
      title: "Gift Packaging",
      desc: "Complimentary premium gift wrapping and personalized notes available for those special occasions."
    },
    {
      icon: <ArrowRight className="w-8 h-8 text-gold" />,
      title: "Easy Returns",
      desc: "Not perfectly satisfied? We offer a hassle-free 14-day return policy for all unworn timepieces."
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-gold uppercase tracking-widest text-xs font-bold mb-6 block">Our Commitment</span>
        <h1 className="text-5xl font-serif mb-8">Premium Services</h1>
        <p className="text-white/50 max-w-2xl mx-auto">We provide a seamless luxury experience from the moment you browse to the moment your watch arrives at your doorstep.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-12 border border-white/5 bg-zinc-950 hover:border-gold/30 transition-all duration-500 group"
          >
            <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
            <h3 className="text-xl font-serif mb-4">{service.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 bg-gold p-12 md:p-20 text-black text-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-8">Need a Custom Solution?</h2>
        <p className="text-black/70 mb-10 max-w-2xl mx-auto">Whether it's corporate gifting or a special request, our team is here to help you find the perfect match.</p>
        <button className="bg-black text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all duration-300">Contact Concierge</button>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-gold uppercase tracking-widest text-xs font-bold mb-6 block">Get In Touch</span>
        <h1 className="text-5xl font-serif mb-8">Contact Us</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-3xl font-serif mb-8">We'd Love to Hear From You</h2>
          <p className="text-white/50 mb-12">Have a question about our collection or need assistance with an order? Our team is ready to provide you with the support you need.</p>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="bg-zinc-900 p-4"><Mail className="w-5 h-5 text-gold" /></div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-1">Email Us</h4>
                <p className="text-white/40 text-sm">kuteyioluwaloyevincent291@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="bg-zinc-900 p-4"><Phone className="w-5 h-5 text-gold" /></div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-1">Call / WhatsApp</h4>
                <p className="text-white/40 text-sm">+234 817 657 8290</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="bg-zinc-900 p-4"><MapPin className="w-5 h-5 text-gold" /></div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-1">Showroom</h4>
                <p className="text-white/40 text-sm">12 Luxury Way, Victoria Island, Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-6">Follow Our Journey</h4>
            <div className="flex space-x-6">
              <Instagram className="w-6 h-6 text-white/30 hover:text-gold cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-white/30 hover:text-gold cursor-pointer transition-colors" />
              <Facebook className="w-6 h-6 text-white/30 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 p-10 md:p-16 border border-white/5 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
              >
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-3xl font-serif">Form submitted successfully</h3>
                <p className="text-white/50 max-w-xs">Thank you for reaching out. Our concierge team will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-gold uppercase tracking-widest text-[10px] font-bold border-b border-gold pb-1 hover:text-white hover:border-white transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50">Full Name</label>
                    <input required name="name" type="text" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50">Email Address</label>
                    <input required name="email" type="email" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-gold transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Subject</label>
                  <input required name="subject" type="text" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-gold transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Message</label>
                  <textarea required name="message" rows={4} className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-gold transition-colors resize-none"></textarea>
                </div>
                <button 
                  disabled={isLoading}
                  className="w-full bg-gold text-black py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentPage={currentPage} 
        setPage={setCurrentPage} 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentPage === 'home' && <HomePage setPage={setCurrentPage} onAddToCart={addToCart} onProductClick={setSelectedProduct} />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'shop' && <ShopPage onAddToCart={addToCart} onProductClick={setSelectedProduct} />}
            {currentPage === 'services' && <ServicesPage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      <ProductDetailModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <Footer setPage={setCurrentPage} />
    </div>
  );
}
