import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProviderForm {
  business_name: string;
  category: string;
  description: string;
  experience: number;
  location: string;
  languages: string[];
  profile_picture: File | null;
  p_number: string;
  certifications: {
    title: string;
    institution: string;
    year: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

const categories = [
  'Electrician',
  'Plumber',
  'Carpenter',
  'Painter',
  'Mehendi Artist',
  'Photographer',
  'Makeup Artist',
  'Tutor',
  'Cook',
  'Cleaner',
  'Gardener',
  'Driver'
];

const uploadToCloudinary = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'skilled-connect'); // Using our specific preset
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    if (data.error) {
      console.error('Cloudinary Error:', data.error);
      throw new Error(data.error.message);
    }

    return data.secure_url;
  } catch (error: any) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
};

const BecomeProvider = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProviderForm>({
    business_name: '',
    category: '',
    description: '',
    experience: 0,
    location: '',
    languages: [],
    profile_picture: null,
    p_number: '',
    certifications: [],
    faq: [
      {
        question: 'Do you travel to the client\'s location?',
        answer: ''
      },
      {
        question: 'What are your working hours?',
        answer: ''
      },
      {
        question: 'Do you offer any guarantees or warranties?',
        answer: ''
      }
    ]
  });
  const [newLanguage, setNewLanguage] = useState('');

  const handleProfilePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "Error",
          description: "Profile picture must be less than 5MB"
        });
        return;
      }
      setFormData({ ...formData, profile_picture: file });
    }
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        { title: '', institution: '', year: '' }
      ]
    });
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value
    };
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index)
    });
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    const updatedFAQ = [...formData.faq];
    updatedFAQ[index] = {
      ...updatedFAQ[index],
      [field]: value
    };
    setFormData({ ...formData, faq: updatedFAQ });
  };

  const addLanguage = () => {
    if (newLanguage && !formData.languages.includes(newLanguage)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage]
      });
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(l => l !== language)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!user) throw new Error('Not authenticated');

      let profile_picture_url = null;

      // Upload profile picture to Cloudinary if provided
      if (formData.profile_picture) {
        profile_picture_url = await uploadToCloudinary(formData.profile_picture);
      }

      // Check if user already has a provider profile
      const { data: existingProvider } = await supabase
        .from('providers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existingProvider) {
        throw new Error('You already have a provider profile');
      }

      // Prepare the certifications and FAQ data
      const certifications = formData.certifications.map(cert => ({
        title: cert.title || '',
        institution: cert.institution || '',
        year: cert.year || ''
      }));

      const faq = formData.faq.map(item => ({
        question: item.question || '',
        answer: item.answer || ''
      }));

      // Insert provider data
      const { error: providerError } = await supabase
        .from('providers')
        .insert([{
          user_id: user.id,
          business_name: formData.business_name,
          category: formData.category,
          description: formData.description,
          experience: formData.experience,
          location: formData.location,
          languages: formData.languages,
          profile_picture: profile_picture_url,
          p_number: formData.p_number,
          certifications: certifications,
          faq: faq,
          status: 'pending'
        }]);

      if (providerError) {
        console.error('Provider Error:', providerError);
        throw providerError;
      }

      toast({
        title: "Application Submitted",
        description: "Your provider application has been submitted for review."
      });

      navigate('/');
    } catch (error: any) {
      console.error('Submission Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to submit application'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Become a Service Provider</h1>
        <p className="text-muted-foreground">
          Fill in your details to start offering your services on our platform
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Provide your basic business information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="business_name">Business Name</Label>
                <Input
                  id="business_name"
                  value={formData.business_name}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about your services and experience..."
                  required
                  className="h-32"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, State"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="p_number">Phone Number</Label>
                <Input
                  id="p_number"
                  type="tel"
                  value={formData.p_number}
                  onChange={(e) => setFormData({ ...formData, p_number: e.target.value })}
                  placeholder="+1 (123) 456-7890"
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  This number will be visible to users who want to contact you
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Upload a professional photo of yourself
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="file"
              accept="image/*"
              onChange={handleProfilePicture}
              required
            />
            <p className="text-sm text-muted-foreground mt-2">
              Maximum file size: 5MB. Recommended size: 400x400 pixels
            </p>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>
              Add languages you can communicate in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add a language..."
              />
              <Button type="button" onClick={addLanguage}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((language) => (
                <Badge key={language} variant="secondary" className="px-3 py-1">
                  {language}
                  <button
                    type="button"
                    onClick={() => removeLanguage(language)}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications & Awards</CardTitle>
            <CardDescription>
              Add your professional certifications and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="grid gap-4 p-4 border rounded-lg relative">
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="absolute right-2 top-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={cert.title}
                      onChange={(e) => updateCertification(index, 'title', e.target.value)}
                      placeholder="e.g., Master Electrician Certification"
                    />
                  </div>
                  <div>
                    <Label>Institution</Label>
                    <Input
                      value={cert.institution}
                      onChange={(e) => updateCertification(index, 'institution', e.target.value)}
                      placeholder="e.g., National Institute of Technology"
                    />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input
                      value={cert.year}
                      onChange={(e) => updateCertification(index, 'year', e.target.value)}
                      placeholder="e.g., 2020"
                    />
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addCertification}>
                Add Certification
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Answer common questions about your services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.faq.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <Label>{faq.question}</Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                    placeholder="Your answer..."
                    required
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BecomeProvider;
