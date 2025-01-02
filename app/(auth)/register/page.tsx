// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ArrowRightIcon } from "@radix-ui/react-icons";
// import { SiteHeader } from "@/components/site-header";
// import { auth, db, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "@/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = auth.onIdTokenChanged(async (user) => {
//       if (user) {
//         const idToken = await user.getIdToken();
//         document.cookie = `session=${idToken}; path=/; max-age=${60 * 60 * 24 * 5}; SameSite=Strict; Secure`;
//       } else {
//         document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const createUserDocument = async (uid: string, userData: any) => {
//     try {
//       await setDoc(doc(db, "users", uid), {
//         // Basic Info
//         uid: uid,
//         fullName: userData.fullName,
//         email: userData.email,
//         photoURL: userData.photoURL || null,
//         emailVerified: userData.emailVerified || false,
//         phoneNumber: userData.phoneNumber || null,
        
//         // Account Status & Timestamps
//         lastLoginAt: new Date(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         isActive: true,
//         accountStatus: "active",
        
//         // User Role & Permissions
//         role: "user",
//         permissions: [],
        
//         // Profile Details
//         profile: {
//           bio: "",
//           location: "",
//           company: "",
//           website: "",
//           socialLinks: {
//             twitter: "",
//             linkedin: "",
//             github: ""
//           }
//         },
        
//         // Preferences & Settings
//         preferences: {
//           notifications: {
//             email: true,
//             push: true,
//             marketing: false,
//             newsletter: true
//           },
//           theme: "dark",
//           language: "en",
//           timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
//         },
        
//         // Usage & Analytics
//         usage: {
//           lastActive: new Date(),
//           totalLogins: 1,
//           projectsCreated: 0,
//           storageUsed: 0
//         },
        
//         // Subscription & Billing
//         subscription: {
//           plan: "free",
//           status: "active",
//           startDate: new Date(),
//           trialEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days trial
//         },
        
//         // Security Settings
//         security: {
//           mfaEnabled: false,
//           lastPasswordChange: new Date(),
//           loginAttempts: 0,
//           recoveryEmail: userData.email
//         },
        
//         // Metadata & System Info
//         metadata: {
//           lastSignInTime: new Date(),
//           creationTime: new Date(),
//           lastModified: new Date(),
//           platform: "web",
//           userAgent: navigator.userAgent
//         },
        
//         // Activity Log
//         activityLog: [{
//           action: "account_created",
//           timestamp: new Date(),
//           details: "User account created via email registration"
//         }]
//       });
//     } catch (error: any) {
//       console.error("Error creating user document:", error);
//     }
//   };

//   const handleEmailSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
      
//       await createUserDocument(user.uid, {
//         fullName,
//         email,
//         emailVerified: user.emailVerified,
//         photoURL: user.photoURL,
//         phoneNumber: user.phoneNumber
//       });
//       router.push("/mockup-home");
//     } catch (error: any) {
//       console.error("Registration error:", error);
//       setError(error.message);
//     }
//   };

//   const handleGoogleSignUp = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
      
//       await createUserDocument(user.uid, {
//         fullName: user.displayName,
//         email: user.email,
//         emailVerified: user.emailVerified,
//         photoURL: user.photoURL,
//         phoneNumber: user.phoneNumber
//       });
//       router.push("/mockup-home");
//     } catch (error: any) {
//       console.error("Google signup error:", error);
//       setError(error.message);
//     }
//   };

//   return (
//     <>
//       <SiteHeader />
//       <div className="min-h-screen w-screen overflow-hidden bg-black font-[Poppins] text-[calc(var(--_size)*0.022)] [--_factor:min(1000px,100vh)] [--_size:min(var(--_factor),100vw)]">
//         <div className="relative flex flex-col min-h-screen w-full items-center justify-center px-4 md:px-0">
//           <motion.div
//             className="absolute h-full w-full max-w-[44em]"
//             initial={{ opacity: 0.3, scale: 1.2 }}
//             animate={{ opacity: 0.8, scale: 1.2 }}
//             transition={{ duration: 1, ease: "easeInOut" }}
//           >
//             <motion.div
//               className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
//               initial={{ translateY: "-70%" }}
//               animate={{ translateY: "-64%" }}
//               transition={{ duration: 1, ease: "easeInOut" }}
//             />
//             <motion.div
//               className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
//               initial={{ translateY: "70%" }}
//               animate={{ translateY: "64%" }}
//               transition={{ duration: 1, ease: "easeInOut" }}
//             />
//           </motion.div>

//           <div className="relative z-10 w-full max-w-md space-y-8 p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl">
//             <div className="text-center">
//               <h2 className="text-3xl font-semibold text-[#c8c2bd]">Create Account</h2>
//               <p className="mt-2 text-sm text-[#86868b]">Join us to start creating stunning video ads</p>
//               {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
//             </div>

//             <div className="space-y-4">
//               <Button
//                 variant="outline"
//                 className="w-full bg-transparent border-white/10 text-[#c8c2bd] hover:bg-white/5"
//                 size="lg"
//                 onClick={handleGoogleSignUp}
//               >
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/c/c1/20230822192910%21Google_%22G%22_logo.svg/118px-Google_%22G%22_logo.svg.png" alt="Google" className="mr-2 h-5 w-5" />
//                 Continue with Google
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <span className="w-full border-t border-white/10"></span>
//                 </div>
//                 <div className="relative flex justify-center text-xs uppercase">
//                   <span className="bg-black px-2 text-[#86868b]">Or continue with</span>
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleEmailSignUp} className="space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <Input
//                     type="text"
//                     placeholder="Full name"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     type="email"
//                     placeholder="Email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Button
//                   type="submit"
//                   variant="outline"
//                   className="w-full text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
//                   size="lg"
//                 >
//                   Create Account <ArrowRightIcon className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </form>

//             <div className="text-center text-sm">
//               <p className="text-[#86868b]">
//                 Already have an account?{" "}
//                 <a href="/login" className="text-[#c8c2bd] hover:text-white">
//                   Sign in
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }











// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ArrowRightIcon } from "@radix-ui/react-icons";
// import { SiteHeader } from "@/components/site-header";
// import { 
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   linkWithCredential,
//   AuthCredential
// } from "firebase/auth";
// import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "@/firebaseConfig";

// export default function RegisterPage() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [pendingCred, setPendingCred] = useState<AuthCredential | null>(null);
//   const router = useRouter();
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = auth.onIdTokenChanged(async (user) => {
//       if (user) {
//         const idToken = await user.getIdToken();
//         document.cookie = `session=${idToken}; path=/; max-age=${60 * 60 * 24 * 5}; SameSite=Strict; Secure`;
//       } else {
//         document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleUser = async (user: any, isNewUser = false) => {
//     const userDocRef = doc(db, "users", user.uid);
//     const userDoc = await getDoc(userDocRef);

//     if (!userDoc.exists()) {
//       // New user, create document with credits
//       await setDoc(userDocRef, {
//         uid: user.uid,
//         fullName: user.displayName || fullName,
//         email: user.email,
//         emailVerified: user.emailVerified,
//         photoURL: user.photoURL || null,
//         phoneNumber: user.phoneNumber || null,
//         lastLoginAt: new Date(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         isActive: true,
//         accountStatus: "active",
//         role: "user",
//         permissions: [],
//         credits: 20,
//         hasReceivedInitialCredits: true,
//       });
//       console.log("New user created with 20 credits");
//     } else {
//       // Existing user, update last login and check for credits
//       const userData = userDoc.data();
//       if (!userData.hasReceivedInitialCredits) {
//         // User hasn't received initial credits yet
//         await updateDoc(userDocRef, {
//           lastLoginAt: new Date(),
//           credits: (userData.credits || 0) + 20,
//           hasReceivedInitialCredits: true,
//         });
//         console.log("Existing user logged in and received 20 credits");
//       } else {
//         // User has already received initial credits
//         await updateDoc(userDocRef, {
//           lastLoginAt: new Date(),
//         });
//         console.log("Existing user logged in, no additional credits given");
//       }
//     }

//     if (isNewUser) {
//       console.log("New user registered and logged in");
//     } else {
//       console.log("Existing user logged in");
//     }
//   };

//   const handleEmailSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       await handleUser(userCredential.user, true);
//       router.push("/mockup-home");
//     } catch (error: any) {
//       if (error.code === "auth/email-already-in-use") {
//         setError("Email already in use. Please try logging in instead.");
//       } else {
//         console.error("Registration error:", error);
//         setError(error.message);
//       }
//     }
//   };

//   const handleGoogleSignUp = async () => {
//     setError("");
//     try {
//       const result = await signInWithPopup(auth, new GoogleAuthProvider());
//       await handleUser(result.user);
//       router.push("/mockup-home");
//     } catch (error: any) {
//       console.error("Google signup/signin error:", error);
//       if (error.code === "auth/account-exists-with-different-credential") {
//         // Save the pending credential
//         setPendingCred(error.credential);
//         setError("An account already exists with a different sign-in method. Please choose another method.");
//       } else if (error.code === 'auth/popup-closed-by-user') {
//         setError("Sign-up cancelled. Please try again.");
//       } else if (error.code === 'auth/popup-blocked') {
//         setError("Popup was blocked. Please enable popups for this site and try again.");
//       } else {
//         setError("An error occurred during sign-up. Please try again.");
//       }
//     }
//   };

//   const handleAlternativeSignIn = async (provider: any) => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       if (pendingCred) {
//         await linkWithCredential(result.user, pendingCred);
//         setPendingCred(null);
//       }
//       await handleUser(result.user);
//       router.push("/mockup-home");
//     } catch (error: any) {
//       console.error("Alternative sign-in error:", error);
//       setError("An error occurred during sign-in. Please try again.");
//     }
//   };

//   return (
//     <>
//       <SiteHeader />
//       <div className="min-h-screen w-screen overflow-hidden bg-black font-[Poppins] text-[calc(var(--_size)*0.022)] [--_factor:min(1000px,100vh)] [--_size:min(var(--_factor),100vw)]">
//         <div className="relative flex flex-col min-h-screen w-full items-center justify-center px-4 md:px-0">
//           <motion.div
//             className="absolute h-full w-full max-w-[44em]"
//             initial={{ opacity: 0.3, scale: 1.2 }}
//             animate={{ opacity: 0.8, scale: 1.2 }}
//             transition={{ duration: 1, ease: "easeInOut" }}
//           >
//             <motion.div
//               className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
//               initial={{ translateY: "-70%" }}
//               animate={{ translateY: "-64%" }}
//               transition={{ duration: 1, ease: "easeInOut" }}
//             />
//             <motion.div
//               className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
//               initial={{ translateY: "70%" }}
//               animate={{ translateY: "64%" }}
//               transition={{ duration: 1, ease: "easeInOut" }}
//             />
//           </motion.div>

//           <div className="relative z-10 w-full max-w-md space-y-8 p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl">
//             <div className="text-center">
//               <h2 className="text-3xl font-semibold text-[#c8c2bd]">Create Account</h2>
//               <p className="mt-2 text-sm text-[#86868b]">Join us to start creating stunning video ads</p>
//               {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
//             </div>

//             <div className="space-y-4">
//               <Button
//                 variant="outline"
//                 className="w-full bg-transparent border-white/10 text-[#c8c2bd] hover:bg-white/5"
//                 size="lg"
//                 onClick={handleGoogleSignUp}
//               >
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/c/c1/20230822192910%21Google_%22G%22_logo.svg/118px-Google_%22G%22_logo.svg.png" alt="Google" className="mr-2 h-5 w-5" />
//                 Continue with Google
//               </Button>

//               {pendingCred && (
//                 <Button
//                   variant="outline"
//                   className="w-full bg-transparent border-white/10 text-[#c8c2bd] hover:bg-white/5"
//                   size="lg"
//                   onClick={() => handleAlternativeSignIn(new GoogleAuthProvider())}
//                 >
//                   Sign in with Google to link accounts
//                 </Button>
//               )}

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <span className="w-full border-t border-white/10"></span>
//                 </div>
//                 <div className="relative flex justify-center text-xs uppercase">
//                   <span className="bg-black px-2 text-[#86868b]">Or continue with</span>
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleEmailSignUp} className="space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <Input
//                     type="text"
//                     placeholder="Full name"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     type="email"
//                     placeholder="Email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Button
//                   type="submit"
//                   variant="outline"
//                   className="w-full text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
//                   size="lg"
//                 >
//                   Create Account <ArrowRightIcon className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </form>

//             <div className="text-center text-sm">
//               <p className="text-[#86868b]">
//                 Already have an account?{" "}
//                 <a href="/login" className="text-[#c8c2bd] hover:text-white">
//                   Sign in
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SiteHeader } from "@/components/site-header";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  AuthCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, query, where, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingCred, setPendingCred] = useState<AuthCredential | null>(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        document.cookie = `session=${idToken}; path=/; max-age=${60 * 60 * 24 * 5}; SameSite=Strict; Secure`;
      } else {
        document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUser = async (user: any, isNewUser = false) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    // Check if an existing user with the same email already exists
    const emailQuery = query(collection(db, "users"), where("email", "==", user.email));
    const emailSnapshot = await getDocs(emailQuery);

    if (!userDoc.exists() && emailSnapshot.empty) {
      // New user (no document and no matching email)
      await setDoc(userDocRef, {
        uid: user.uid,
        fullName: user.displayName || fullName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL || null,
        phoneNumber: user.phoneNumber || null,
        lastLoginAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        accountStatus: "active",
        role: "user",
        permissions: [],
        // Change it back to 20 when making it Paid again
        // Step 4
        credits: 100,
        hasReceivedInitialCredits: true,
        subscription: {
          plan: "free",
          renewalPeriod: "monthly" // even though it's free, we can track it monthly
        }
      });
      console.log("New user created with 20 credits");
    } else if (!userDoc.exists() && !emailSnapshot.empty) {
      // Existing user signing up with a new method
      console.log("Email already exists. Updating user UID reference.");
      const existingUserDoc = emailSnapshot.docs[0];
      const existingUserData = existingUserDoc.data();

      // Update the UID of the existing user
      await updateDoc(doc(db, "users", existingUserDoc.id), {
        uid: user.uid,
        lastLoginAt: new Date(),
      });

      console.log("User linked to existing account.");
    } else {
      // Existing user with a valid UID
      const userData = userDoc.data();
        // @ts-ignore
      if (!userData.hasReceivedInitialCredits) {
        await updateDoc(userDocRef, {
          lastLoginAt: new Date(),
          // @ts-ignore
          // Change it back to 20 when making it paid 
          // Step 5
          credits: (userData.credits || 0) + 100,
          hasReceivedInitialCredits: true,
        });
        console.log("Existing user logged in and received 100 credits");
      } else {
        await updateDoc(userDocRef, {
          lastLoginAt: new Date(),
        });
        console.log("Existing user logged in, no additional credits given");
      }
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await handleUser(userCredential.user, true);
      router.push("/mockup-home");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use. Please try logging in instead.");
      } else {
        console.error("Registration error:", error);
        setError(error.message);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      await handleUser(result.user);
      router.push("/mockup-home");
    } catch (error: any) {
      console.error("Google signup/signin error:", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        // Save the pending credential
        setPendingCred(error.credential);
        setError(
          "An account already exists with a different sign-in method. Please choose another method."
        );
      } else if (error.code === "auth/popup-closed-by-user") {
        setError("Sign-up cancelled. Please try again.");
      } else if (error.code === "auth/popup-blocked") {
        setError("Popup was blocked. Please enable popups for this site and try again.");
      } else {
        setError("An error occurred during sign-up. Please try again.");
      }
    }
  };

  const handleAlternativeSignIn = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (pendingCred) {
        // @ts-ignore
        const existingProvider = await auth.fetchSignInMethodsForEmail(result.user.email);
        if (existingProvider.includes("password")) {
          setError(
            "This email is already registered. Please sign in with email and password."
          );
        } else {
          await linkWithCredential(result.user, pendingCred);
          console.log("Accounts successfully linked.");
          setPendingCred(null);
        }
      }
      await handleUser(result.user);
      router.push("/mockup-home");
    } catch (error: any) {
      console.error("Alternative sign-in error:", error);
      setError("An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen w-screen overflow-hidden bg-black font-[Poppins] text-[calc(var(--_size)*0.022)] [--_factor:min(1000px,100vh)] [--_size:min(var(--_factor),100vw)]">
        <div className="relative flex flex-col min-h-screen w-full items-center justify-center px-4 md:px-0">
          <motion.div
            className="absolute h-full w-full max-w-[44em]"
            initial={{ opacity: 0.3, scale: 1.2 }}
            animate={{ opacity: 0.8, scale: 1.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
              initial={{ translateY: "-70%" }}
              animate={{ translateY: "-64%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
              initial={{ translateY: "70%" }}
              animate={{ translateY: "64%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="relative z-10 w-full max-w-md space-y-8 p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-[#c8c2bd]">Create Account</h2>
              <p className="mt-2 text-sm text-[#86868b]">Join us to start creating stunning video ads</p>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
               className="w-full bg-transparent border-white/10 text-[#c8c2bd] hover:bg-white/5"
                size="lg"
                onClick={handleGoogleSignUp}
              >
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/c/c1/20230822192910%21Google_%22G%22_logo.svg/118px-Google_%22G%22_logo.svg.png" alt="Google" className="mr-2 h-5 w-5" />
                {/* <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Logo"
                  className="w-5 h-5 mr-2"
                /> */}
                Sign up with Google
              </Button>

              <div className="relative">
                 <div className="absolute inset-0 flex items-center">
                   <span className="w-full border-t border-white/10"></span>
                </div>
               <div className="relative flex justify-center text-xs uppercase">
                   <span className="bg-black px-2 text-[#86868b]">Or continue with</span>
               </div>
              </div>
              </div>

              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
                  required
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
                  required
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
                  required
                />
                <Button type="submit" variant="outline" size="lg"   className="w-full text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none p-5">
                  Create Account <ArrowRightIcon className="ml-2" />
                </Button>
                <div className="text-center text-sm">
            
            <p className="mt-2 text-[#86868b]">
              Already have an account?{" "}
             <a href="/login" className="text-[#c8c2bd] hover:text-white">
             Login
            </a>
          </p>
         </div>
              </form>
              
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}
