
import React from "react";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Header from "./header";
import { Package, ShoppingCart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const VendorLayout: React.FC = () => {
  const { pathname } = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/vendor", icon: Package },
    { name: "Products", href: "/vendor/products", icon: ShoppingCart },
    { name: "Settings", href: "/vendor/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r hidden md:block">
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to={item.href} className="flex items-center">
                        <item.icon className="w-5 h-5 mr-2" />
                        {item.name}
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
        <main className="flex-1 p-6 bg-pos-gray-light">
          <Outlet />
        </main>
      </div>
      <footer className="py-6 bg-white border-t">
        <div className="pos-container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} POS System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default VendorLayout;
