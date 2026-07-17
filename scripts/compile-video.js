import fs from "fs";
import { execSync } from "child_process";
import path from "path";

async function main() {
  console.log("Initializing PBI Video Compiler Node...");

  const payloadStr = process.env.CLIENT_PAYLOAD;
  if (!payloadStr) {
    console.error("CLIENT_PAYLOAD env variable is empty.");
    process.exit(1);
  }

  const payload = JSON.parse(payloadStr);
  const conversation = payload.conversation;
  const businessName = payload.businessName || "PBI Pilot Client";

  if (!Array.isArray(conversation) || conversation.length === 0) {
    console.error("No conversation dialogues found in payload.");
    process.exit(1);
  }

  console.log(`Processing ${conversation.length} dialogue turns for brand: ${businessName}`);

  const tempDir = path.join(process.cwd(), "temp_pbi");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const clips = [];

  // Helper to download a file
  const downloadFile = async (url, dest) => {
    // Resolve relative URLs to production domain
    let absoluteUrl = url;
    if (url.startsWith("/")) {
      absoluteUrl = `https://tvstudios.site${url}`;
    }
    console.log(`Downloading: ${absoluteUrl}`);
    const res = await fetch(absoluteUrl);
    if (!res.ok) throw new Error(`Failed to download ${absoluteUrl}: ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(arrayBuffer));
  };

  try {
    for (let i = 0; i < conversation.length; i++) {
      const turn = conversation[i];
      const audioPath = path.join(tempDir, `voice_${i}.mp3`);
      const imagePath = path.join(tempDir, `frame_${i}.jpg`);
      const clipPath = path.join(tempDir, `clip_${i}.mp4`);

      console.log(`[Turn ${i + 1}/${conversation.length}] Fetching assets...`);
      await downloadFile(turn.audioUrl, audioPath);
      await downloadFile(turn.imageUrl, imagePath);

      // Probe audio duration using ffprobe
      console.log(`[Turn ${i + 1}/${conversation.length}] Probing audio duration...`);
      const durationStr = execSync(
        `ffprobe -i "${audioPath}" -show_entries format=duration -v quiet -of csv="p=0"`
      ).toString().trim();
      const duration = parseFloat(durationStr) || 5.0; // fallback to 5 seconds
      console.log(`Audio duration: ${duration}s`);

      // Compile single clip using FFmpeg
      console.log(`[Turn ${i + 1}/${conversation.length}] Rendering video clip...`);
      // Loop image over audio duration
      execSync(
        `ffmpeg -loop 1 -i "${imagePath}" -i "${audioPath}" -t ${duration} -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k -shortest -y "${clipPath}"`
      );

      clips.push(clipPath);
    }

    // Concatenate all compiled clips
    console.log("Concatenating clips into master reel...");
    const listFilePath = path.join(tempDir, "list.txt");
    const listContent = clips.map(c => `file '${c}'`).join("\n");
    fs.writeFileSync(listFilePath, listContent);

    const masterOutputPath = path.join(tempDir, "master_reel.mp4");
    execSync(`ffmpeg -f concat -safe 0 -i "${listFilePath}" -c copy -y "${masterOutputPath}"`);
    console.log("Master reel compiled successfully!");

    // Check if Discord webhook is configured to post the file
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      console.log("Dispatching master reel to Discord approval webhook...");
      const formData = new FormData();
      formData.append(
        "payload_json",
        JSON.stringify({
          content: `🎥 **PBI Autopilot: New Reel Compiled & Awaiting Approval** 🎥\n\n**Brand**: ${businessName}\n**Caption**: ${payload.caption || "No caption generated."}\n\nReview visual frames and audio below. Click **Approve** to publish to Instagram.`
        })
      );

      const fileBuffer = fs.readFileSync(masterOutputPath);
      const fileBlob = new Blob([fileBuffer], { type: "video/mp4" });
      formData.append("file", fileBlob, `${businessName.replace(/\s+/g, "_")}_reel.mp4`);

      const discordRes = await fetch(webhookUrl, {
        method: "POST",
        body: formData
      });

      if (discordRes.ok) {
        console.log("Successfully posted reel to Discord!");
      } else {
        const errText = await discordRes.text();
        console.error(`Failed to post to Discord: ${errText}`);
      }
    } else {
      console.warn("DISCORD_WEBHOOK_URL is not set. Skipping Discord dispatch.");
    }

  } catch (error) {
    console.error("Compilation process failed with error:", error);
    process.exit(1);
  } finally {
    // Clean up temporary directory
    console.log("Cleaning up temporary directories...");
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (cleanupErr) {
      console.error("Cleanup warning:", cleanupErr);
    }
  }
}

main();
