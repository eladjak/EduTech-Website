"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project-url.supabase.co";
const supabaseKey = "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: string;
  subtype: string;
  duration: string;
  target_audience: string[];
  price: number;
  image_url: string;
  created_at: string;
}

export async function getActivities(): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching activities:", error);
    return [];
  }

  return data ?? [];
}

export async function getActivityById(id: string): Promise<Activity | null> {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching activity:", error);
    return null;
  }

  return data;
}
