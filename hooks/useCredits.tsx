
// import { useState, useEffect } from 'react';
// import { auth, db } from '@/firebaseConfig';
// import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

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
//       async (doc) => {
//         if (doc.exists()) {
//           const userData = doc.data();
          
//           // Check if this is a new registration (user has credits but lastLoginAt is recent)
//           const isNewRegistration = userData.credits === 20 && 
//             userData.lastLoginAt && 
//             (new Date().getTime() - userData.lastLoginAt.toDate().getTime()) < 60000; // Within last minute

//           if (isNewRegistration) {
//             // Reset credits to 0 for new registration
//             try {
//               await updateDoc(userDocRef, { 
//                 credits: 0,
//                 hasResetCredits: true // Flag to ensure we only do this once
//               });
//               setCredits(0);
//             } catch (err) {
//               console.error('Error resetting credits:', err);
//               setError(new Error('Failed to reset credits'));
//             }
//           } else {
//             // Normal case: set credits from user data
//             setCredits(userData.credits || 0);
//           }
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

// import { useState, useEffect } from 'react';
// import { auth, db } from '../firebaseConfig';
// import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

// interface CreditsHookResult {
//   credits: number | null;
//   loading: boolean;
//   error: Error | null;
//   plan: 'Free' | 'Hobby' | 'Creator' | 'Pro';
// }

// const useCredits = (): CreditsHookResult => {
//   const [credits, setCredits] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [plan, setPlan] = useState<'Free' | 'Hobby' | 'Creator' | 'Pro'>('Free');

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (!user) {
//       setError(new Error('No authenticated user'));
//       setLoading(false);
//       return;
//     }

//     const userDocRef = doc(db, 'users', user.uid);
    
//     const unsubscribe = onSnapshot(userDocRef, 
//       async (doc) => {
//         if (doc.exists()) {
//           const userData = doc.data();
          
//           // Check if this is a new registration (user has credits but lastLoginAt is recent)
//           const isNewRegistration = userData.credits === 20 && 
//             userData.lastLoginAt && 
//             (new Date().getTime() - userData.lastLoginAt.toDate().getTime()) < 60000; // Within last minute

//           if (isNewRegistration) {
//             // Reset credits to 0 for new registration
//             try {
//               await updateDoc(userDocRef, { 
//                 credits: 0,
//                 hasResetCredits: true // Flag to ensure we only do this once
//               });
//               setCredits(0);
//             } catch (err) {
//               console.error('Error resetting credits:', err);
//               setError(err instanceof Error ? err : new Error('Failed to reset credits'));
//             }
//           } else {
//             // Normal case: set credits from user data
//             setCredits(userData.credits || 0);
//           }
          
//           // Set the user's plan
//           setPlan(userData.subscription?.plan || 'Free');
//         } else {
//           setError(new Error('User document not found'));
//         }
//         setLoading(false);
//       },
//       (err) => {
//         console.error('Error fetching credits:', err);
//         setError(err instanceof Error ? err : new Error('An error occurred'));
//         setLoading(false);
//       }
//     );

//     // Cleanup function to unsubscribe from the listener when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   return { credits, loading, error, plan };
// };

// export default useCredits;

import { useState, useEffect } from 'react';
import { auth, db } from '@/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

export function useCredits() {
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [plan, setPlan] = useState<'free' | 'hobby' | 'creator' | 'pro'>('free');

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError(new Error('No authenticated user'));
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    
    const unsubscribe = onSnapshot(userDocRef, 
      (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          console.log('Fetched user data:', userData); 
          setCredits(userData.credits || 0);
          setPlan(userData.subscription?.plan || 'Free');
        } else {
          setError(new Error('User document not found'));
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching credits:', err);
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  console.log('useCredits hook returning:', { credits, loading, error, plan });
  return { credits, loading, error, plan };
}

