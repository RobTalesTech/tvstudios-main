import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, Repeat2, Verified, Clock } from "lucide-react";

// The Custom Social Media Feed Data
const thoughts = [
  {
    id: 1,
    author: "Rohit Badgujar",
    handle: "@WriterRob",
    date: "Jan 13, 2026",
    time: "11:11 AM",
    verified: true,
    content: `This is the time of personal branding. The social media is now algo media, only serving personally will save your business in the coming bot AI shift very soon you will never know...\n\nAnd the Only Option You will left with not doing a business but being the Brand....`,
    signOff: ":::----<> रो ' ब",
    tags: ["#ArtEntrepreneur", "#PersonalBranding", "#AlgoMedia"],
    image: "/algo-poster.png",
    likes: 342,
    retweets: 89,
    comments: 24
  },
  {
    id: 2,
    author: "Rohit Badgujar",
    handle: "@WriterRob",
    date: "Jan 15, 2026",
    time: "09:45 AM",
    verified: true,
    content: "Everyday is just a combination of choice and only on choice in a day can change your life. So always choose you and your brand if you dare to stand authentic.",
    signOff: ":::----<> रो ' ब",
    tags: ["#Mindset", "#Authenticity", "#Entrepreneurs"],
    image: null,
    likes: 128,
    retweets: 45,
    comments: 12
  },
  {
    id: 3,
    author: "Rohit Badgujar",
    handle: "@WriterRob",
    date: "Jan 18, 2026",
    time: "08:30 AM",
    verified: true,
    content: `Entrepreneurship is not a Business — it's business on the mode of full time innovation.\n\nAnd The Art is the only way of innovation... Living with Art becomes living with Innovation. A full time learning, doing lifestyle of self management.\n\nThis has been and will be the only way to the digital world.`,
    signOff: ":::----<> रो ' ब",
    tags: ["#ArtEntrepreneur", "#Innovation", "#DigitalWorld", "#SelfManagement"],
    image: null,
    likes: 214,
    retweets: 67,
    comments: 31
  }
];

const ThoughtFeed = () => {
  return (
    <section className="py-20 bg-background relative border-y border-white/5" id="thought-feed">
      <div className="container px-4 mx-auto max-w-3xl">
        
        {/* Feed Header */}
        <div className="mb-12 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3"
          >
            Real Views • Rare Niche
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tight"
          >
            The Art Entrepreneur <span className="text-muted-foreground/30 font-serif italic lowercase">feed</span>
          </motion.h2>
        </div>

        {/* The Feed */}
        <div className="space-y-6">
          {thoughts.map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card/20 backdrop-blur-md border border-white/10 p-5 md:p-8 rounded-2xl shadow-xl hover:bg-card/30 transition-colors"
            >
              {/* Author Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border border-white/10 shrink-0">
                  <img src="/founder.jpg" alt={post.author} className="w-full h-full object-cover grayscale opacity-80" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-white hover:underline cursor-pointer">{post.author}</h4>
                    {post.verified && <Verified className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                    <span>{post.handle}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.date}</span>
                  </div>
                </div>
              </div>

              {/* Content Text */}
              <div className="mb-5">
                <p className="text-white/90 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
                  {post.content}
                </p>
                
                {/* Sign off and Tags */}
                <div className="mt-4 break-words">
                  <span className="text-primary font-black uppercase tracking-widest text-xs block mb-2">{post.signOff}</span>
                  <div className="flex flex-wrap gap-2 text-xs font-bold text-blue-400">
                    {post.tags.map(tag => (
                      <span key={tag} className="hover:underline cursor-pointer">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Image Attachment */}
              {post.image && (
                <div className="mt-4 mb-5 rounded-xl border border-white/10 overflow-hidden relative group">
                  <img src={post.image} alt="Thought Poster" className="w-full h-auto max-h-[500px] object-cover" />
                  <a href={post.image} download="RohitBadgujar_Poster.png" className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black">
                    Download Free Poster
                  </a>
                </div>
              )}

              {/* Social Metrics */}
              <div className="flex items-center justify-between text-muted-foreground pt-4 border-t border-white/5">
                <button className="flex items-center gap-2 text-xs font-bold hover:text-blue-400 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors"><MessageSquare className="w-4 h-4" /></div>
                  {post.comments}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold hover:text-green-400 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-green-400/10 transition-colors"><Repeat2 className="w-4 h-4" /></div>
                  {post.retweets}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold hover:text-red-400 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-red-400/10 transition-colors"><Heart className="w-4 h-4" /></div>
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold hover:text-primary transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors"><Share2 className="w-4 h-4" /></div>
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ThoughtFeed;
