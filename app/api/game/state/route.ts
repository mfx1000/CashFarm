import { NextResponse, type NextRequest } from "next/server";
import { getGame } from "@/lib/game-store";

// This tells Vercel that this route is dynamic and the response should not be cached.
export const dynamic = "force-dynamic";

/**
 * API route handler for GET requests, defined as a separate function.
 * @param {NextRequest} req - The incoming request object.
 */
async function handler(req: NextRequest) {
  try {
    const game = getGame();
    return NextResponse.json(game);
  } catch (error) {
    console.error("Error fetching game state:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// FIXED: Export the handler using a different syntax.
// This explicitly exports a named constant 'GET' which is an alias for our 'handler' function.
// This can resolve rare module-resolution bugs in build tools.
export { handler as GET };
