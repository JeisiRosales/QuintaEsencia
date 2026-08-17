import { WhatsappIcon, InstagramIcon, TiktokIcon } from 'hugeicons-react'

// Interface
interface SocialLink {
    name: string
    url: string
    icon: React.ComponentType<{ className?: string }>
}

export const SOCIAL_LINKS: SocialLink[] = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/quintaesencia.mgta?igsh=aGZ2MHR4a2ZrZWtp",
        icon: InstagramIcon
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@quintaesencia.mgta?_r=1&_t=ZS-98xe7EhXhiC",
        icon: TiktokIcon
    },
    {
        name: "Canal de WhatsApp",
        url: "https://whatsapp.com/channel/0029VbCZTzFFSAt4dGjHi522",
        icon: WhatsappIcon
    }
];