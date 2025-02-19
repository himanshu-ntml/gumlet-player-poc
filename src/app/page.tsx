import dynamic from "next/dynamic";

const PlayerComponent = dynamic(() => import("./player/_components/GumletPlayerTokenExample"), { ssr: false });

export default function Player() {
    return <PlayerComponent />;
}
