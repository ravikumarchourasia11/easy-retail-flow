
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define types for our data
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface PosState {
  products: Product[];
  cart: CartItem[];
}

type PosAction =
  | { type: 'ADD_PRODUCT'; product: Product }
  | { type: 'UPDATE_PRODUCT'; product: Product }
  | { type: 'DELETE_PRODUCT'; productId: string }
  | { type: 'ADD_TO_CART'; product: Product; quantity: number }
  | { type: 'UPDATE_CART_ITEM'; productId: string; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'CLEAR_CART' };

interface PosContextType {
  state: PosState;
  dispatch: React.Dispatch<PosAction>;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addToCart: (product: Product, quantity: number) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone',
    price: 599.99,
    description: 'Latest model with high-resolution camera and long-lasting battery.',
    image: '/placeholder.svg',
    stock: 25,
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Laptop',
    price: 1299.99,
    description: 'Powerful laptop with fast processor and ample storage.',
    image: '/placeholder.svg',
    stock: 15,
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Headphones',
    price: 149.99,
    description: 'Noise-cancelling headphones with premium sound quality.',
    image: '/placeholder.svg',
    stock: 30,
    category: 'Audio',
  },
  {
    id: '4',
    name: 'Coffee Maker',
    price: 79.99,
    description: 'Programmable coffee maker with thermal carafe.',
    image: '/placeholder.svg',
    stock: 20,
    category: 'Appliances',
  },
  {
    id: '5',
    name: 'Fitness Tracker',
    price: 89.99,
    description: 'Water-resistant fitness tracker with heart rate monitor.',
    image: '/placeholder.svg',
    stock: 40,
    category: 'Fitness',
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 59.99,
    description: 'Portable speaker with impressive sound and long battery life.',
    image: '/placeholder.svg',
    stock: 35,
    category: 'Audio',
  }
];

// Initial state
const initialState: PosState = {
  products: sampleProducts,
  cart: [],
};

// Create context
const PosContext = createContext<PosContextType | undefined>(undefined);

// Reducer function
function posReducer(state: PosState, action: PosAction): PosState {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.product],
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.product.id ? action.product : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.productId),
      };
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cart.findIndex(
        item => item.product.id === action.product.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.quantity;
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { product: action.product, quantity: action.quantity }],
        };
      }
    }
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.productId),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

// Provider component
export const PosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state from localStorage
  const savedState = localStorage.getItem('posState');
  const [state, dispatch] = useReducer(
    posReducer,
    savedState ? JSON.parse(savedState) : initialState
  );

  // Save state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('posState', JSON.stringify(state));
  }, [state]);

  // Helper functions
  const addProduct = (product: Product) => {
    dispatch({ type: 'ADD_PRODUCT', product });
  };

  const updateProduct = (product: Product) => {
    dispatch({ type: 'UPDATE_PRODUCT', product });
  };

  const deleteProduct = (productId: string) => {
    dispatch({ type: 'DELETE_PRODUCT', productId });
  };

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
  };

  const updateCartItem = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_ITEM', productId, quantity });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const value = {
    state,
    dispatch,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
  };

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
};

// Custom hook to use the context
export const usePos = () => {
  const context = useContext(PosContext);
  
  if (context === undefined) {
    throw new Error('usePos must be used within a PosProvider');
  }
  
  return context;
};
