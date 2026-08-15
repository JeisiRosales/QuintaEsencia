import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons/Icons"
import { JSX } from "react/jsx-runtime";

// Interface
interface SocialLink {
    name: string
    url: string
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

export const SOCIAL_LINKS: SocialLink[] = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/quintaesenciatienda/",
        icon: InstagramIcon
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@quintaesenciatienda/",
        icon: TikTokIcon
    }
];