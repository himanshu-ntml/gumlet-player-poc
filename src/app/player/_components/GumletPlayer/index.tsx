//@ts-nocheck
// app/page.tsx (or another component file)
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
        // Fetch DRM token from the backend
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

    const handleReady = () => {
        const currentTime = Date.now();
        if (tokenExpiry && currentTime > tokenExpiry) {
            alert("Your session has expired. Please refresh the page to continue.");
            playerRef.current?.pause();
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!drmToken) return <div>Unable to load video. Please try again later.</div>;


    const play = () => {
        if (playerRef.current) playerRef.current.play();
    };
    const pause = () => {
        if (playerRef.current) playerRef.current.pause();
    };
    const mute = () => {
        if (playerRef.current) playerRef.current.mute();
    };
    const unmute = () => {
        if (playerRef.current) playerRef.current.unmute();
    };
    const setVolume = (volume: number) => {
        if (playerRef.current) playerRef.current.setVolume(volume);
    };
    const setCurrentTime = (time: number) => {
        if (playerRef.current) playerRef.current.setCurrentTime(time);
    };
    const setPlaybackRate = (rate: number) => {
        if (playerRef.current) playerRef.current.setPlaybackRate(rate);
    };
    const getVolume = async () => {
        if (playerRef.current) alert(`Volume: ${await playerRef.current.getVolume()}`);
    };
    const getDuration = async () => {
        if (playerRef.current) alert(`Duration: ${await playerRef.current.getDuration()} seconds`);
    };
    const getCurrentTime = async () => {
        if (playerRef.current) alert(`Current Time: ${await playerRef.current.getCurrentTime()} seconds`);
    };
    const getPlaybackRate = async () => {
        if (playerRef.current) alert(`Playback Rate: ${await playerRef.current.getPlaybackRate()}`);
    };

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

    // const expires = Date.now() + (60 * 5)

    return (
        <>
            <div style={{ padding: "10px" }}>
                <button style={{ marginRight: "10px" }} onClick={play}>Play</button>
                <button style={{ marginRight: "10px" }} onClick={pause}>Pause</button>
                <button style={{ marginRight: "10px" }} onClick={mute}>Mute</button>
                <button style={{ marginRight: "10px" }} onClick={unmute}>Unmute</button>
                <button style={{ marginRight: "10px" }} onClick={() => setVolume(50)}>Set volume to 50%</button>
                <button style={{ marginRight: "10px" }} onClick={() => setCurrentTime(2)}>Set time to 2 seconds</button>
                <button style={{ marginRight: "10px" }} onClick={() => setPlaybackRate(Number(1.5))}>Set playback rate to 2x</button>
                <button style={{ marginRight: "10px" }} onClick={getVolume}>Get volume</button>
                <button style={{ marginRight: "10px" }} onClick={getDuration}>Get duration</button>
                <button style={{ marginRight: "10px" }} onClick={getCurrentTime}>Get current time</button>
                <button style={{ marginRight: "10px" }} onClick={getPlaybackRate}>Get playback rate</button>
            </div>
            {/* <div style={{ marginTop: "10px", padding: "10px" }}> */}
            value--: {tokenExpiry == epochTime ? 'times up' : tokenExpiry / 1000}
            <br />
            current: {epochTime / 1000}
            <GumletPlayer
                ref={playerRef}
                title={"hello world"}
                {...defaultPlayerProps}
                style={{ height: "100vh", width: "100vw", position: "relative" }}
                // expires={expires}
                loop={false}
                // t= {50}
                // disable_seek={true}
                // disable_player_controls={true}
                // watermark_text="MFT iasa ahsuhaushauhsauhasuhauhsauhsauhsuhaushuhsuhauhsuhuh"
                // drm_token={drmToken}
                expires={tokenExpiry}
                onReady={handleReady}
                onError={(e) => console.error("Error event", e)}
                onReady={() => console.log("Player is ready.")}
                onPlay={() => console.log("Video is playing.")}
                onPause={() => console.log("Video is paused.")}
                onProgress={(e) => console.log("Video is at", e.percent)}
                onTimeUpdate={(e) =>
                    console.log(
                        `Video is at ${e.seconds} seconds, total duration ${e.duration} seconds.`
                    )
                }
                onEnded={() => console.log("Video has ended.")}
                onFullScreenChange={(e) => console.log("Full screen change event", e)}
                onPipChange={(e) => console.log("Picture in picture change event", e)}
                onAudioChange={(e) => console.log("Audio changed event", e)}
                onQualityChange={(e) => console.log("Quality changed event", e)}
                onVolumeChange={(e) => console.log("Volume changed event", e)}
                onSeeked={(e) => console.log("Seeked event", e)}
                onError={(e) => console.error("Error event", e)}
            />
            {/* </div> */}
        </>
    );
};

export default GumletPlayerComponent;
