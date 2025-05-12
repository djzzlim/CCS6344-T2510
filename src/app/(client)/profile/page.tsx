// Updated profile page with real data fetching
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: "", message: "" });
  const [passwordMessage, setPasswordMessage] = useState({ type: "", message: "" });
  
  // User profile state
  const [profileData, setProfileData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    ContactNumber: "",
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    ZipCode: "",
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("/api/user/profile");
        
        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to login if unauthorized
            router.push("/login");
            return;
          }
          throw new Error("Failed to fetch profile data");
        }
        
        const data = await response.json();
        setProfileData({
          FirstName: data.FirstName || "",
          LastName: data.LastName || "",
          Email: data.Email || "",
          ContactNumber: data.ContactNumber || "",
          AddressLine1: data.AddressLine1 || "",
          AddressLine2: data.AddressLine2 || "",
          City: data.City || "",
          State: data.State || "",
          ZipCode: data.ZipCode || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setSaveMessage({
          type: "error",
          message: "Could not load your profile information. Please try again later."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  // Handle input changes for profile
  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Save profile changes
  const handleProfileSave = async () => {
    setIsSaving(true);
    setSaveMessage({ type: "", message: "" });
    
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: profileData.FirstName,
          lastName: profileData.LastName,
          phone: profileData.ContactNumber,
          addressLine1: profileData.AddressLine1,
          addressLine2: profileData.AddressLine2,
          city: profileData.City,
          state: profileData.State,
          zipCode: profileData.ZipCode,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSaveMessage({
        type: "success",
        message: "Your profile has been updated successfully."
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveMessage({
        type: "error",
        message: "Failed to update your profile. Please try again."
      });
    } finally {
      setIsSaving(false);
      
      // Clear success message after 3 seconds
      if (saveMessage.type === "success") {
        setTimeout(() => {
          setSaveMessage({ type: "", message: "" });
        }, 3000);
      }
    }
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    // Validate passwords
    setPasswordMessage({ type: "", message: "" });
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({
        type: "error",
        message: "New passwords do not match. Please try again."
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordMessage({
        type: "error",
        message: "Password must be at least 8 characters long."
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      const response = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordMessage({
        type: "success",
        message: "Your password has been updated successfully."
      });
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordMessage({
        type: "error",
        message: error.message || "Failed to update your password. Please try again."
      });
    } finally {
      setIsChangingPassword(false);
      
      // Clear success message after 3 seconds
      if (passwordMessage.type === "success") {
        setTimeout(() => {
          setPasswordMessage({ type: "", message: "" });
        }, 3000);
      }
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Profile" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600">Loading profile information...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        {/* Header */}
        <Header title="Profile" setIsMenuOpen={setIsMenuOpen} />

        {/* Profile content */}
        <div className="p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
            <p className="text-gray-600">Manage your account information and address details</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Profile Information */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your personal information and account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {saveMessage.message && (
                    <div className={`p-3 rounded ${
                      saveMessage.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {saveMessage.message}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="FirstName">First Name</Label>
                      <Input 
                        id="FirstName" 
                        value={profileData.FirstName} 
                        onChange={handleProfileChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="LastName">Last Name</Label>
                      <Input 
                        id="LastName" 
                        value={profileData.LastName} 
                        onChange={handleProfileChange} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="Email">Email</Label>
                    <Input 
                      id="Email" 
                      type="email" 
                      value={profileData.Email} 
                      disabled 
                    />
                    <p className="text-xs text-gray-500">Email address cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ContactNumber">Phone Number</Label>
                    <Input 
                      id="ContactNumber" 
                      type="tel" 
                      value={profileData.ContactNumber} 
                      onChange={handleProfileChange} 
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Address Information</h3>
                      <p className="text-sm text-gray-500">Your billing and shipping address</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="AddressLine1">Address Line 1</Label>
                      <Input 
                        id="AddressLine1" 
                        value={profileData.AddressLine1} 
                        onChange={handleProfileChange} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="AddressLine2">Address Line 2</Label>
                      <Input 
                        id="AddressLine2" 
                        value={profileData.AddressLine2} 
                        onChange={handleProfileChange} 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="City">City</Label>
                        <Input 
                          id="City" 
                          value={profileData.City} 
                          onChange={handleProfileChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="State">State</Label>
                        <Input 
                          id="State" 
                          value={profileData.State} 
                          onChange={handleProfileChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ZipCode">Zip Code</Label>
                        <Input 
                          id="ZipCode" 
                          value={profileData.ZipCode} 
                          onChange={handleProfileChange} 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 flex justify-end">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleProfileSave}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>

              {/* Change Password Section */}
              <Card className="mt-6">
                <CardHeader className="border-b">
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your account password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {passwordMessage.message && (
                    <div className={`p-3 rounded ${
                      passwordMessage.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {passwordMessage.message}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      placeholder="Enter current password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Re-enter new password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 flex justify-end">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handlePasswordUpdate}
                    disabled={isChangingPassword}
                  >
                    {isChangingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}