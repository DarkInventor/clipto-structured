// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ArrowRightIcon } from "@radix-ui/react-icons";
// import { SiteHeader } from "@/components/site-header";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "@/firebaseConfig";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();
//   // @ts-ignore
//   const searchParams = useSearchParams();
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = auth.onIdTokenChanged(async (user) => {
//       if (user) {
//         const idToken = await user.getIdToken();
//         document.cookie = `session=${idToken}; path=/; max-age=${60 * 60 * 24 * 5}; SameSite=Strict; Secure`;
//       } else {
//         document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleUser = async (user: any) => {
//     const userDocRef = doc(db, "users", user.uid);
//     const userDoc = await getDoc(userDocRef);

//     if (userDoc.exists()) {
//       await updateDoc(userDocRef, {
//         lastLoginAt: new Date(),
//       });
//       console.log("User logged in successfully");
//     } else {
//       console.error("User document does not exist");
//       setError("User account not found. Please register.");
//     }
//   };

//   const redirectAfterLogin = () => {
//     // @ts-ignore
//     const from = searchParams.get('from');
//     if (from === 'pricing') {
//       router.push('/#pricing');
//     } else {
//       router.push('/mockup-home');
//     }
//   };

//   const handleEmailLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       await handleUser(userCredential.user);
//       redirectAfterLogin();
//     } catch (error: any) {
//       console.error("Login error:", error);
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setError("");
//     try {
//       const result = await signInWithPopup(auth, new GoogleAuthProvider());
//       await handleUser(result.user);
//       redirectAfterLogin();
//     } catch (error: any) {
//       console.error("Google login error:", error);
//       if (error.code === "auth/popup-closed-by-user") {
//         setError("Login cancelled. Please try again.");
//       } else if (error.code === "auth/popup-blocked") {
//         setError("Popup was blocked. Please enable popups for this site and try again.");
//       } else {
//         setError("An error occurred during login. Please try again.");
//       }
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
//               <h2 className="text-3xl font-semibold text-[#c8c2bd]">Login</h2>
//               <p className="mt-2 text-sm text-[#86868b]">Welcome back! Please login to your account</p>
//               {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
//             </div>

//             <div className="space-y-4">
//               <Button
//                 variant="outline"
//                 className="w-full bg-transparent border-white/10 text-[#c8c2bd] hover:bg-white/5"
//                 size="lg"
//                 onClick={handleGoogleLogin}
//               >
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/c/c1/20230822192910%21Google_%22G%22_logo.svg/118px-Google_%22G%22_logo.svg.png" alt="Google" className="mr-2 h-5 w-5" />
//                 Login with Google
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

//             <form onSubmit={handleEmailLogin} className="space-y-4">
//               <Input
//                 placeholder="Email Address"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
//                 required
//               />
//               <Input
//                 placeholder="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
//                 required
//               />
//               <Button type="submit" variant="outline" size="lg" className="w-full text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none p-5">
//                 Login <ArrowRightIcon className="ml-2" />
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SiteHeader } from "@/components/site-header";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// Separate component for search params logic
function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
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

  const handleUser = async (user: any) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      await updateDoc(userDocRef, {
        lastLoginAt: new Date(),
      });
      console.log("User logged in successfully");
    } else {
      console.error("User document does not exist");
      setError("User account not found. Please register.");
    }
  };

  const redirectAfterLogin = () => {
    // @ts-ignore
    const from = searchParams.get('from');
    if (from === 'pricing') {
      router.push('/#pricing');
    } else {
      router.push('/mockup-home');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleUser(userCredential.user);
      redirectAfterLogin();
    } catch (error: any) {
      console.error("Login error:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      await handleUser(result.user);
      redirectAfterLogin();
    } catch (error: any) {
      console.error("Google login error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        setError("Login cancelled. Please try again.");
      } else if (error.code === "auth/popup-blocked") {
        setError("Popup was blocked. Please enable popups for this site and try again.");
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md space-y-8 p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-[#c8c2bd]">Login</h2>
        <p className="mt-2 text-sm text-[#86868b]">Welcome back! Please login to your account</p>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full bg-transparent border-white/10 text-[#c8c2bd] hover:bg-white/5"
          size="lg"
          onClick={handleGoogleLogin}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/c/c1/20230822192910%21Google_%22G%22_logo.svg/118px-Google_%22G%22_logo.svg.png" alt="Google" className="mr-2 h-5 w-5" />
          Login with Google
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

      <form onSubmit={handleEmailLogin} className="space-y-4">
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
        <Button type="submit" variant="outline" size="lg" className="w-full text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none p-5">
          Login <ArrowRightIcon className="ml-2" />
        </Button>
      </form>
    </div>
  );
}

// Main component with Suspense boundary
export default function LoginPage() {
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

          <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
          </Suspense>
        </div>
      </div>
    </>
  );
}