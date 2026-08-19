export interface VariantStockItem {
  id: string;
  color: string;
  colorHex: string;
  size: string;
  sku: string;
  barcode: string;
  stock: number;
  reserved: number;
  reorderPoint: number;
  b2bPrice: number;
  retailPrice: number;
}

export interface ProductModel {
  id: string;
  name: string;
  code: string;
  category: string;
  season: string;
  fabric: string;
  variants: VariantStockItem[];
}

export interface PackagePlan {
  id: string;
  title: string;
  badge?: string;
  highlight?: boolean;
  description: string;
  features: string[];
  specs: {
    branches: string;
    warehouses: string;
    users: string;
    integrations: string;
  };
  link: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  impactBadge: string;
  avatarUrl?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  date: string;
  slug: string;
}
