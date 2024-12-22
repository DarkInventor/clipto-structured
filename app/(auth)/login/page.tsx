"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SiteHeader } from "@/components/site-header";
import { auth, db } from "@/firebaseConfig";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const updateUserDocument = async (user: any) => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        lastLoginAt: new Date(),
        updatedAt: new Date(),
        emailVerified: user.emailVerified,
        photoURL: user.photoURL || null,
        phoneNumber: user.phoneNumber || null,
        metadata: {
          lastSignInTime: new Date()
        }
      });
    } catch (error: any) {
      console.error("Error updating user document:", error);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      // Create session cookie on server
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ idToken }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create session');
      }

      await updateUserDocument(userCredential.user);
      router.push("/mockup-home");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      
      // Create session cookie on server
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ idToken }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create session');
      }

      await updateUserDocument(userCredential.user);
      router.push("/mockup-home");
    } catch (error: any) {
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
              <h2 className="text-3xl font-semibold text-[#c8c2bd]">Welcome Back</h2>
              <p className="mt-2 text-sm text-[#86868b]">Sign in to continue creating stunning video ads</p>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full bg-transparent border-white/10 text-[#c8c2bd] hover:bg-white/5"
                size="lg"
                onClick={handleGoogleSignIn}
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

            <form onSubmit={handleEmailSignIn} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-white/10 text-[#c8c2bd] placeholder:text-[#86868b] p-5"
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
                  Sign in <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="text-center text-sm">
              <a href="#" className="text-[#86868b] hover:text-[#c8c2bd]">
                Forgot your password?
              </a>
              <p className="mt-2 text-[#86868b]">
                Don't have an account?{" "}
                <a href="/register" className="text-[#c8c2bd] hover:text-white">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
