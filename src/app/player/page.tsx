import dynamic from "next/dynamic";

const PlayerComponent = dynamic(() => import("./_components/GumletPlayer"), { ssr: false });

export default function Player() {
    return <PlayerComponent />;
}
