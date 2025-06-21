// import { waitUntil } from "@vercel/functions";
// import { makeWebhookValidator } from "@whop/api";
// import type { NextRequest } from "next/server";

// const validateWebhook = makeWebhookValidator({
// 	webhookSecret: process.env.WHOP_WEBHOOK_SECRET ?? "fallback",
// });

// export async function POST(request: NextRequest): Promise<Response> {
// 	// Validate the webhook to ensure it's from Whop
// 	const webhookData = await validateWebhook(request);

// 	// Handle the webhook event
// 	if (webhookData.action === "payment.succeeded") {
// 		const { id, final_amount, amount_after_fees, currency, user_id } =
// 			webhookData.data;

// 		// final_amount is the amount the user paid
// 		// amount_after_fees is the amount that is received by you, after card fees and processing fees are taken out

// 		console.log(
// 			`Payment ${id} succeeded for ${user_id} with amount ${final_amount} ${currency}`,
// 		);

// 		// if you need to do work that takes a long time, use waitUntil to run it in the background
// 		waitUntil(
// 			potentiallyLongRunningHandler(
// 				user_id,
// 				final_amount,
// 				currency,
// 				amount_after_fees,
// 			),
// 		);
// 	}

// 	// Make sure to return a 2xx status code quickly. Otherwise the webhook will be retried.
// 	return new Response("OK", { status: 200 });
// }

// async function potentiallyLongRunningHandler(
// 	_user_id: string | null | undefined,
// 	_amount: number,
// 	_currency: string,
// 	_amount_after_fees: number | null | undefined,
// ) {
// 	// This is a placeholder for a potentially long running operation
// 	// In a real scenario, you might need to fetch user data, update a database, etc.
// }


// Webhook for handling successful payments
import { NextResponse } from "next/server";
import { addPlayer, Player } from "@/lib/game-store";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (payload.type === 'payment.succeeded') {
      const { metadata, id: receiptId } = payload.data.object;
      const { userId, username, avatar } = metadata; // Assume we get these from checkout session or fetch them

      if (!userId || !username) {
        return NextResponse.json({ error: "Missing user metadata" }, { status: 400 });
      }

      const player: Player = {
        whopId: userId,
        username: username,
        avatar: avatar || `https://ui-avatars.com/api/?name=${username}`,
        receiptId,
      };

      const success = addPlayer(player);

      if (!success) {
        // Game already started, so we should issue a refund
        console.warn(`Player ${userId} tried to join late. REFUND NEEDED for receipt ${receiptId}`);
        // TODO: Implement refund logic via Whop API
      }
    }
    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}