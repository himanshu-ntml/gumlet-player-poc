import dynamic from "next/dynamic";
import crypto from "crypto";

// Define types for function parameters
interface GenerateDRMSignedLicenseURLParams {
  contentId: string;
  proxyUrl: string;
  proxySecret: string;
  tokenLifetime?: number;
}

// Function to generate the signed license server URL for DRM
const generateDRMSignedLicenseURL = ({
  contentId,
  proxyUrl,
  proxySecret,
  tokenLifetime = 30,
}: GenerateDRMSignedLicenseURLParams): string => {
  if (!contentId || !proxyUrl || !proxySecret) {
    throw new Error(
      "Missing required parameters: contentId, proxyUrl, or proxySecret"
    );
  }

  // Decode the secret key from Base64
  const decodedSecret = Buffer.from(proxySecret, "base64");

  // Construct the full proxy URL
  const fullProxyUrl = `${proxyUrl}/${contentId}`;

  // Set expiration time in seconds
  const queryParams: Record<string, string | number> = {
    expires: Math.round(Date.now() / 1000) + tokenLifetime, // Convert ms to seconds
  };

  // Create query string for token generation
  const stringForTokenGeneration = `${fullProxyUrl.slice(
    35
  )}?${new URLSearchParams(queryParams).toString()}`;

  // Generate HMAC-SHA1 signature
  const signature = crypto
    .createHmac("sha1", decodedSecret)
    .update(stringForTokenGeneration)
    .digest("hex");

  // Construct and return the signed URL
  return `${fullProxyUrl}?${new URLSearchParams(
    queryParams
  ).toString()}&token=${signature}`;
};

// Dynamic import for Player component with SSR disabled
const PlayerComponent = dynamic(() => import("./_components/Player"), {
  ssr: false,
});

// Define types for PageProps
interface PageProps {
  contentId: string;
  orgId: string;
  proxySecret: string;
}

// Main Page Component
export default function Page() {
  // Example values (Replace with actual values)
  const contentId = "67bd3f336ca0059a95b6a7bd";
  const orgId = "674e45de5a8822b2de698bee";
  const proxySecret = "-";

  // DRM Proxy URLs
  const widevineProxy = `https://widevine.gumlet.com/licence/${orgId}`;
  const fairPlayProxy = `https://fairplay.gumlet.com/licence/${orgId}`;

  // Generate signed URLs for Widevine and FairPlay
  const signedUrlWidevine = generateDRMSignedLicenseURL({
    contentId,
    proxyUrl: widevineProxy,
    proxySecret,
  });

  const signedUrlFairPlay = generateDRMSignedLicenseURL({
    contentId,
    proxyUrl: fairPlayProxy,
    proxySecret,
  });

  return (
    <PlayerComponent
      signedUrl={signedUrlWidevine}
      signedUrlFairPlay={signedUrlFairPlay}
      src="https://video.gumlet.io/67bd3f2e6ca0059a95b6a7a8/67bd3f336ca0059a95b6a7bd/main.m3u8"
      certificateUrl=""
    />
  );
}
