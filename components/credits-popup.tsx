// "use client"

// import React from 'react'
// import { motion } from 'framer-motion'
// import { Cross1Icon } from '@radix-ui/react-icons'
// import { Button } from '@/components/ui/button'
// import { useSpring, animated } from '@react-spring/web'
// import { Progress } from "@/components/ui/progress"

// interface CreditsPopupProps {
//   credits: number | null
//   loading: boolean
//   error: Error | null
//   onClose: () => void
//   plan: 'Free' | 'Hobby' | 'Creator' | 'Pro'
// }

// const planCredits = {
//   'Free': 20,
//   'Hobby': 500,
//   'Creator': 1000,
//   'Pro': 4000
// }

// export default function CreditsPopup({ credits, loading, error, onClose, plan }: CreditsPopupProps) {
//   console.log('CreditsPopup received props:', { credits, loading, error, plan });
//   const totalCredits = planCredits[plan]
//   const availableCredits = credits !== null ? Math.min(credits, totalCredits) : 0;
//   const usedCredits = totalCredits - availableCredits;
//   const percentageUsed = (usedCredits / totalCredits) * 100

//   const { number } = useSpring({
//     from: { number: 0 },
//     number: credits || 0,
//     delay: 200,
//     config: { mass: 1, tension: 20, friction: 10 },
//   })

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <motion.div
//         className="relative w-full max-w-md p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl text-center"
//         onClick={(e) => e.stopPropagation()}
//         initial={{ y: 20 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.3, ease: "easeOut" }}
//       >
//         <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-b from-[#c8c2bd] to-[#86868b] bg-clip-text text-transparent">
//           Your Credits
//         </h2>
//         {loading ? (
//           <p className="text-[#86868b]">Loading credits...</p>
//         ) : error ? (
//           <p className="text-red-500">Error loading credits. Please try again.</p>
//         ) : (
//           <>
//             <motion.div
//               className="relative inline-block"
//               initial={{ scale: 1 }}
//               animate={{ scale: 1.05 }}
//               transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
//             >
//               <animated.span className="text-6xl font-bold bg-gradient-to-b from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent filter-[url(#glow-4)]">
//                 {number.to((n) => n.toFixed(0))}
//               </animated.span>
//             </motion.div>
//             <p className="mt-4 text-[#86868b]">Available credits for creating stunning video ads</p>
//             <p className="mt-2">
//               {/* <span className="font-semibold text-white">{credits}</span> credits available */}
//             </p>
//             <div className="mt-6 space-y-2">
//               <Progress value={percentageUsed} className="h-2 w-full bg-[#86868b]/20" 
//                 indicatorClassName="bg-gradient-to-r from-[#86868b] to-[#bdc2c9]" />
//               <div className="flex justify-between text-sm text-[#86868b]">
//                 <span>{credits} used</span>
//                 <span>{credits} total</span>
//               </div>
//             </div>
//             <p className="mt-4 text-[#c8c2bd]">
//               Current Plan: <span className="font-semibold">{plan}</span>
//             </p>
//           </>
//         )}
//         <Button
//           variant="outline"
//           className="mt-6 text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
//           size="lg"
//           onClick={onClose}
//         >
//           Close <Cross1Icon className="ml-2 h-4 w-4" />
//         </Button>
//       </motion.div>
//     </motion.div>
//   )
// }







// "use client"

// import React from 'react'
// import { motion } from 'framer-motion'
// import { Cross1Icon } from '@radix-ui/react-icons'
// import { Button } from '@/components/ui/button'
// import { useSpring, animated } from '@react-spring/web'
// import { Progress } from "@/components/ui/progress"

// interface CreditsPopupProps {
//   credits: number | null
//   loading: boolean
//   error: Error | null
//   onClose: () => void
//   plan: 'Free' | 'Hobby' | 'Creator' | 'Pro'
// }

// const planCredits = {
//   'Free': 20,
//   'Hobby': 500,
//   'Creator': 1000,
//   'Pro': 4000
// }

// export default function CreditsPopup({ credits, loading, error, onClose, plan }: CreditsPopupProps) {
//   const totalCredits = planCredits[plan] || 0;
//   console.log('CreditsPopup received props:', { credits, loading, error, plan, totalCredits });
//   const availableCredits = credits !== null ? credits : 0;
//   const percentageUsed = ((totalCredits - availableCredits) / totalCredits) * 100

//   const { number } = useSpring({
//     from: { number: 0 },
//     number: credits || 0,
//     delay: 200,
//     config: { mass: 1, tension: 20, friction: 10 },
//   })

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <motion.div
//         className="relative w-full max-w-md p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl text-center"
//         onClick={(e) => e.stopPropagation()}
//         initial={{ y: 20 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.3, ease: "easeOut" }}
//       >
//         <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-b from-[#c8c2bd] to-[#86868b] bg-clip-text text-transparent">
//           Your Credits
//         </h2>
//         {loading ? (
//           <p className="text-[#86868b]">Loading credits...</p>
//         ) : error ? (
//           <p className="text-red-500">Error loading credits. Please try again.</p>
//         ) : (
//           <>
//             <motion.div
//               className="relative inline-block"
//               initial={{ scale: 1 }}
//               animate={{ scale: 1.05 }}
//               transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
//             >
//               <animated.span className="text-6xl font-bold bg-gradient-to-b from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent filter-[url(#glow-4)]">
//                 {number.to((n) => n.toFixed(0))}
//               </animated.span>
//             </motion.div>
//             <p className="mt-4 text-[#86868b]">Available credits for creating stunning video ads</p>
//             {/* <p className="mt-2 text-lg font-semibold text-[#c8c2bd]">
//               Total Credits: {totalCredits}
//             </p> */}
//             <div className="mt-6 space-y-2">
//               <Progress 
//                 value={percentageUsed} 
//                 className="h-2 w-full bg-[#86868b]/20" 
//                 indicatorProps={{
//                   className: "bg-gradient-to-r from-[#86868b] to-[#bdc2c9]"
//                 }}
//               />
//               <div className="flex justify-between text-sm text-[#86868b]">
//                 <span>{availableCredits} available</span>
//                 <span>{totalCredits} total</span>
//               </div>
//             </div>
//             <p className="mt-4 text-[#c8c2bd]">
//               Current Plan: <span className="font-semibold">{plan}</span>
//             </p>
//           </>
//         )}
//         <Button
//           variant="outline"
//           className="mt-6 text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
//           size="lg"
//           onClick={onClose}
//         >
//           Close <Cross1Icon className="ml-2 h-4 w-4" />
//         </Button>
//       </motion.div>
//     </motion.div>
//   )
// }

"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useSpring, animated } from '@react-spring/web'
import { Progress } from "@/components/ui/progress"

interface CreditsPopupProps {
  credits: number | null
  loading: boolean
  error: Error | null
  onClose: () => void
  plan: 'free' | 'hobby' | 'creator' | 'pro'
}


export default function CreditsPopup({ credits, loading, error, onClose, plan }: CreditsPopupProps) {
  let totalCredits = 0;
  if (plan === 'free') {
    // Change it back to 20 when making it paid again 
    // Step 6
    totalCredits = 100;
  } else if (plan === 'hobby') {
    totalCredits = 500;
  } else if (plan === 'creator') {
    totalCredits = 1000;
  } else if (plan === 'pro') {
    totalCredits = 4000;
  }
  console.log('CreditsPopup received props:', { credits, loading, error, plan, totalCredits });
  const availableCredits = credits !== null ? credits : 0;
  const percentageUsed = ((totalCredits - availableCredits) / totalCredits) * 100
  const usedCredits = totalCredits - availableCredits;
  const percentage = (usedCredits / totalCredits) * 100
  
  const { number } = useSpring({
    from: { number: 0 },
    number: credits || 0,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl text-center"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-b from-[#c8c2bd] to-[#86868b] bg-clip-text text-transparent">
          Your Credits 
        </h2>
        {loading ? (
          <p className="text-[#86868b]">Loading credits...</p>
        ) : error ? (
          <p className="text-red-500">Error loading credits. Please try again.</p>
        ) : (
          <>
            <motion.div
              className="relative inline-block"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            >
              <animated.span className="text-6xl font-bold bg-gradient-to-b from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent filter-[url(#glow-4)]">
                {credits}
              </animated.span>
            </motion.div>
            <p className="mt-4 text-[#86868b]">Available credits for creating stunning video ads</p>
         
            <div className="mt-6 space-y-2">
              <Progress 
               value={percentage} 

               className="h-2 w-full " 
              //  indicatorProps={{
              //    className: "bg-gradient-to-r from-[#86868b] to-[#bdc2c9]"
              //  }}
              />
              <div className="flex justify-between text-sm text-[#86868b]">
                <span>{availableCredits} available</span>
                <span>{totalCredits} total</span>
              </div>
            </div>
            <p className="mt-4 text-[#c8c2bd]">
              Current Plan: <span className="font-semibold">{plan}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground text-[#c8c2bd]">
              Total Credits: {totalCredits}
            </p>
          </>
        )}
        <Button
          variant="outline"
          className="mt-6 text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
          size="lg"
          onClick={onClose}
        >
          Close <Cross1Icon className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

