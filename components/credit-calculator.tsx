// 'use client'

// import * as React from "react"
// import { Slider } from "@/components/ui/slider"
// import { cn } from "@/lib/utils"

// export default function CreditCalculator() {
//   const [credits, setCredits] = React.useState([1000])
  
//   const markers = [
//     { value: 500, label: 'Hobby' },
//     { value: 1000, label: 'Creator' },
//     { value: 4000, label: 'Pro' }
//   ]

//   // Only show every other tick on mobile for better spacing
//   const ticks = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
//   const mobileTicks = ticks.filter((_, i) => i % 2 === 0)

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 text-white py-20">
//       <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
//         Credit Calculator
//       </h1>
      
//       <div className="mb-8 sm:mb-12">
//         <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6">
//           Select number of credits:
//         </p>
        
//         <div className="relative">
//           <Slider
//             value={credits}
//             onValueChange={setCredits}
//             max={5000}
//             step={100}
//             className="py-4"
//           />
          
//           {/* Desktop tick marks and labels */}
//           <div className="hidden sm:flex absolute w-full justify-between mt-2 text-xs sm:text-sm text-gray-400">
//             {ticks.map((value) => (
//               <div 
//                 key={value} 
//                 className={cn(
//                   "flex flex-col items-center transition-opacity",
//                   credits[0] === value ? "opacity-100" : "opacity-70"
//                 )}
//               >
//                 <div className="h-1 w-px bg-gray-700 mb-1" />
//                 <span className="text-[11px] sm:text-sm">{value}</span>
//                 {markers.find(m => m.value === value) && (
//                   <span className="mt-1 font-medium text-white whitespace-nowrap">
//                     {markers.find(m => m.value === value)?.label}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Mobile tick marks and labels (fewer ticks) */}
//           <div className="flex sm:hidden absolute w-full justify-between mt-2 text-gray-400">
//             {mobileTicks.map((value) => (
//               <div 
//                 key={value} 
//                 className={cn(
//                   "flex flex-col items-center transition-opacity",
//                   credits[0] === value ? "opacity-100" : "opacity-70"
//                 )}
//               >
//                 <div className="h-1 w-px bg-gray-700 mb-1" />
//                 <span className="text-[10px]">{value}</span>
//                 {markers.find(m => m.value === value) && (
//                   <span className="mt-1 text-[10px] font-medium text-white whitespace-nowrap">
//                     {markers.find(m => m.value === value)?.label}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="text-xl sm:text-2xl md:text-3xl font-medium text-center mt-28">
//         With{' '}
//         <span className="text-[#4ADE80]">
//           {credits[0].toLocaleString()} credits
//         </span>
//         {' '}you can create
//       </div>
//     </div>
//   )
// }



'use client'

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export default function CreditCalculator() {
  const [credits, setCredits] = React.useState([1000])
  
  const markers = [
    { value: 500, label: 'Hobby' },
    { value: 1000, label: 'Creator' },
    { value: 4000, label: 'Pro' }
  ]

  // Only show every other tick on mobile for better spacing
  const ticks = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
  const mobileTicks = ticks.filter((_, i) => i % 2 === 0)

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 text-white py-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
        Credit Calculator
      </h1>
      
      <div className="mb-8 sm:mb-12">
        <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6">
          Select number of credits:
        </p>
        
        <div className="relative">
          <Slider
            value={credits}
            onValueChange={setCredits}
            max={5000}
            step={10}
            className="py-4"
          />
          
          {/* Desktop tick marks and labels */}
          <div className="hidden sm:flex absolute w-full justify-between mt-2 text-xs sm:text-sm text-gray-400">
            {ticks.map((value) => (
              <div 
                key={value} 
                className={cn(
                  "flex flex-col items-center transition-opacity",
                  credits[0] === value ? "opacity-100" : "opacity-70"
                )}
              >
                <div className="h-1 w-px bg-gray-700 mb-1" />
                <span className="text-[11px] sm:text-sm">{value}</span>
                {markers.find(m => m.value === value) && (
                  <span className="mt-1 font-medium text-white whitespace-nowrap">
                    {markers.find(m => m.value === value)?.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Mobile tick marks and labels (fewer ticks) */}
          <div className="flex sm:hidden absolute w-full justify-between mt-2 text-gray-400">
            {mobileTicks.map((value) => (
              <div 
                key={value} 
                className={cn(
                  "flex flex-col items-center transition-opacity",
                  credits[0] === value ? "opacity-100" : "opacity-70"
                )}
              >
                <div className="h-1 w-px bg-gray-700 mb-1" />
                <span className="text-[10px]">{value}</span>
                {markers.find(m => m.value === value) && (
                  <span className="mt-1 text-[10px] font-medium text-white whitespace-nowrap">
                    {markers.find(m => m.value === value)?.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xl sm:text-2xl md:text-3xl font-medium text-center mt-28">
        With{' '}
        <span className="text-[#4ADE80]">
          {credits[0].toLocaleString()} credits
        </span>
        {' '}you can create
      </div>
      <div className="text-lg sm:text-xl md:text-2xl font-medium text-center mt-4">
        <span className="text-[#4ADE80]">
          {Math.floor(credits[0] / 12).toLocaleString()}
        </span> animated videos
      </div>
    </div>
  )
}

