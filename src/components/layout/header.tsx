
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, User } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  const isVendorRoute = location.pathname.startsWith("/vendor");
  const isCustomerRoute = !isVendorRoute;
  
  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="pos-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-pos-purple" />
            <span className="font-bold text-xl">POS System</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isVendorRoute ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/customer">Switch to Customer View</Link>
                </Button>
                <Button variant="ghost" className="relative" asChild>
                  <Link to="/vendor/profile">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/vendor">Switch to Vendor View</Link>
                </Button>
                <Button variant="ghost" className="relative" asChild>
                  <Link to="/customer/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" className="relative" asChild>
                  <Link to="/customer/profile">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
