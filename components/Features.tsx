import React from 'react';
import { VideoIcon, Pencil1Icon } from '@radix-ui/react-icons';

const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
  </svg>
);

const features = [
  {
    name: 'Easy-to-use templates',
    description: 'Choose from a variety of professional templates to kickstart your video ad creation.',
    icon: VideoIcon,
  },
  {
    name: 'Customizable content',
    description: 'Easily edit text, images, and videos to create a unique ad that fits your brand.',
    icon: Pencil1Icon,
  },
  {
    name: 'Cloud rendering',
    description: 'Render your video ads in the cloud, saving time and computational resources.',
    icon: CloudIcon,
  },
];

export default function Features() {
  // ... (rest of the component remains the same)
}

