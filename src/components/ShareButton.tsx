import { Share2, Check } from "lucide-react";
import { useState } from "react";

const ShareButton = ({ anchor, title }: { anchor: string; title: string }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
    const shareText = `Watch "${title}" video crafted in TV Studio`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, text: shareText, url });
        return;
      } catch (err) {
        console.error("Error sharing", err);
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 font-body text-xs text-muted-foreground transition-all hover:border-primary hover:text-primary"
      title="Share this video"
    >
      {copied ? <Check className="h-3 w-3" /> : <Share2 className="h-3 w-3" />}
      {copied ? "Link copied!" : "Share"}
    </button>
  );
};

export default ShareButton;
