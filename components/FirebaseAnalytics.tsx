'use client'

import { useEffect } from 'react'
import { logEvent, Analytics as FirebaseAnalytics } from "firebase/analytics";
import { analytics } from '@/firebaseConfig';

export function Analytics() {
  useEffect(() => {
    if (analytics) {
      logEvent(analytics as FirebaseAnalytics, 'notification_received');
    }
  }, []);

  return null;
}

