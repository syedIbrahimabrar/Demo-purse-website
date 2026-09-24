export type ProductCategory = 'tote' | 'shoulder' | 'crossbody' | 'mini';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  tagline?: string;
  price: number;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  galleryImages: string[];
  colors: ProductColor[];
  description: string;
  materialsText: string;
  dimensions: string;
  features: string[];
  isFeatured?: boolean;
  editionBadge?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}
