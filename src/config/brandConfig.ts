import { Product, CityOption } from '../types';
import blackTrouserImage from ‘../assets/images/product_black_baggy_trouser_1793270969700.jpg’;
import greyTrouserImage from ‘../assets/images/product_grey_baggy_trouser_1793270970114.jpg’;
import navyTrouserImage from ‘../assets/images/product_navy_baggy_trouser_1793270971047.jpg’;
import heroStreetwearImage from ‘../assets/images/hero_streetwear_baggy_1793270968674.jpg’;
import fabricCraftImage from ‘../assets/images/about_fabric_craft_1793270970989.jpg’;

export const BRAND_CONFIG = {
  name: 'Premium Fit',
  tagline: 'Upgrade Your Everyday Style',
  subheadline: 'Discover comfortable and stylish baggy trousers designed for your everyday look.',
  phoneDisplay: '0323 2120211',
  phoneRaw: '03232120211',
  whatsappInternational: '923232120211',
  email: 'support@premiumfit.pk',
  location: 'Karachi, Sindh, Pakistan',
  currency: 'PKR',
  currencySymbol: 'Rs.',
  defaultTrouserPrice: 1000,
  deliveryCharges: {
    karachi: 150,
    other: 250,
  },
  // Allows the user or store owner to specify an uploaded logo URL if desired
  customLogoUrl: '', // if empty, renders our clean brand typography wordmark
};

export const PRODUCTS: Product[] = [
  {
    id: 'premium-black-baggy-trouser',
    name: 'Premium Black Baggy Trouser',
    colorName: 'Jet Black',
    colorHex: '#18181b',
    price: 1000,
    originalPrice: 1400,
    image: blackTrouserImage,
    shortDescription: 'Signature deep jet-black relaxed baggy trouser with elasticated waist and tailored streetwear drape.',
    description:
      'Engineered for maximum all-day comfort and modern street silhouette. Made with heavy-duty breathable combed cotton twill that maintains a crisp relaxed drop without losing its shape. Features an adjustable high-density inner drawcord, deep side pockets that securely fit modern smartphones, and a reinforced gusset for everyday ease.',
    features: [
      'Heavyweight 280 GSM breathable combed cotton twill',
      'Relaxed baggy street cut with tapered ankle cuff drape',
      'Elastic waistband with heavy-duty dipped drawstrings',
      'Two extra-deep side pockets plus one secure back welt pocket',
      'Pre-shrunk fabric to prevent post-wash shrinkage',
      'Ideal for Pakistani summer and mild winter weather',
    ],
    fabric: '100% Premium Combed Cotton Twill (Pre-shrunk)',
    fit: 'Relaxed Baggy Streetwear Fit',
    inStock: true,
    availableSizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'classic-grey-baggy-trouser',
    name: 'Classic Grey Baggy Trouser',
    colorName: 'Heather Grey',
    colorHex: '#9ca3af',
    price: 1000,
    originalPrice: 1400,
    image: greyTrouserImage,
    shortDescription: 'Timeless heather grey relaxed trouser crafted with ultra-soft textured cotton blend for effortless casual styling.',
    description:
      'The quintessential everyday neutral trouser. The Classic Grey Baggy Trouser blends versatile streetwear aesthetics with loungewear comfort. Perfect to pair with oversized tees, hoodies, or clean white sneakers. Designed with deep utilitarian slant pockets, flexible waist comfort, and an authentic wide-leg drape.',
    features: [
      'Ultra-soft textured brushed cotton blend (270 GSM)',
      'Subtle heathered finish that resists dust and daily wear',
      'Deep ergonomic front slash pockets with reinforced bar-tacks',
      'Comfort-stretch waistband with tonal exterior drawcord',
      'Wide-leg silhouette with structured drape',
      'Gentle machine wash safe, zero color fade guarantee',
    ],
    fabric: '90% Cotton, 10% Polyester Brushed Terry',
    fit: 'Relaxed Wide-Leg Casual Fit',
    inStock: true,
    availableSizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'everyday-navy-baggy-trouser',
    name: 'Everyday Navy Baggy Trouser',
    colorName: 'Deep Navy',
    colorHex: '#1e3a8a',
    price: 1000,
    originalPrice: 1400,
    image: navyTrouserImage,
    shortDescription: 'Rich midnight navy blue baggy trouser engineered with durable weave and relaxed streetwear styling.',
    description:
      'A refined statement piece in rich midnight navy. Designed to transition seamlessly from college to weekend hangouts. The heavyweight cotton weave holds its wide relaxed shape while letting your skin breathe in warm climates. Finished with tailored inner seams and custom metallic drawcord eyelets.',
    features: [
      'Rich indigo dye that stays vibrant wash after wash',
      'Premium combed cotton twill with natural stretch',
      'Dual deep side pockets and rear secure pocket',
      'Relaxed thigh and knee room with a clean hem break',
      'Moisture-wicking, breathable structure for Pakistani weather',
      'Pre-washed for instant softness on first wear',
    ],
    fabric: '100% High-Grade Combed Cotton',
    fit: 'Relaxed Baggy Fit',
    inStock: true,
    availableSizes: ['S', 'M', 'L', 'XL'],
  },
];

export const POPULAR_PAKISTAN_CITIES: CityOption[] = [
  { id: 'karachi', name: 'Karachi', zone: 'karachi' },
  { id: 'lahore', name: 'Lahore', zone: 'other' },
  { id: 'islamabad', name: 'Islamabad', zone: 'other' },
  { id: 'rawalpindi', name: 'Rawalpindi', zone: 'other' },
  { id: 'faisalabad', name: 'Faisalabad', zone: 'other' },
  { id: 'multan', name: 'Multan', zone: 'other' },
  { id: 'peshawar', name: 'Peshawar', zone: 'other' },
  { id: 'quetta', name: 'Quetta', zone: 'other' },
  { id: 'sialkot', name: 'Sialkot', zone: 'other' },
  { id: 'hyderabad', name: 'Hyderabad', zone: 'other' },
  { id: 'gujranwala', name: 'Gujranwala', zone: 'other' },
  { id: 'bahawalpur', name: 'Bahawalpur', zone: 'other' },
  { id: 'sukkur', name: 'Sukkur', zone: 'other' },
  { id: 'abbottabad', name: 'Abbottabad', zone: 'other' },
  { id: 'other-city', name: 'Other City in Pakistan', zone: 'other' },
];

export const SIZE_CHART = [
  {
    size: 'S',
    label: 'Small',
    waist: '28" – 30"',
    length: '38"',
    hip: '42"',
    thigh: '25"',
    height: "5'4\" – 5'7\"",
  },
  {
    size: 'M',
    label: 'Medium',
    waist: '31" – 33"',
    length: '39.5"',
    hip: '44"',
    thigh: '26.5"',
    height: "5'7\" – 5'10\"",
  },
  {
    size: 'L',
    label: 'Large',
    waist: '34" – 36"',
    length: '41"',
    hip: '47"',
    thigh: '28"',
    height: "5'10\" – 6'1\"",
  },
  {
    size: 'XL',
    label: 'Extra Large',
    waist: '37" – 40"',
    length: '42.5"',
    hip: '50"',
    thigh: '29.5"',
    height: "6'1\"+",
  },
];

export const HERO_ASSET = heroStreetwearImage;
export const CRAFT_ASSET = fabricCraftImage;

