
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PosProvider } from "./contexts/pos-context";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Layout Components
import VendorLayout from "./components/layout/vendor-layout";
import CustomerLayout from "./components/layout/customer-layout";

// Vendor Routes
import VendorDashboard from "./pages/vendor/VendorDashboard";
import ProductsList from "./pages/vendor/ProductsList";
import CreateProduct from "./pages/vendor/CreateProduct";
import EditProduct from "./pages/vendor/EditProduct";
import Settings from "./pages/vendor/Settings";
import VendorProfile from "./pages/vendor/Profile";

// Customer Routes
import CustomerStore from "./pages/customer/CustomerStore";
import Cart from "./pages/customer/Cart";
import Profile from "./pages/customer/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PosProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main landing page */}
            <Route path="/" element={<Index />} />
            
            {/* Vendor Routes */}
            <Route path="/vendor" element={<VendorLayout />}>
              <Route index element={<VendorDashboard />} />
              <Route path="products" element={<ProductsList />} />
              <Route path="products/create" element={<CreateProduct />} />
              <Route path="products/:productId" element={<EditProduct />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<VendorProfile />} />
            </Route>
            
            {/* Customer Routes */}
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<CustomerStore />} />
              <Route path="cart" element={<Cart />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PosProvider>
  </QueryClientProvider>
);

export default App;
