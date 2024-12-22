import React, { useState } from 'react';
import { Scene } from '../types';
import { aspectRatios, durationOptions } from '@/constants';
import { cn } from '@/lib/utils';
import { SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons';

interface ConfigurationPanelProps {
  selectedAspectRatio: { name: string; value: string; width: number; height: number };
  setSelectedAspectRatio: React.Dispatch<React.SetStateAction<{ name: string; value: string; width: number; height: number }>>;
  selectedDuration: number;
  setSelectedDuration: React.Dispatch<React.SetStateAction<number>>; // Fixed type
  adTitle: string;
  setAdTitle: React.Dispatch<React.SetStateAction<string>>;
  adDescription: string;
  setAdDescription: React.Dispatch<React.SetStateAction<string>>;
  audioVolume: number;
  isMuted: boolean;
  handleVolumeChange: (volume: number) => void;
  toggleMute: () => void;
  scenes: Scene[];
  dispatch: React.Dispatch<any>;
  backgroundColor: string;
  setBackgroundColor: (value: string | ((prevColor: string) => string)) => void;

}

export default function ConfigurationPanel({
  selectedAspectRatio,
  setSelectedAspectRatio,
  selectedDuration,
  setSelectedDuration,
  adTitle,
  setAdTitle,
  adDescription,
  setAdDescription,
  audioVolume,
  isMuted,
  handleVolumeChange,
  toggleMute,
  scenes,
  dispatch,
  backgroundColor,
  setBackgroundColor,
}: ConfigurationPanelProps) {

  // Add local state for color
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBackgroundColor(newColor);
    // You may want to add this to your global state or pass it up to parent component
    console.log('Selected color:', newColor);
  };

  return (
    <div className="p-8 text-[#bdc2c9] overflow-hidden">
      <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent">Brand & Audio Settings</h2>
      
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-sm shadow-lg">
          <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-4">Video Duration</h3>
          <div className="grid grid-rows-2 gap-3">
            <div className="grid grid-cols-2 gap-3">
              {durationOptions.slice(0, 2).map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (![10, 30, 60].includes(option.value)) {
                      setSelectedDuration(option.value)
                    }
                  }}
                  className={cn(
                    "py-1 px-1 rounded-xl text-sm font-medium transition-all duration-300",
                    "border",
                    selectedDuration === option.value
                      ? "bg-[#e7dfd6]/20 border-[#e7dfd6]/30 text-[#e7dfd6] shadow-lg shadow-[#e7dfd6]/10"
                      : [10, 30, 60].includes(option.value)
                        ? "bg-black/30 border-gray-800 text-[#86868b]"
                        : "bg-black/30 border-white/10 text-[#86868b] hover:border-[#e7dfd6]/30 hover:text-[#e7dfd6]/70",
                    [10, 30, 60].includes(option.value) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {[10, 30, 60].includes(option.value) ? `${option.label} (Coming Soon)` : option.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {durationOptions.slice(2, 4).map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (![10, 30, 60].includes(option.value)) {
                      setSelectedDuration(option.value)
                    }
                  }}
                  className={cn(
                    "py-1 px-1 rounded-xl text-sm font-medium transition-all duration-300",
                    "border",
                    selectedDuration === option.value
                      ? "bg-[#e7dfd6]/20 border-[#e7dfd6]/30 text-[#e7dfd6] shadow-lg shadow-[#e7dfd6]/10"
                      : [10, 30, 60].includes(option.value)
                        ? "bg-black/30 border-gray-800 text-[#86868b]"
                        : "bg-black/30 border-white/10 text-[#86868b] hover:border-[#e7dfd6]/30 hover:text-[#e7dfd6]/70",
                    [10, 30, 60].includes(option.value) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {[10, 30, 60].includes(option.value) ? `${option.label} (Coming Soon)` : option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-b from-black/40 to-black/20  backdrop-blur-sm shadow-lg">
          <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-3">Aspect Ratio</h3>
          <select 
            className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-[#bdc2c9]
              focus:border-[#e7dfd6] focus:ring-1 focus:ring-[#e7dfd6] focus:outline-none
              transition-colors duration-200"
            value={selectedAspectRatio.value}
            onChange={(e) => {
              const newAspectRatio = aspectRatios.find(ar => ar.value === e.target.value);
              if (newAspectRatio) setSelectedAspectRatio(newAspectRatio);
            }}
          >
            {aspectRatios.map((ar) => (
              <option key={ar.value} value={ar.value}>{ar.name}</option>
            ))}
          </select>
        </div>

        <div className="rounded-xl bg-gradient-to-b from-black/40 to-black/20  backdrop-blur-sm shadow-lg p-4">
          <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-3">Background Color</h3>
          <div className="flex items-center gap-4">
            <input 
              type="color"
              value={backgroundColor}
              onChange={handleColorChange}
              className="w-20 h-10 rounded-lg cursor-pointer bg-transparent"
            />
            <div 
              className="flex-1 h-10 rounded-lg border border-white/10 flex items-center justify-center"
              style={{ backgroundColor }}
            >
              <span className="text-white text-sm font-mono">
              {backgroundColor.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-b from-black/40 to-black/20  backdrop-blur-sm shadow-lg">
          <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-3">Title Text</h3>
          <input 
            type="text"
            placeholder="Enter your title"
            className="w-full p-2.5 rounded-lg bg-black/50  text-[#bdc2c9] border
              placeholder:text-[#86868b] focus:border-[#e7dfd6] focus:ring-1 focus:ring-[#e7dfd6] border-white/10
              focus:outline-none transition-colors duration-200 border-white/10"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
          />
        </div>

        <div className="rounded-xl bg-gradient-to-b from-black/40 to-black/20  backdrop-blur-sm shadow-lg">
          <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent mb-3">Subtitle Text</h3>
          <input 
            type="text"
            placeholder="Enter your subtitle"
            className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-[#bdc2c9]
              placeholder:text-[#86868b] focus:border-[#e7dfd6] focus:ring-1 focus:ring-[#e7dfd6]
              focus:outline-none transition-colors duration-200"
            value={adDescription}
            onChange={(e) => setAdDescription(e.target.value)}
          />
        </div>

        <div className=" rounded-xl bg-gradient-to-b from-black/40 to-black/20  backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium bg-gradient-to-r from-[#e7dfd6] to-[#bdc2c9] bg-clip-text text-transparent">Audio Volume</h3>
            <button 
              onClick={toggleMute}
              className={cn(
                "p-2 rounded-lg transition-colors duration-200",
                "hover:bg-white/5 active:bg-white/10",
                "focus:outline-none focus:ring-2 focus:ring-[#e7dfd6]"
              )}
            >
              {isMuted ? 
                <SpeakerOffIcon className="w-5 h-5 text-[#86868b]" /> : 
                <SpeakerLoudIcon className="w-5 h-5 text-[#e7dfd6]" />
              }
            </button>
          </div>
          <input 
            type="range"
            className="w-full h-1 cursor-pointer bg-white/10 rounded-full accent-[#e7dfd6]"
            min="0"
            max="1"
            step="0.1"
            value={audioVolume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
