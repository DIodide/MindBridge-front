// 'use client'
// import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
// import { motion } from 'framer-motion'
// import { useState } from 'react'
// import Link from 'next/link'


// export default function TitleCard() {
//   const [isHovered, setIsHovered] = useState(false)
//   const tagLine = [
//     {
//       text: "Connect"
//     },
//     {
//       text: "Your"
//     },
//     {
//       text: "Thoughts"
//     },
//     {
//       text: "Expand"
//     },
//     {
//       text: "Your"
//     },
//     {
//       text: "Horizons"
//     },
//     {
//       text: "Bridge"
//     },
//     {
//       text: "The"
//     },
//     {
//       text: "Gap"
//     },
//     {
//       text: "Between"
//     },
//     {
//       text: "Imagination"
//     },
//     {
//       text: "And"
//     },
//     {
//       text: "Reality"
//     }
//   ];

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black p-4">
//       <div className="absolute inset-0 overflow-hidden">
//         <svg
//           className="w-full h-full opacity-20"
//           viewBox="0 0 100 100"
//           preserveAspectRatio="none"
//         >
//           <motion.path
//             d="M0,50 Q25,30 50,50 T100,50 T150,50"
//             stroke="url(#gradient)"
//             strokeWidth="0.5"
//             fill="none"
//             initial={{ pathLength: 0 }}
//             animate={{ pathLength: 1 }}
//             transition={{ duration: 2, ease: "easeInOut" }}
//           />
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#8B5CF6" />
//               <stop offset="100%" stopColor="#D8B4FE" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </div>
//       <motion.div
//         className="relative z-10 max-w-4xl mx-auto text-center"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//       >
//         <motion.h1
//           className="text-5xl md:text-7xl font-bold mb-6 text-purple-300"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//         >
//           Mind Bridge
//         </motion.h1>
    
//         <TypewriterEffectSmooth words={tagLine}  />  
//         <Link href="/">
//         <motion.button
//           className="px-8 py-3 text-lg font-semibold text-white bg-purple-600 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <motion.span
//             initial={false}
//             animate={{ x: isHovered ? 5 : 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             Get Started
//           </motion.span>
//           <motion.span
//             className="ml-2"
//             initial={false}
//             animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             →
//           </motion.span>
//         </motion.button>
//         </Link>
//       </motion.div>
//     </div>
//   )
// }