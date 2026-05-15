export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: "chiya" | "coffee" | "snacks";
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  alt_text?: string | null;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at?: string;
}
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  is_approved: boolean;
  created_at: string;
}
