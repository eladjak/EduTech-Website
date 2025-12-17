import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabase = await createServerSupabaseClient();

    // Check if email already exists
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email,
          status: "active",
          preferences: {},
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    // TODO: Send welcome email using Resend
    // This can be implemented later

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
