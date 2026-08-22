import { WhatsappIcon, InstagramIcon, TiktokIcon, HandPrayerIcon } from 'hugeicons-react'
import { HandHeart, Leaf, Home } from 'lucide-react';

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

export const pilares = [
    {
        icon: HandHeart,
        title: "Hecho a Mano",
        desc: "Elaborado sin prisa al baño maría",
        text: "Sales sin refinar y aceites esenciales 100% puros, sin químicos.",
    },
    {
        icon: Leaf,
        title: "Botánica Sagrada",
        desc: "Plantas, cristales y minerales puros",
        text: "Mezclado a mano honrando ciclos lunares y energía botánica.",
    },
    {
        icon: HandPrayerIcon,
        title: "Alta Vibración",
        desc: "Decretos cargados de intención",
        text: "Decretos con afirmaciones y mantras que actúan en lo consciente e inconsciente."
    },
    {
        icon: Home,
        title: "Tu Santuario",
        desc: "Rituales para habitarte en paz",
        text: "Herramientas para crear tu santuario: sanación, conexión y renacimiento."
    }
]