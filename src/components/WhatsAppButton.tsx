import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918149981660";
const DEFAULT_MESSAGE = "Hi! I'm interested in TV Studios services.";

const WhatsAppButton = ({ label = "Chat on WhatsApp", className = "", message }: { label?: string; className?: string; message?: string }) => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || DEFAULT_MESSAGE)}`}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-body text-sm font-medium text-primary-foreground transition-all hover:brightness-110 hover:scale-105 ${className}`}
  >
    <MessageCircle className="h-4 w-4" />
    {label}
  </a>
);

export default WhatsAppButton;
