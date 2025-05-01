import { Button } from "@/components/ui/button";
import { Calendar, Upload, Sparkles, ChevronRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface WelcomeSectionProps {
  userName: string;
  onUploadClick: () => void;
  greetingMessage?: string;
  userAvatar?: string;
}

export const WelcomeSection = ({ 
  userName, 
  onUploadClick, 
  greetingMessage = "Welcome back",
  userAvatar 
}: WelcomeSectionProps) => {
  const controls = useAnimation();
  const scrollToAppointments = () => {
    document.getElementById("appointments-section")?.scrollIntoView({ 
      behavior: "smooth",
      block: "center"
    });
  };

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
      await controls.start("hover");
    };
    sequence();
  }, [controls]);

  return (
    <motion.div 
      className="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 p-8 rounded-3xl bg-gradient-to-br from-white via-blue-50 to-white shadow-2xl border border-blue-100/70"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: -40 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1],
            when: "beforeChildren"
          }
        },
        hover: {
          scale: 1.005,
          transition: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
        }
      }}
    >
      {/* Floating gradient elements */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-300/10 rounded-full filter blur-[100px] animate-float-slow"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300/10 rounded-full filter blur-[100px] animate-float"></div>
      
      {/* Header */}
      <motion.div 
        className="relative z-10 flex items-start gap-4"
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1] 
            }
          }
        }}
      >
        {userAvatar && (
          <motion.div 
            className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <img src={userAvatar} alt={userName} className="h-full w-full object-cover" />
          </motion.div>
        )}
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Sparkles className="h-5 w-5 text-amber-400" />
            </motion.div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {greetingMessage}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {userName}
            </span>
          </h1>
          
          <motion.p 
            className="text-slate-500 mt-2 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Your health insights dashboard
            <ChevronRight className="h-4 w-4 text-blue-400 animate-bounce-horizontal" />
          </motion.p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="relative z-10 flex gap-4 flex-wrap"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.8, 
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div 
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0 }
          }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            variant="outline"
            className="group border-blue-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            onClick={scrollToAppointments}
            aria-label="View appointments"
          >
            <Calendar className="h-5 w-5 mr-2 group-hover:text-blue-700 transition-colors group-hover:animate-pulse" />
            <span className="font-medium">Appointments</span>
          </Button>
        </motion.div>

        <motion.div 
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0 }
          }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            onClick={onUploadClick}
            aria-label="Upload new X-ray"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <Upload className="h-5 w-5 mr-2 transition-transform group-hover:rotate-12 group-hover:scale-110" />
            <span className="font-medium relative">Upload X-ray</span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Add to your global CSS:
/*
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-20px) translateX(10px); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(10px) translateX(-15px); }
}

@keyframes bounce-horizontal {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-bounce-horizontal {
  animation: bounce-horizontal 2s ease-in-out infinite;
}
*/