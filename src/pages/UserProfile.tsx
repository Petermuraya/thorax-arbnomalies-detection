
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

const UserProfile = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !user) return avatarUrl;
    
    try {
      setUploading(true);
      
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, avatarFile);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Error uploading avatar');
      return avatarUrl;
    } finally {
      setUploading(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      
      let finalAvatarUrl = avatarUrl;
      if (avatarFile) {
        finalAvatarUrl = await uploadAvatar();
      }
      
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: fullName,
          avatar_url: finalAvatarUrl
        }
      });
      
      if (error) throw error;
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-400">
              Profile Settings
            </h1>
            <p className="text-blue-500 mt-2">Manage your personal information</p>
          </div>
          
          <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500"></div>
            
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold text-blue-800">Personal Information</CardTitle>
              <CardDescription className="text-blue-500">
                Update your profile details and avatar
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8 p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg group-hover:opacity-90 transition-opacity">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-sky-400 to-blue-500 text-white text-3xl">
                        {fullName ? fullName.charAt(0) : <User size={40} />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Label htmlFor="avatar" className="cursor-pointer p-2 bg-pink-100/80 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </Label>
                    </div>
                  </div>
                  
                  <Input 
                    id="avatar" 
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <Label htmlFor="avatar" className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Change profile photo
                  </Label>
                </div>
                
                <div className="flex-1 w-full space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-700">Email Address</Label>
                    <Input
                      id="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-blue-50 border-blue-100 text-blue-900"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-blue-700">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="border-blue-100 focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-blue-700">Role</Label>
                    <Input
                      id="role"
                      value={user?.user_metadata?.role || "patient"}
                      disabled
                      className="bg-blue-50 border-blue-100 text-blue-900"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <div className="px-8 pb-8 flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={updateProfile} 
                disabled={saving || uploading}
                className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all"
              >
                {saving || uploading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
