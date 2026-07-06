import { supabase } from "@/lib/supabase";

export const handleWhatsAppRedirect = async (messageText: string, customNumber?: string) => {
  const number = customNumber || "919588627190"; // default to manager's number
  const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(messageText)}`;
  
  const lead = {
    id: Math.random().toString(36).substr(2, 9),
    message: messageText,
    target_number: number,
    timestamp: new Date().toISOString()
  };

  // 1. Save copy to localStorage (backup)
  try {
    const existing = localStorage.getItem("tv3_whatsapp_leads");
    const list = existing ? JSON.parse(existing) : [];
    list.push(lead);
    localStorage.setItem("tv3_whatsapp_leads", JSON.stringify(list));
  } catch (err) {
    console.error("Local storage lead log error:", err);
  }

  // 2. Save copy to Supabase if configured
  if (supabase) {
    try {
      await supabase.from("tv3_whatsapp_leads").insert([lead]);
    } catch (err) {
      console.error("Supabase lead log error:", err);
    }
  }

  // 3. Open WhatsApp link
  window.open(waUrl, "_blank");
};
