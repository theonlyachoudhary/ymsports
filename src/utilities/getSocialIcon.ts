import {
  Instagram,
  Facebook,
  Phone,
  MessageCircle,
  Globe,
  Youtube,
  Linkedin,
  Twitter,
} from "lucide-react";

export function getSocialIcon(linkOrName: string) {
  const v = linkOrName.toLowerCase();

  if (v.includes("whatsapp") || v.includes("wa.me")) return MessageCircle;
  if (v.startsWith("+") || v.match(/[0-9]{7,}/)) return Phone;

  if (v.includes("instagram") || v.includes("ig")) return Instagram;
  if (v.includes("facebook") || v.includes("fb")) return Facebook;
  if (v.includes("youtube")) return Youtube;
  if (v.includes("linkedin")) return Linkedin;
  if (v.includes("x.com") || v.includes("twitter")) return Twitter;

  return Globe; 
}

export function getSocialColor(linkOrName: string) {
  const v = linkOrName.toLowerCase();

  // WhatsApp
  if (v.includes("whatsapp") || v.includes("wa.me")) return "#25D366";

  // Phone numbers
  if (v.startsWith("+") || v.match(/[0-9]{7,}/)) return "#1ABC9C";

  // Instagram (gradient handled separately)
  if (v.includes("instagram") || v.includes("ig")) {
    return "instagram"; // special case
  }

  // Facebook
  if (v.includes("facebook") || v.includes("fb")) return "#1877F2";

  // YouTube
  if (v.includes("youtube")) return "#FF0000";

  // LinkedIn
  if (v.includes("linkedin")) return "#0A66C2";

  // Twitter/X
  if (v.includes("twitter") || v.includes("x.com")) return "#000000";

  // TikTok
  if (v.includes("tiktok")) return "#EE1D52";

  // fallback
  return "#666666";
}

