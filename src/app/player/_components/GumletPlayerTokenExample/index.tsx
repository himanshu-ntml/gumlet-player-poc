//@ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
//@ts-expect-error
import { GumletPlayer } from "@gumlet/react-embed-player";

const GumletPlayerComponent = () => {
    const playerRef = useRef<any>(null);
    const [drmToken, setDrmToken] = useState<string | null>(null);
    const [tokenExpiry, setTokenExpiry] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [epochTime, setEpochTime] = useState(Date.now());

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch("/player/auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: "12345" }), // Replace with actual user ID
                });

                if (response.ok) {
                    const data = await response.json();
                    setDrmToken(data.drmToken);
                    setTokenExpiry(data.expires);
                } else {
                    console.error("Failed to fetch DRM token:", await response.text());
                }
            } catch (error) {
                console.error("Error fetching DRM token:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setEpochTime(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []); 

    const defaultPlayerProps = {
        videoID: "67b3f4e1a088b0540c119413",
        // title: "Gumlet Player Example",
        // style: { height: "100vh", width: "100vw", position: "relative" },
        // autoplay: false,
        // preload: "metadata",
        // muted: true,
        // disable_player_controls: false,
        // t: 35,
        // schemaOrgVideoObject: {
        //     "@context": "https://schema.org",
        //     "@type": "VideoObject",
        //     name: "Siren pink 3:4 video",
        //     description: "",
        //     thumbnailUrl: [
        //         "https://video.gumlet.io/603cc6a9926fb6233baebb34/66487345e3dcc416dc9bbb5b/thumbnail-1-0.png?v=1716024171990",
        //     ],
        //     uploadDate: "2024-05-18T09:22:13.592Z",
        //     duration: "PT7.833333S",
        //     embedUrl: "https://play.gumlet.io/embed/674e49eadeed8d45e9f92b72",
        // },
    };


    return (
        <>
            value--: {tokenExpiry == epochTime ? 'times up' : tokenExpiry / 1000}
            <br />
            current: {epochTime / 1000}
            <GumletPlayer
                ref={playerRef}
                title={"hello world"}
                {...defaultPlayerProps}
                style={{ height: "100vh", width: "100vw", position: "relative" }}
                loop={false}
                expires={tokenExpiry}
            />
        </>
    );
};

export default GumletPlayerComponent;
