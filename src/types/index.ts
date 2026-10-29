export type ProductSize = 'S' | 'M' | 'L' | 'XL';

export interface Product {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  price: number; // In PKR, e.g. 1000
  originalPrice?: number; // e.g. 1500 for display strike-through if needed
  image: string;
  description: string;
  shortDescription: string;
  features: string[];
  fabric: string;
  fit: string;
  inStock: boolean;
  availableSizes: ProductSize[];
}

export interface CartItem {
  cartItemId: string; // unique id combining productId + size
  product: Product;
  size: ProductSize;
  quantity: number;
}

export type CityZone = 'karachi' | 'other';

export interface CityOption {
  id: string;
  name: string;
  zone: CityZone;
}

export type PaymentMethod = 'cod' | 'advance';

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: PaymentMethod;
  orderNotes: string;
}

export type PageId =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'about'
  | 'contact'
  | 'faqs'
  | 'shipping-policy'
  | 'return-policy'
  | 'privacy-policy';
