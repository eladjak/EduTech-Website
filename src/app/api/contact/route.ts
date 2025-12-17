import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          phone,
          subject,
          message,
          status: "new",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      );
    }

    // TODO: Send email notification using Resend
    // This can be implemented later

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
