// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ArrowRightIcon } from "@radix-ui/react-icons";
// import { SiteHeader } from "@/components/site-header";
// import { auth, db } from "@/firebaseConfig";
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const createUserDocument = async (uid: string, userData: any) => {
//     try {
//       await setDoc(doc(db, "users", uid), {
//         uid: uid,
//         fullName: userData.fullName,
//         email: userData.email,
//         photoURL: userData.photoURL || null,
//         emailVerified: userData.emailVerified || false,
//         phoneNumber: userData.phoneNumber || null,
//         lastLoginAt: new Date(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         isActive: true,
//         role: "user",
//         preferences: {
//           notifications: true,
//           marketing: false
//         },
//         metadata: {
//           lastSignInTime: new Date(),
//           creationTime: new Date()
//         }
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
//       const idToken = await user.getIdToken();
      
//       // Create session cookie on server
//       const response = await fetch('/api/session', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${idToken}` // Add token to headers
//         },
//         body: JSON.stringify({ idToken }),
//         credentials: 'include' // Include cookies in request
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to create session');
//       }

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
//       const idToken = await user.getIdToken();
      
//       // Create session cookie on server
//       const response = await fetch('/api/session', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${idToken}` // Add token to headers
//         },
//         body: JSON.stringify({ idToken }),
//         credentials: 'include' // Include cookies in request
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to create session');
//       }

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


"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SiteHeader } from "@/components/site-header";
import { auth, db, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        document.cookie = `session=${idToken}; path=/; max-age=${60 * 60 * 24 * 5}; SameSite=Strict; Secure`;
      } else {
        document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    });

    return () => unsubscribe();
  }, []);

  const createUserDocument = async (uid: string, userData: any) => {
    try {
      await setDoc(doc(db, "users", uid), {
        // Basic Info
        uid: uid,
        fullName: userData.fullName,
        email: userData.email,
        photoURL: userData.photoURL || null,
        emailVerified: userData.emailVerified || false,
        phoneNumber: userData.phoneNumber || null,
        
        // Account Status & Timestamps
        lastLoginAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        accountStatus: "active",
        
        // User Role & Permissions
        role: "user",
        permissions: [],
        
        // Profile Details
        profile: {
          bio: "",
          location: "",
          company: "",
          website: "",
          socialLinks: {
            twitter: "",
            linkedin: "",
            github: ""
          }
        },
        
        // Preferences & Settings
        preferences: {
          notifications: {
            email: true,
            push: true,
            marketing: false,
            newsletter: true
          },
          theme: "dark",
          language: "en",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        
        // Usage & Analytics
        usage: {
          lastActive: new Date(),
          totalLogins: 1,
          projectsCreated: 0,
          storageUsed: 0
        },
        
        // Subscription & Billing
        subscription: {
          plan: "free",
          status: "active",
          startDate: new Date(),
          trialEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days trial
        },
        
        // Security Settings
        security: {
          mfaEnabled: false,
          lastPasswordChange: new Date(),
          loginAttempts: 0,
          recoveryEmail: userData.email
        },
        
        // Metadata & System Info
        metadata: {
          lastSignInTime: new Date(),
          creationTime: new Date(),
          lastModified: new Date(),
          platform: "web",
          userAgent: navigator.userAgent
        },
        
        // Activity Log
        activityLog: [{
          action: "account_created",
          timestamp: new Date(),
          details: "User account created via email registration"
        }]
      });
    } catch (error: any) {
      console.error("Error creating user document:", error);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await createUserDocument(user.uid, {
        fullName,
        email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber
      });
      router.push("/mockup-home");
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      await createUserDocument(user.uid, {
        fullName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber
      });
      router.push("/mockup-home");
    } catch (error: any) {
      console.error("Google signup error:", error);
      setError(error.message);
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
                Continue with Google
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

            <form onSubmit={handleEmailSignUp} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
                    required
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
                  size="lg"
                >
                  Create Account <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="text-center text-sm">
              <p className="text-[#86868b]">
                Already have an account?{" "}
                <a href="/login" className="text-[#c8c2bd] hover:text-white">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}