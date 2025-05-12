
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarWithPlaceholder } from "@/components/ui/avatar-with-placeholder";

const VendorProfile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vendor Profile</h1>
      
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center">
            <AvatarWithPlaceholder
              alt="Store Owner"
              fallback="VO"
              className="h-16 w-16"
            />
            <div className="ml-4">
              <CardTitle>Store Owner</CardTitle>
              <CardDescription>vendor@example.com</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Store Name</h3>
              <p className="mt-1">My Awesome Store</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Store Address</h3>
              <p className="mt-1">456 Business Avenue, City, Country</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
              <p className="mt-1">+1 (555) 987-6543</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Business Summary</CardTitle>
          <CardDescription>
            Key metrics for your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Business statistics will be available in future updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorProfile;
