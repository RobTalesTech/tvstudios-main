import { motion } from "framer-motion";

const MovementSection = () => {
  const manifestoLines = [
    "WE DO NOT JUST PRODUCE CONTENT.",
    "WE ARCHITECT INFLUENCE.",
    "WHERE CREATIVITY MEETS CAPITAL.",
    "ART INTO ECONOMY."
  ];

  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center bg-[#010101] py-32 px-4 md:px-8 border-t border-white/5">
      {/* Ambient center split glow to give the text physical space */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[2px] w-[20%] bg-gradient-to-r from-transparent via-[hsl(43_72%_55%)]/20 to-transparent blur-sm" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={{
             hidden: { opacity: 0 },
             visible: {
               opacity: 1,
               transition: { staggerChildren: 0.4 }
             }
           }}
           className="flex flex-col items-center justify-center gap-16 md:gap-24"
        >
          {manifestoLines.map((line, index) => (
            <motion.div
               key={index}
               variants={{
                 hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" },
                 visible: {
                   opacity: 1,
                   y: 0,
                   scale: 1,
                   filter: "blur(0px)",
                   transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                 }
               }}
               className="relative w-full flex flex-col items-center"
            >
              {index > 0 && (
                <div className="absolute -top-10 md:-top-14 h-[40px] w-[1px] bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
              )}
              
              <h2 
                className={`font-display ${
                  index === manifestoLines.length - 1 
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-12 drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]" 
                    : "text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
                } tracking-[0.2em] md:tracking-[0.4em] font-black leading-none select-none uppercase`}
              >
                {line}
              </h2>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MovementSection;
