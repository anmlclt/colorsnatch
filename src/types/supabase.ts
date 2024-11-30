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
      leaderboard: {
        Row: {
          id: string
          name: string
          score: number
          level: number
          time: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          score: number
          level: number
          time: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          score?: number
          level?: number
          time?: number
          created_at?: string
        }
      }
    }
  }
}