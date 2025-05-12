"use client";
import { useState } from "react";
import { 
  Lock, 
  ChevronRight, 
} from "lucide-react";
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Placeholder - replace with your actual user ID retrieval method
const getCurrentUserId = () => {
  // This is a placeholder. In a real app, you'd get this from:
  // - A global state management solution
  // - Authentication context
  // - Session storage
  // - Etc.
  return localStorage.getItem('userId') || '';
};

export default function SettingsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Password change state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Basic client-side validation
  if (newPassword !== confirmNewPassword) {
    alert("New passwords do not match");
    return;
  }

  try {
    setIsChangingPassword(true);

    // Call API to change password
    const response = await fetch('/api/change-password', {
      method: 'POST',
      credentials: 'include', // Important: include cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Password changed successfully");
      // Reset form and close dialog
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setIsDialogOpen(false);

      // Optional: Handle potential redirect
      if (result.redirectTo) {
        window.location.href = result.redirectTo;
      }
    } else {
      // Handle error from server
      alert(result.message || "Failed to change password");

      // Handle potential redirect for authentication issues
      if (result.redirectTo) {
        window.location.href = result.redirectTo;
      }
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
    console.error(error);
  } finally {
    setIsChangingPassword(false);
  }
};
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* Main content */}
      <main className="flex-1 md:ml-64">
        {/* Header */}
        <Header title="Settings" setIsMenuOpen={setIsMenuOpen} />
        {/* Settings content */}
        <div className="p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600">Customize your application preferences and security options</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">                         
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Change Password</Label>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </div>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Update
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handlePasswordChange} className="space-y-4">
                            {/* Current Password */}
                            <div className="space-y-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input 
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                required
                              />
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input 
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                                minLength={8}
                              />
                              <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                            </div>

                            {/* Confirm New Password */}
                            <div className="space-y-2">
                              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                              <Input 
                                id="confirm-new-password"
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                placeholder="Confirm new password"
                                required
                                minLength={8}
                              />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                              <Button 
                                type="submit" 
                                className="w-full"
                                disabled={isChangingPassword}
                              >
                                {isChangingPassword ? "Changing Password..." : "Change Password"}
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
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