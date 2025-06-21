import { Button } from "@/components/ui/Button";
// FIXED: Import the 'CountdownRenderProps' type from the library
import Countdown, { CountdownRenderProps } from "react-countdown";

export default function LobbyView({ state, onJoin, error }: { state: any, onJoin: () => void, error: string | null }) {
    return (
        <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg border border-yellow-500/20 w-full max-w-sm mx-auto text-center">
            <div className="flex justify-between items-center text-lg mb-4">
                <span>{state.players.length} entries</span>
                <span className="font-bold text-[#FBBF24]">${state.prizePool.toFixed(2)} prize</span>
            </div>

            <div className="mb-6">
                <p className="text-gray-400 text-sm uppercase tracking-widest">Next game starts in</p>
                <Countdown
                    date={state.startTime}
                    // FIXED: Explicitly type the destructured arguments with CountdownRenderProps
                    renderer={({ minutes, seconds }: CountdownRenderProps) => (
                        <div className="text-6xl font-mono font-bold text-white">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </div>
                    )}
                />
            </div>

            <Button onClick={onJoin} className="w-full">Enter Game ($5.00)</Button>
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
    );
}
