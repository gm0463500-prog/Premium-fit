import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, ProductSize, CityZone, CheckoutFormData } from '../types';
import { BRAND_CONFIG } from '../config/brandConfig';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: ProductSize, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateItemSize: (cartItemId: string, newSize: ProductSize) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryCity: string;
  setDeliveryCity: (city: string) => void;
  deliveryZone: CityZone;
  deliveryCharge: number;
  grandTotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  generateWhatsAppOrderUrl: (formData: CheckoutFormData) => { url: string; rawMessage: string };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'premium_fit_cart_v1';
const CITY_STORAGE_KEY = 'premium_fit_city_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // LocalStorage unavailable or parse error
    }
    return [];
  });

  const [deliveryCity, setDeliveryCityState] = useState<string>(() => {
    try {
      const savedCity = localStorage.getItem(CITY_STORAGE_KEY);
      return savedCity || 'Karachi';
    } catch {
      return 'Karachi';
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const setDeliveryCity = (city: string) => {
    setDeliveryCityState(city);
    try {
      localStorage.setItem(CITY_STORAGE_KEY, city);
    } catch {
      // ignore
    }
  };

  const deliveryZone: CityZone =
    deliveryCity.trim().toLowerCase() === 'karachi' ? 'karachi' : 'other';

  const deliveryCharge =
    items.length > 0
      ? deliveryZone === 'karachi'
        ? BRAND_CONFIG.deliveryCharges.karachi
        : BRAND_CONFIG.deliveryCharges.other
      : 0;

  const addToCart = (product: Product, size: ProductSize, quantity: number = 1) => {
    setItems((prevItems) => {
      const cartItemId = `${product.id}-${size}`;
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [...prevItems, { cartItemId, product, size, quantity }];
      }
    });

    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const updateItemSize = (cartItemId: string, newSize: ProductSize) => {
    setItems((prev) => {
      const targetItem = prev.find((item) => item.cartItemId === cartItemId);
      if (!targetItem) return prev;

      const newCartItemId = `${targetItem.product.id}-${newSize}`;
      const duplicateItem = prev.find(
        (item) => item.cartItemId === newCartItemId && item.cartItemId !== cartItemId
      );

      if (duplicateItem) {
        return prev
          .filter((item) => item.cartItemId !== cartItemId)
          .map((item) =>
            item.cartItemId === newCartItemId
              ? { ...item, quantity: item.quantity + targetItem.quantity }
              : item
          );
      } else {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, cartItemId: newCartItemId, size: newSize }
            : item
        );
      }
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const grandTotal = subtotal + deliveryCharge;

  const generateWhatsAppOrderUrl = (formData: CheckoutFormData) => {
    const isKarachi = formData.city.trim().toLowerCase() === 'karachi';
    const activeDeliveryCharge = isKarachi
      ? BRAND_CONFIG.deliveryCharges.karachi
      : BRAND_CONFIG.deliveryCharges.other;
    const finalGrandTotal = subtotal + activeDeliveryCharge;

    const paymentLabel =
      formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Advance Payment';

    // Format products list
    const productLines = items
      .map((item) => {
        const lineTotal = item.product.price * item.quantity;
        return [
          `Product: ${item.product.name}`,
          `Size: ${item.size}`,
          `Quantity: ${item.quantity}`,
          `Unit Price: Rs. ${item.product.price.toLocaleString()}`,
          `Line Total: Rs. ${lineTotal.toLocaleString()}`,
        ].join('\n');
      })
      .join('\n\n');

    const messageLines = [
      'PREMIUM FIT — NEW ORDER',
      '',
      productLines,
      '',
      `Customer Name: ${formData.fullName.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `City: ${formData.city.trim()}`,
      `Address: ${formData.address.trim()}`,
      '',
      `Payment: ${paymentLabel}`,
    ];

    if (formData.orderNotes && formData.orderNotes.trim()) {
      messageLines.push(`Order Notes: ${formData.orderNotes.trim()}`);
    }

    messageLines.push(
      '',
      `Subtotal: Rs. ${subtotal.toLocaleString()}`,
      `Delivery: Rs. ${activeDeliveryCharge.toLocaleString()}`,
      `Grand Total: Rs. ${finalGrandTotal.toLocaleString()}`,
      '',
      'Please confirm the availability and details of this order.'
    );

    const rawMessage = messageLines.join('\n');
    const encodedMessage = encodeURIComponent(rawMessage);
    const url = `https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodedMessage}`;

    return { url, rawMessage };
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemSize,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryCity,
        setDeliveryCity,
        deliveryZone,
        deliveryCharge,
        grandTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
