
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

const CustomerLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-pos-gray-light">
        <Outlet />
      </main>
      <footer className="py-6 bg-white border-t">
        <div className="pos-container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} POS System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;
