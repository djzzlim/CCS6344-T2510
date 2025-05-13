"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Save, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: "", message: "" });
  const [passwordMessage, setPasswordMessage] = useState({ type: "", message: "" });
  const [error, setError] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
    passwordsMatch: false
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include" // Important to include cookies with the request
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to login if unauthorized
            console.log("Unauthorized access - redirecting to login");
            router.push("/login");
            return;
          }
          
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch profile data");
        }
        
        const data = await response.json();
        console.log("Profile data fetched:", data);
        
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
        setError(error.message || "Could not load your profile information");
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

  // Validate password requirements
  useEffect(() => {
    const { newPassword, confirmPassword } = passwordData;
    
    setPasswordValidation({
      length: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      passwordsMatch: newPassword === confirmPassword && newPassword !== ""
    });
  }, [passwordData.newPassword, passwordData.confirmPassword]);

  // Check if password meets all requirements
  const passwordMeetsRequirements = () => {
    return Object.values(passwordValidation).every(Boolean);
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
        credentials: "include", // Include cookies
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const updatedData = await response.json();
      console.log("Profile updated successfully:", updatedData);

      // Update local state with server response data
      setProfileData({
        FirstName: updatedData.FirstName || profileData.FirstName,
        LastName: updatedData.LastName || profileData.LastName,
        Email: updatedData.Email || profileData.Email,
        ContactNumber: updatedData.ContactNumber || profileData.ContactNumber,
        AddressLine1: updatedData.AddressLine1 || profileData.AddressLine1,
        AddressLine2: updatedData.AddressLine2 || profileData.AddressLine2,
        City: updatedData.City || profileData.City,
        State: updatedData.State || profileData.State,
        ZipCode: updatedData.ZipCode || profileData.ZipCode,
      });

      setSaveMessage({
        type: "success",
        message: "Your profile has been updated successfully."
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveMessage({
        type: "error",
        message: error.message || "Failed to update your profile. Please try again."
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
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: "", message: "" });
    
    // Validate password before submission
    if (!passwordMeetsRequirements()) {
      setPasswordMessage({
        type: "error",
        message: "Please ensure your password meets all requirements."
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
        credentials: "include", // Include cookies
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

  // Error state
  if (error && !isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Profile" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6">
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
              <h2 className="text-xl font-semibold text-red-700 mb-2">Unable to load profile</h2>
              <p className="text-red-600">{error}</p>
              <Button 
                className="mt-4 bg-red-600 hover:bg-red-700"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Profile" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
              <p className="text-gray-600 mt-2">Loading profile information...</p>
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
              <Card className="shadow-sm">
                <CardHeader className="border-b bg-gray-50">
                  <CardTitle className="text-xl">Profile Information</CardTitle>
                  <CardDescription>
                    Manage your personal information and account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {saveMessage.message && (
                    <Alert className={`${
                      saveMessage.type === "error" ? "border-red-500 bg-red-50 text-red-700" : "border-green-500 bg-green-50 text-green-700"
                    }`}>
                      <AlertDescription>
                        {saveMessage.message}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="FirstName">First Name</Label>
                      <Input 
                        id="FirstName" 
                        value={profileData.FirstName} 
                        onChange={handleProfileChange} 
                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="LastName">Last Name</Label>
                      <Input 
                        id="LastName" 
                        value={profileData.LastName} 
                        onChange={handleProfileChange}
                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
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
                      className="bg-gray-100 cursor-not-allowed"
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
                      className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>

                  <Separator className="my-2" />

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
                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="AddressLine2">Address Line 2</Label>
                      <Input 
                        id="AddressLine2" 
                        value={profileData.AddressLine2} 
                        onChange={handleProfileChange}
                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="City">City</Label>
                        <Input 
                          id="City" 
                          value={profileData.City} 
                          onChange={handleProfileChange}
                          className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="State">State</Label>
                        <Input 
                          id="State" 
                          value={profileData.State} 
                          onChange={handleProfileChange}
                          className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ZipCode">Zip Code</Label>
                        <Input 
                          id="ZipCode" 
                          value={profileData.ZipCode} 
                          onChange={handleProfileChange}
                          className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 flex justify-end p-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    onClick={handleProfileSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {/* Change Password Section */}
              <Card className="mt-6 shadow-sm">
                <CardHeader className="border-b bg-gray-50">
                  <CardTitle className="text-xl">Change Password</CardTitle>
                  <CardDescription>
                    Update your account password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {passwordMessage.message && (
                    <Alert className={`${
                      passwordMessage.type === "error" ? "border-red-500 bg-red-50 text-red-700" : "border-green-500 bg-green-50 text-green-700"
                    }`}>
                      <AlertDescription>
                        {passwordMessage.message}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input 
                          id="currentPassword" 
                          type={showCurrentPassword ? "text" : "password"} 
                          placeholder="Enter current password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                          required
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input 
                          id="newPassword" 
                          type={showNewPassword ? "text" : "password"} 
                          placeholder="Enter new password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className={`focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${
                            passwordData.newPassword && !passwordValidation.length ? "border-red-500" : ""
                          }`}
                          required
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input 
                          id="confirmPassword" 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Re-enter new password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className={`focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${
                            passwordData.confirmPassword && !passwordValidation.passwordsMatch ? "border-red-500" : ""
                          }`}
                          required
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    {/* Password requirements */}
                    {passwordData.newPassword && (
                      <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                        <h4 className="text-sm font-medium mb-2">Password Requirements:</h4>
                        <ul className="space-y-1 text-sm">
                          <li className={`flex items-center gap-2 ${passwordValidation.length ? "text-green-600" : "text-gray-600"}`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${passwordValidation.length ? "bg-green-600" : "bg-gray-400"}`}></span>
                            At least 8 characters long
                          </li>
                          <li className={`flex items-center gap-2 ${passwordValidation.hasUpperCase ? "text-green-600" : "text-gray-600"}`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${passwordValidation.hasUpperCase ? "bg-green-600" : "bg-gray-400"}`}></span>
                            Contains at least one uppercase letter
                          </li>
                          <li className={`flex items-center gap-2 ${passwordValidation.hasLowerCase ? "text-green-600" : "text-gray-600"}`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${passwordValidation.hasLowerCase ? "bg-green-600" : "bg-gray-400"}`}></span>
                            Contains at least one lowercase letter
                          </li>
                          <li className={`flex items-center gap-2 ${passwordValidation.hasNumber ? "text-green-600" : "text-gray-600"}`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${passwordValidation.hasNumber ? "bg-green-600" : "bg-gray-400"}`}></span>
                            Contains at least one number
                          </li>
                          <li className={`flex items-center gap-2 ${passwordValidation.hasSpecial ? "text-green-600" : "text-gray-600"}`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${passwordValidation.hasSpecial ? "bg-green-600" : "bg-gray-400"}`}></span>
                            Contains at least one special character
                          </li>
                          <li className={`flex items-center gap-2 ${
                            passwordData.confirmPassword ? 
                              passwordValidation.passwordsMatch ? "text-green-600" : "text-red-600" 
                              : "text-gray-600"
                          }`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${
                              passwordData.confirmPassword ? 
                                passwordValidation.passwordsMatch ? "bg-green-600" : "bg-red-600" 
                                : "bg-gray-400"
                            }`}></span>
                            Passwords match
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    <CardFooter className="border-t bg-gray-50 flex justify-end p-4 -mx-6 -mb-6">
                      <Button 
                        type="submit"
                        className={`${passwordMeetsRequirements() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"} text-white flex items-center gap-2`}
                        disabled={isChangingPassword || !passwordMeetsRequirements()}
                      >
                        {isChangingPassword ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Updating...</span>
                          </>
                        ) : (
                          <span>Update Password</span>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar/help content */}
            <div className="lg:col-span-1">
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg">Profile Tips</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium">Keep Your Info Updated</h4>
                      <p className="text-gray-600">Ensure your contact information is current to receive important updates.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Password Security</h4>
                      <p className="text-gray-600">Change your password regularly and don't reuse passwords from other sites.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Complete Your Address</h4>
                      <p className="text-gray-600">Having a complete and accurate address helps with faster shipping and billing.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}