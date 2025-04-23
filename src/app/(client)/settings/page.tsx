"use client";

import { useState } from "react";
import { 
  Bell, 
  ChevronRight, 
  Lock, 
  Moon, 
  PaintBucket, 
  Sun, 
  UserCircle, 
  Wallet 
} from "lucide-react";
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function ProfileSettings() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        {/* Header */}
        <Header setIsMenuOpen={setIsMenuOpen} />

        {/* Profile/Settings content */}
        <div className="p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Profile & Settings</h1>
            <p className="text-gray-600">Manage your account preferences and personal information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-600">SJ</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                  <CardDescription>sarah.j@example.com</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full text-sm">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-2 w-full lg:w-64 mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card>
                    <CardHeader className="border-b">
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Manage your personal information and account details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Sarah" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Johnson" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="sarah.j@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">Address Information</h3>
                          <p className="text-sm text-gray-500">Your billing and shipping address</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address1">Address Line 1</Label>
                          <Input id="address1" defaultValue="123 Main Street" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address2">Address Line 2</Label>
                          <Input id="address2" defaultValue="Apt 4B" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" defaultValue="San Francisco" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Select defaultValue="CA">
                              <SelectTrigger id="state">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="CA">California</SelectItem>
                                  <SelectItem value="NY">New York</SelectItem>
                                  <SelectItem value="TX">Texas</SelectItem>
                                  <SelectItem value="FL">Florida</SelectItem>
                                  <SelectItem value="IL">Illinois</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">Zip Code</Label>
                            <Input id="zip" defaultValue="94103" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50 flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings">
                  <div className="space-y-6">
                    {/* Appearance Settings */}
                    <Card>
                      <CardHeader className="border-b">
                        <div className="flex items-center gap-2">
                          <PaintBucket className="h-5 w-5 text-blue-600" />
                          <CardTitle>Appearance</CardTitle>
                        </div>
                        <CardDescription>
                          Customize how BankApp looks for you
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="theme">Theme</Label>
                            <p className="text-sm text-gray-500">Choose your preferred theme</p>
                          </div>
                          <Select 
                            value={theme} 
                            onValueChange={setTheme}
                          >
                            <SelectTrigger className="w-36">
                              <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">
                                <div className="flex items-center gap-2">
                                  <Sun className="h-4 w-4" />
                                  <span>Light</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="dark">
                                <div className="flex items-center gap-2">
                                  <Moon className="h-4 w-4" />
                                  <span>Dark</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="system">
                                <div className="flex items-center gap-2">
                                  <Wallet className="h-4 w-4" />
                                  <span>System</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Notification Settings */}
                    <Card>
                      <CardHeader className="border-b">
                        <div className="flex items-center gap-2">
                          <Bell className="h-5 w-5 text-blue-600" />
                          <CardTitle>Notifications</CardTitle>
                        </div>
                        <CardDescription>
                          Configure how you receive notifications
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-500">Receive account alerts via email</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-gray-500">Receive notifications on your devices</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Transaction Alerts</Label>
                            <p className="text-sm text-gray-500">Get notified for every transaction</p>
                          </div>
                          <Switch />
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Security Settings */}
                    <Card>
                      <CardHeader className="border-b">
                        <div className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-blue-600" />
                          <CardTitle>Security</CardTitle>
                        </div>
                        <CardDescription>
                          Manage your account security and access
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Two-Factor Authentication</Label>
                            <p className="text-sm text-gray-500">Secure your account with 2FA</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Change Password</Label>
                              <p className="text-sm text-gray-500">Update your account password</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Update
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}