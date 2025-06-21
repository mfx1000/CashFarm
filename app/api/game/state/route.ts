import { NextResponse, type NextRequest } from "next/server";
import { getGame } from "@/lib/game-store";

// This tells Vercel that this route is dynamic and the response should not be cached.
export const dynamic = "force-dynamic";

/**
 * API route handler for GET requests.
 * Fetches and returns the current state of the game from the in-memory store.
 * @param {NextRequest} request - The incoming request object.
 */
export async function GET(request: NextRequest) { // FIXED: Added the 'request: NextRequest' parameter
  try {
    const game = getGame();
    return NextResponse.json(game);
  } catch (error) {
    console.error("Error fetching game state:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
