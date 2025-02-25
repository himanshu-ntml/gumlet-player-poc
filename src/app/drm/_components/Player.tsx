"use client";
//@ts-ignore

import ReactDRMPlayer from "@gumlet/react-drm-player";
import "regenerator-runtime/runtime"; // Ensure async support

interface PlayerProps {
  signedUrl: string;
  signedUrlFairPlay: string;
  certificateUrl: string;
  src: string;
}

function Player({
  signedUrl,
  signedUrlFairPlay,
  certificateUrl,
  src,
}: PlayerProps) {
  const onError = (event: { detail: { code: string } }) => {
    console.error("Error code", event.detail.code, "object", event.detail); // eslint-disable-line no-console
  };

  return (
    <div className="App">
      <ReactDRMPlayer
        src={src}
        fairplayCertificateURI={certificateUrl}
        fairplayLicenseURI={signedUrlFairPlay}
        widevineLicenseURI={signedUrl}
        onPlayerError={(error) => {
          onError(error);
        }}
        onPlaybackError={(error) => {
          onError(error);
        }}
        width="640"
        height="264"
        controls
        muted
        preload="none"
        autoPlay={false}
      />
    </div>
  );
}
export default Player;
