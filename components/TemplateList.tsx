import React from 'react';
import { motion } from 'framer-motion';
import { PlayIcon } from '@radix-ui/react-icons';

interface Template {
  title: string;
  duration: string;
  effect: 'angled' | 'quickTeaser' | 'laptop' | 'dynamicShowcase' | 'imageShowcase' | 'floatingSpotlight';
}

interface TemplateListProps {
  selectedTemplate: string;
  onSelectTemplate: (template: Template) => void;
}

export default function TemplateList({ selectedTemplate, onSelectTemplate }: TemplateListProps) {
  const templates: Template[] = [
    { title: 'Angled Presentation', duration: '00:05', effect: 'angled' },
    { title: 'Quick Teaser', duration: '00:05', effect: 'quickTeaser' },
    { title: 'Laptop View', duration: '00:05', effect: 'laptop' },
    { title: 'Dynamic Showcase', duration: '00:05', effect: 'dynamicShowcase' },
    { title: 'Floating Spotlight', duration: '00:05', effect: 'floatingSpotlight' },
    // { title: 'Image Showcase', duration: '', effect: 'imageShowcase' },
  ];

  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-semibold mb-6 text-[#e7dfd6]">Animation Templates</h2>
      <div className="space-y-3">
        {templates.map((template, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => onSelectTemplate(template)}
              className={`w-full group relative overflow-hidden rounded-lg border
                ${selectedTemplate === template.title ? 
                  'border-white/10 bg-gradient-to-r from-[#bdc2c9]/20 to-[#e7dfd6]/20' : 
                  'border-white/10 hover:border-[#bdc2c9]/30 bg-black/30 hover:bg-gradient-to-r hover:from-[#86868b]/20 hover:to-[#bdc2c9]/20'
                }
                transition-all duration-300 ease-in-out`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium transition-colors
                      ${selectedTemplate === template.title ? 
                        'text-[#e7dfd6]' : 
                        'text-[#bdc2c9] group-hover:text-[#e7dfd6]'
                      }`}
                    >
                      {template.title}
                    </h3>
                    <p className="text-sm text-[#86868b] group-hover:text-[#bdc2c9] transition-colors flex justify-start items-start mt-1">
                      {template.duration}
                    </p>
                  </div>
                  <div className={`rounded-full p-2 transition-colors
                    ${selectedTemplate === template.title ?
                      'bg-[#e7dfd6]/20 text-[#e7dfd6]' :
                      'bg-[#86868b]/20 text-[#86868b] group-hover:bg-[#bdc2c9]/20 group-hover:text-[#bdc2c9]'
                    }`}
                  >
                    <PlayIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              {/* Animated Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#bdc2c9]/5 to-transparent" />
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
