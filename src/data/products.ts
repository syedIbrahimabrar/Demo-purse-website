import { Product } from '../types/product';

// Direct asset imports to guarantee Vite bundles and resolves all images 100% reliably
import bagEverydayTote from '../assets/images/bag_everyday_tote_1790236648527.jpg';
import bagLunaSignature from '../assets/images/bag_luna_signature_1790236660806.jpg';
import bagNoirClassic from '../assets/images/bag_noir_classic_1790236686420.jpg';
import bagMiniMuse from '../assets/images/bag_mini_muse_1790236700060.jpg';
import bagMaisonCrossbody from '../assets/images/bag_maison_crossbody_1790236720300.jpg';
import bagSoftTote from '../assets/images/bag_soft_tote_1790236739542.jpg';
import bagSignatureTop from '../assets/images/bag_signature_top_1790236757248.jpg';
import bagLunaShoulder from '../assets/images/bag_luna_shoulder_1790236768646.jpg';
import materialsLeatherMacro from '../assets/images/materials_leather_macro_1790236625928.jpg';

export const formatPKR = (amount: number): string => {
  return `PKR ${amount.toLocaleString('en-US')}`;
};

export const PRODUCTS: Product[] = [
  {
    id: 'the-everyday-tote',
    name: 'The Everyday Tote',
    tagline: 'Refined capacity meets architectural grace',
    price: 12500,
    category: 'tote',
    categoryLabel: 'Tote Bags',
    image: bagEverydayTote,
    galleryImages: [
      bagEverydayTote,
      materialsLeatherMacro,
      bagSoftTote
    ],
    colors: [
      { name: 'Cognac Saddle', hex: '#A25929' },
      { name: 'Onyx Noir', hex: '#1C1C1E' },
      { name: 'Warm Biscuit', hex: '#D7C4A5' }
    ],
    description:
      'The Everyday Tote is designed for the modern connoisseur who requires generous volume without compromising on sculpted proportion. Handcrafted from supple, resilient full-grain leather, it features hand-burnished edge painted handles, an interior magnetic drop pocket, and reinforced base corners with brushed brass protective feet.',
    materialsText:
      'Responsibly sourced calfskin with vegetable-tanned finish. Microfiber suede-lined interior with solid brass hardware coated in protective micro-lacquer.',
    dimensions: '36 cm (W) × 28 cm (H) × 14 cm (D) · Handle drop: 23 cm',
    features: [
      'Accommodates up to a 14" laptop and daily essentials',
      'Dual reinforced rolled top handles for shoulder or arm carry',
      'Interior zip compartment and dual leather slip pockets',
      'Reinforced bottom panel with four solid brass protective studs'
    ],
    isFeatured: true,
    editionBadge: 'Signature Edition'
  },
  {
    id: 'luna-signature',
    name: 'Luna Signature',
    tagline: 'Sculptural trapezoid silhouette in ivory calfskin',
    price: 15900,
    category: 'shoulder',
    categoryLabel: 'Shoulder Bags',
    image: bagLunaSignature,
    galleryImages: [
      bagLunaSignature,
      materialsLeatherMacro,
      bagSignatureTop
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#EDE8DF' },
      { name: 'Honey Tan', hex: '#C28448' },
      { name: 'Midnight Blue', hex: '#162232' }
    ],
    description:
      'Distinguished by its clean architectural lines and balanced trapezoidal form, the Luna Signature represents the purest expression of the AURELIS design ethos. Features a hand-molded arch handle, iconic front turn-lock clasp in 24k-gold dipped brass, and a detachable leather shoulder strap.',
    materialsText:
      'Smooth box-grain calfskin leather treated for water and scratch resistance. Bonded lambskin lining and Italian brass hardware.',
    dimensions: '29 cm (W) × 22 cm (H) × 10 cm (D) · Handle drop: 11 cm',
    features: [
      'Custom gold-plated geometric turn-lock closure',
      'Detachable and adjustable leather shoulder strap (48–56 cm)',
      'Dual partitioned main compartment with center zip divider',
      'Hand-finished lacquered edges painted in five coats'
    ],
    isFeatured: true,
    editionBadge: 'Iconic Model'
  },
  {
    id: 'noir-classic',
    name: 'Noir Classic',
    tagline: 'Timeless structured silhouette in deep midnight noir',
    price: 11500,
    category: 'tote',
    categoryLabel: 'Tote Bags',
    image: bagNoirClassic,
    galleryImages: [
      bagNoirClassic,
      materialsLeatherMacro,
      bagEverydayTote
    ],
    colors: [
      { name: 'Jet Noir', hex: '#141416' },
      { name: 'Chocolate Espresso', hex: '#2F1F17' }
    ],
    description:
      'The Noir Classic brings uncompromising sophistication to formal and cosmopolitan settings. Its structured side gussets expand subtly to provide versatile room while preserving a pristine architectural silhouette from every angle.',
    materialsText:
      'Full-grain Italian pebble leather with natural grain retention. Durable twill lining with antique gold hardware.',
    dimensions: '32 cm (W) × 24 cm (H) × 12 cm (D) · Handle drop: 15 cm',
    features: [
      'Smooth top zip closure with extended leather pull tab',
      'Concealed magnetic exterior slide pocket for smartphone',
      'Internal zippered security pouch with engraved serial plaque',
      'Structured self-standing base'
    ],
    isFeatured: true
  },
  {
    id: 'mini-muse',
    name: 'Mini Muse',
    tagline: 'Delicate evening companion with jewellery-grade chain',
    price: 8900,
    category: 'mini',
    categoryLabel: 'Mini Bags',
    image: bagMiniMuse,
    galleryImages: [
      bagMiniMuse,
      materialsLeatherMacro,
      bagMaisonCrossbody
    ],
    colors: [
      { name: 'Sand Beige', hex: '#D2C1AA' },
      { name: 'Ivory Pearl', hex: '#FAF6ED' },
      { name: 'Saddle Tan', hex: '#9C5B28' }
    ],
    description:
      'Petite yet commanding, the Mini Muse transitions effortlessly from gallery strolls to evening soirées. Styled with an interwoven curb chain strap, a beveled gold flip-latch closure, and an interior card organizer.',
    materialsText:
      'Ultra-soft nappa leather with quilted relief stitching. Microfiber velvet lining with high-shine polished gold chain.',
    dimensions: '20 cm (W) × 13 cm (H) × 6 cm (D) · Chain drop: 52 cm',
    features: [
      'Jewellery-inspired link chain strap for crossbody or doubled shoulder wear',
      'Spring-loaded front lock mechanism',
      'Dedicated interior slot for cards and compact smartphone storage',
      'Lightweight construction weighing only 340 grams'
    ],
    isFeatured: true,
    editionBadge: 'Best Seller'
  },
  {
    id: 'maison-crossbody',
    name: 'Maison Crossbody',
    tagline: 'Casual luxury with everyday functionality',
    price: 9500,
    category: 'crossbody',
    categoryLabel: 'Crossbody',
    image: bagMaisonCrossbody,
    galleryImages: [
      bagMaisonCrossbody,
      materialsLeatherMacro,
      bagMiniMuse
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#A45D2E' },
      { name: 'Black Caviar', hex: '#1C1C1D' },
      { name: 'Olive Drab', hex: '#585C4B' }
    ],
    description:
      'The Maison Crossbody pairs minimal utilitarian ergonomics with exquisite atelier finishing. Designed with an easy-glide two-way perimeter zip, a tailored slip exterior compartment, and an extra-wide shoulder strap for all-day comfort.',
    materialsText:
      'Drum-dyed vegetable leather that develops an organic patina over years of use. Solid brass zip teeth and rings.',
    dimensions: '22 cm (W) × 15 cm (H) × 7.5 cm (D) · Strap drop: 45–60 cm',
    features: [
      'Two-way smooth metal zip opening with pull cords',
      'Wide adjustable shoulder strap reducing shoulder pressure',
      'Rear slip pocket with hidden magnetic snap',
      'Internal key tether with brass snap hook'
    ]
  },
  {
    id: 'soft-tote',
    name: 'Soft Tote',
    tagline: 'Effortless slouch with generous interior volume',
    price: 10900,
    category: 'tote',
    categoryLabel: 'Tote Bags',
    image: bagSoftTote,
    galleryImages: [
      bagSoftTote,
      materialsLeatherMacro,
      bagEverydayTote
    ],
    colors: [
      { name: 'Muted Taupe', hex: '#A3998C' },
      { name: 'Warm Camel', hex: '#BC8A5F' },
      { name: 'Charcoal Black', hex: '#262626' }
    ],
    description:
      'Unstructured yet refined, the Soft Tote drapes gracefully against the body. Made from ultra-pliable full-grain leather that molds to your silhouette, it is the ideal companion for travel and relaxed weekends.',
    materialsText:
      'Unlined double-faced buttery calfskin with raw interior suede finish. Brushed nickel hardware.',
    dimensions: '40 cm (W) × 32 cm (H) × 16 cm (D) · Strap drop: 28 cm',
    features: [
      'Ultra-lightweight supple unstructured silhouette',
      'Removable zipped interior leather pouch for valuables',
      'Reinforced strap attachments tested to 15 kg capacity',
      'Concealed bridge magnetic clasp'
    ]
  },
  {
    id: 'signature-top-handle',
    name: 'Signature Top Handle',
    tagline: 'The pinnacle of structured Parisian elegance',
    price: 16500,
    category: 'shoulder',
    categoryLabel: 'Shoulder Bags',
    image: bagSignatureTop,
    galleryImages: [
      bagSignatureTop,
      materialsLeatherMacro,
      bagLunaSignature
    ],
    colors: [
      { name: 'Rich Cognac', hex: '#8F4B1E' },
      { name: 'Pecan Tan', hex: '#A66B38' },
      { name: 'Raven Black', hex: '#18181A' }
    ],
    description:
      'The crown jewel of the AURELIS workshop. Master artisans spend 18 hours hand-shaping and stitching the structured handle and beveled corners. Finished with our signature lock-box clasp and hand-buffed wax edges.',
    materialsText:
      'Grade-A Tuscan vegetable-tanned leather. Hand-stitched with waxed linen thread and fitted with custom-cast brass lock mechanism.',
    dimensions: '28 cm (W) × 21 cm (H) × 11 cm (D) · Handle drop: 10 cm',
    features: [
      'Numbered limited production series plaque inside',
      'Hand-sculpted rigid top handle engineered for ergonomic grip',
      'Key clochette charm and lock in solid brass',
      'Three dedicated interior accordion compartments'
    ],
    editionBadge: 'Atelier Limited'
  },
  {
    id: 'luna-shoulder-bag',
    name: 'Luna Shoulder Bag',
    tagline: 'Sleek crescent silhouette with polished ring accents',
    price: 12900,
    category: 'shoulder',
    categoryLabel: 'Shoulder Bags',
    image: bagLunaShoulder,
    galleryImages: [
      bagLunaShoulder,
      materialsLeatherMacro,
      bagLunaSignature
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#141E28' },
      { name: 'Forest Noir', hex: '#1E2A22' },
      { name: 'Burgundy Wine', hex: '#4A1D24' }
    ],
    description:
      'Inspired by lunar curves, this sculptural shoulder bag tucks comfortably under the arm. Its crescent profile is anchored by heavy brass ring eyelets and a contoured strap that stays securely on the shoulder.',
    materialsText:
      'Semi-matte calfskin with subtle sheen. Fine satin lining with solid forged gold-tone ring grommets.',
    dimensions: '30 cm (W) × 18 cm (H) × 7 cm (D) · Strap drop: 26 cm',
    features: [
      'Curved ergonomic underarm contour',
      'Heavyweight brass ring hardware connectors',
      'Recessed top zipper to protect silhouette lines',
      'Interior phone slot and zippered pocket'
    ]
  }
];

export const HOMEPAGE_COLLECTION_IDS = [
  'the-everyday-tote',
  'luna-signature',
  'noir-classic',
  'mini-muse'
];
