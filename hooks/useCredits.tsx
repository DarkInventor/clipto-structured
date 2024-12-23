// import { useState, useEffect } from 'react';
// import { auth, db } from '@/firebaseConfig';
// import { doc, onSnapshot } from 'firebase/firestore';

// export function useCredits() {
//   const [credits, setCredits] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (!user) {
//       setError(new Error('No authenticated user'));
//       setLoading(false);
//       return;
//     }

//     const userDocRef = doc(db, 'users', user.uid);
    
//     const unsubscribe = onSnapshot(userDocRef, 
//       (doc) => {
//         if (doc.exists()) {
//           const userData = doc.data();
//           setCredits(userData.credits || 0);
//         } else {
//           setError(new Error('User document not found'));
//         }
//         setLoading(false);
//       },
//       (err) => {
//         console.error('Error fetching credits:', err);
//         setError(err);
//         setLoading(false);
//       }
//     );

//     // Cleanup function to unsubscribe from the listener when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   return { credits, loading, error };
// }

import { useState, useEffect } from 'react';
import { auth, db } from '@/firebaseConfig';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

export function useCredits() {
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError(new Error('No authenticated user'));
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    
    const unsubscribe = onSnapshot(userDocRef, 
      async (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          
          // Check if this is a new registration (user has credits but lastLoginAt is recent)
          const isNewRegistration = userData.credits === 20 && 
            userData.lastLoginAt && 
            (new Date().getTime() - userData.lastLoginAt.toDate().getTime()) < 60000; // Within last minute

          if (isNewRegistration) {
            // Reset credits to 0 for new registration
            try {
              await updateDoc(userDocRef, { 
                credits: 0,
                hasResetCredits: true // Flag to ensure we only do this once
              });
              setCredits(0);
            } catch (err) {
              console.error('Error resetting credits:', err);
              setError(new Error('Failed to reset credits'));
            }
          } else {
            // Normal case: set credits from user data
            setCredits(userData.credits || 0);
          }
        } else {
          setError(new Error('User document not found'));
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching credits:', err);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return { credits, loading, error };
}

