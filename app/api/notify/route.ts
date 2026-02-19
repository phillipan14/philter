import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { profileName, changes, recipientEmail } = await request.json();

    if (!recipientEmail || !profileName || !changes?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY not configured" },
        { status: 500 }
      );
    }

    const changeLines = changes
      .map(
        (c: { field: string; oldValue: string; newValue: string }) =>
          `• ${c.field}: "${c.oldValue}" → "${c.newValue}"`
      )
      .join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "PhilTer <notifications@skylarq.com>",
        to: recipientEmail,
        subject: `PhilTer: ${profileName} updated their LinkedIn`,
        text: `${profileName} made changes to their LinkedIn profile:\n\n${changeLines}\n\n— PhilTer (for market research purposes)`,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Resend API error: ${err}`);
    }

    return NextResponse.json({ sent: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send notification";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
