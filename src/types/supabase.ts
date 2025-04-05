export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      providers: {
        Row: {
          id: number
          created_at: string
          user_id: string
          business_name: string
          category: string
          experience: number
          description: string
          phone: string
          address: string
          id_proof: string
          status: 'pending' | 'approved' | 'rejected'
          rating: number | null
          total_bookings: number
          total_earnings: number
        }
        Insert: {
          id?: number
          created_at?: string
          user_id: string
          business_name: string
          category: string
          experience: number
          description: string
          phone: string
          address: string
          id_proof: string
          status?: 'pending' | 'approved' | 'rejected'
          rating?: number | null
          total_bookings?: number
          total_earnings?: number
        }
        Update: {
          id?: number
          created_at?: string
          user_id?: string
          business_name?: string
          category?: string
          experience?: number
          description?: string
          phone?: string
          address?: string
          id_proof?: string
          status?: 'pending' | 'approved' | 'rejected'
          rating?: number | null
          total_bookings?: number
          total_earnings?: number
        }
      }
      provider_services: {
        Row: {
          id: number
          created_at: string
          provider_id: number
          name: string
          category: string
          price: number
          duration: number
          description: string
          is_available: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          provider_id: number
          name: string
          category: string
          price: number
          duration: number
          description: string
          is_available?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          provider_id?: number
          name?: string
          category?: string
          price?: number
          duration?: number
          description?: string
          is_available?: boolean
        }
      }
      bookings: {
        Row: {
          id: number
          created_at: string
          user_id: string
          provider_id: number
          service_id: number
          booking_date: string
          booking_time: string
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_amount: number
          payment_status: 'pending' | 'paid' | 'refunded'
          user_rating: number | null
          user_review: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          user_id: string
          provider_id: number
          service_id: number
          booking_date: string
          booking_time: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_amount: number
          payment_status?: 'pending' | 'paid' | 'refunded'
          user_rating?: number | null
          user_review?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          user_id?: string
          provider_id?: number
          service_id?: number
          booking_date?: string
          booking_time?: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_amount?: number
          payment_status?: 'pending' | 'paid' | 'refunded'
          user_rating?: number | null
          user_review?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
