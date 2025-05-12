
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarWithPlaceholder } from "@/components/ui/avatar-with-placeholder";

const Profile = () => {
  return (
    <div className="pos-container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Customer Profile</h1>
        
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center">
              <AvatarWithPlaceholder
                alt="Customer"
                fallback="CN"
                className="h-16 w-16"
              />
              <div className="ml-4">
                <CardTitle>Customer Name</CardTitle>
                <CardDescription>customer@example.com</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                <p className="mt-1">123 Main Street, City, Country</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                <p className="mt-1">+1 (555) 123-4567</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              View your past orders and their status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No order history yet. Start shopping to see your orders here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
