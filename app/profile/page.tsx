// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
// import { SiteHeader } from "@/components/site-header";
// import { auth, db } from "@/firebaseConfig";
// import { doc, getDoc, collection, query, where, orderBy, limit, getDocs, updateDoc } from "firebase/firestore";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//   const [userData, setUserData] = useState<any>(null);
//   const [paymentData, setPaymentData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth.currentUser;
//       if (!user) {
//         router.push('/login');
//         return;
//       }

//       try {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         if (userDoc.exists()) {
//           const userDataFromFirestore = userDoc.data();
//           console.log("User data:", userDataFromFirestore);
//           setUserData(userDataFromFirestore);

//           // Fetch the latest payment information
//           const paymentsQuery = query(
//             collection(db, "payments"),
//             where("userId", "==", user.uid),
//             orderBy("createdAt", "desc"),
//             limit(1)
//           );
//           const paymentsSnapshot = await getDocs(paymentsQuery);
//           if (!paymentsSnapshot.empty) {
//             const paymentDataFromFirestore = paymentsSnapshot.docs[0].data();
//             console.log("Payment data:", paymentDataFromFirestore);
//             setPaymentData(paymentDataFromFirestore);
//           } else {
//             console.log("No payment data found");
//           }
//         } else {
//           console.log("No user document found");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [router]);

//   const handleCancelSubscription = async () => {
//     if (!userData || !paymentData) return;

//     try {
//       const response = await fetch('/api/cancel-subscription', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: auth.currentUser?.uid }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(result.message);
        
//         // Update local state
//         setUserData((prevData: any) => ({
//           ...prevData,
//           subscription: { plan: 'free' },
//           credits: 20
//         }));

//         // Update Firestore
//         const userRef = doc(db, "users", auth.currentUser!.uid);
//         await updateDoc(userRef, {
//           'subscription.plan': 'free',
//           credits: 20
//         });

//         // Refresh payment data
//         const paymentsQuery = query(
//           collection(db, "payments"),
//           where("userId", "==", auth.currentUser!.uid),
//           orderBy("createdAt", "desc"),
//           limit(1)
//         );
//         const paymentsSnapshot = await getDocs(paymentsQuery);
//         if (!paymentsSnapshot.empty) {
//           setPaymentData(paymentsSnapshot.docs[0].data());
//         }
//       } else {
//         throw new Error('Failed to cancel subscription');
//       }
//     } catch (error) {
//       console.error('Error cancelling subscription:', error);
//       alert('Failed to cancel subscription. Please try again.');
//     }
//   };

//   if (loading) {
//     return <div className="min-h-screen bg-black flex items-center justify-center">
//       <div className="text-[#c8c2bd]">Loading...</div>
//     </div>;
//   }

//   const formatDate = (date: any) => {
//     if (!date) return 'N/A';
//     return new Date(date.seconds * 1000).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <>
//       <SiteHeader />
//       <div className="min-h-screen w-screen overflow-hidden bg-black font-[Poppins] text-[calc(var(--_size)*0.022)] [--_factor:min(1000px,100vh)] [--_size:min(var(--_factor),100vw)] py-20">
//         <div className="relative flex flex-col min-h-screen w-full items-center justify-center px-4 md:px-0">
//           <div className="absolute top-0 left-4 md:left-8 z-20">
//             <Button
//               variant="outline"
//               className="bg-transparent border-white/10 text-[#c8c2bd] hover:bg-white/5 py-2 px-4"
//               size="lg"
//               onClick={() => router.back()}
//             >
//               <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
//             </Button>
//           </div>

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

//           <div className="relative z-10 w-full max-w-4xl space-y-8 p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl">
//             <div className="text-center">
//               <h2 className="text-3xl font-semibold text-[#c8c2bd]">Profile</h2>
//               <p className="mt-2 text-sm text-[#86868b]">Manage your account settings and preferences</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <h3 className="text-xl font-medium text-[#c8c2bd]">Basic Information</h3>
//                   <div className="space-y-4 p-4 rounded-lg border border-white/10">
//                     <div>
//                       <label className="text-sm text-[#86868b]">Full Name</label>
//                       <div className="text-[#c8c2bd]">{userData?.fullName || 'N/A'}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Email</label>
//                       <div className="text-[#c8c2bd]">{userData?.email || 'N/A'}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Account Status</label>
//                       <div className="text-[#c8c2bd] capitalize">{userData?.accountStatus || 'N/A'}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Role</label>
//                       <div className="text-[#c8c2bd] capitalize">{userData?.role || 'N/A'}</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <h3 className="text-xl font-medium text-[#c8c2bd]">Subscription</h3>
//                   <div className="space-y-4 p-4 rounded-lg border border-white/10">
//                     <div>
//                       <label className="text-sm text-[#86868b]">Current Plan</label>
//                       <div className="text-[#c8c2bd] capitalize">{userData?.subscription?.plan || 'N/A'}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Credits</label>
//                       <div className="text-[#c8c2bd]">{userData?.credits || 'N/A'}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Start Date</label>
//                       <div className="text-[#c8c2bd]">{formatDate(paymentData?.startDate)}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">End Date</label>
//                       <div className="text-[#c8c2bd]">{formatDate(paymentData?.endDate)}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Next Billing On</label>
//                       <div className="text-[#c8c2bd]">
//                         {formatDate(paymentData?.endDate)}
//                       </div>
//                     </div>
//                     {userData?.subscription?.plan && userData.subscription.plan !== 'free' && (
//                       <Button
//                         variant="destructive"
//                         className="mt-4 w-full"
//                         onClick={handleCancelSubscription}
//                       >
//                         Cancel Subscription
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <h3 className="text-xl font-medium text-[#c8c2bd]">Preferences</h3>
//                   <div className="space-y-4 p-4 rounded-lg border border-white/10">
//                     <div>
//                       <label className="text-sm text-[#86868b]">Theme</label>
//                       <div className="text-[#c8c2bd] capitalize">{userData?.preferences?.theme || 'N/A'}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Language</label>
//                       <div className="text-[#c8c2bd] uppercase">{userData?.preferences?.language || 'N/A'}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Timezone</label>
//                       <div className="text-[#c8c2bd]">{userData?.preferences?.timezone || 'N/A'}</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <h3 className="text-xl font-medium text-[#c8c2bd]">Usage Statistics</h3>
//                   <div className="space-y-4 p-4 rounded-lg border border-white/10">
//                     {/* <div>
//                       <label className="text-sm text-[#86868b]">Projects Created</label>
//                       <div className="text-[#c8c2bd]">{userData?.usage?.projectsCreated || 'N/A'}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Storage Used</label>
//                       <div className="text-[#c8c2bd]">{userData?.usage?.storageUsed ? `${userData.usage.storageUsed} MB` : 'N/A'}</div>
//                     </div> */}
//                     <div>
//                       <label className="text-sm text-[#86868b]">Last Active</label>
//                       <div className="text-[#c8c2bd]">{formatDate(userData?.lastLoginAt)}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Total Logins</label>
//                       <div className="text-[#c8c2bd]">{userData?.usage?.totalLogins || 'N/A'}</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <h3 className="text-xl font-medium text-[#c8c2bd]">Security</h3>
//                   <div className="space-y-4 p-4 rounded-lg border border-white/10">
//                     <div>
//                       <label className="text-sm text-[#86868b]">Last Password Change</label>
//                       <div className="text-[#c8c2bd]">{formatDate(userData?.security?.lastPasswordChange)}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">MFA Enabled</label>
//                       <div className="text-[#c8c2bd]">{userData?.security?.mfaEnabled ? 'Yes' : 'No'}</div>
//                     </div>
//                     <div>
//                       <label className="text-sm text-[#86868b]">Recovery Email</label>
//                       <div className="text-[#c8c2bd]">{userData?.security?.recoveryEmail || 'N/A'}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center pt-6">
//               <Button
//                 variant="outline"
//                 className="text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
//                 size="lg"
//                 onClick={() => router.push('/mockup-home')}
//               >
//                 Go to Dashboard <ArrowRightIcon className="ml-2 h-4 w-4" />
//               </Button>
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
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { SiteHeader } from "@/components/site-header";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userDataFromFirestore = userDoc.data();
          console.log("User data:", userDataFromFirestore);
          setUserData(userDataFromFirestore);

          // Fetch the latest payment information
          const paymentsQuery = query(
            collection(db, "payments"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc"),
            limit(1)
          );
          const paymentsSnapshot = await getDocs(paymentsQuery);
          if (!paymentsSnapshot.empty) {
            const paymentDataFromFirestore = paymentsSnapshot.docs[0].data();
            console.log("Payment data:", paymentDataFromFirestore);
            setPaymentData(paymentDataFromFirestore);
          } else {
            console.log("No payment data found");
          }
        } else {
          console.log("No user document found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleCancelSubscription = async () => {
    if (!userData || !paymentData) return;

    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: auth.currentUser?.uid }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update local state
        setUserData((prevData: any) => ({
          ...prevData,
          subscription: { plan: 'free' },
          credits: 20
        }));

        // Update Firestore
        const userRef = doc(db, "users", auth.currentUser!.uid);
        await updateDoc(userRef, {
          'subscription.plan': 'free',
          credits: 20
        });

        // Refresh payment data
        const paymentsQuery = query(
          collection(db, "payments"),
          where("userId", "==", auth.currentUser!.uid),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const paymentsSnapshot = await getDocs(paymentsQuery);
        if (!paymentsSnapshot.empty) {
          setPaymentData(paymentsSnapshot.docs[0].data());
        }

        // Redirect to landing page
        router.push('/');
      } else {
        throw new Error('Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      setErrorMessage('Failed to cancel subscription. Please try again.');
      setIsErrorDialogOpen(true);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-[#c8c2bd]">Loading...</div>
    </div>;
  }

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    return new Date(date.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen w-screen overflow-hidden bg-black font-[Poppins] text-[calc(var(--_size)*0.022)] [--_factor:min(1000px,100vh)] [--_size:min(var(--_factor),100vw)] py-20">
        <div className="relative flex flex-col min-h-screen w-full items-center justify-center px-4 md:px-0">
          <div className="absolute top-0 left-4 md:left-8 z-20">
            <Button
              variant="outline"
              className="bg-transparent border-white/10 text-[#c8c2bd] hover:bg-white/5 py-2 px-4"
              size="lg"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>

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

          <div className="relative z-10 w-full max-w-4xl space-y-8 p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-[#c8c2bd]">Profile</h2>
              <p className="mt-2 text-sm text-[#86868b]">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-[#c8c2bd]">Basic Information</h3>
                  <div className="space-y-4 p-4 rounded-lg border border-white/10">
                    <div>
                      <label className="text-sm text-[#86868b]">Full Name</label>
                      <div className="text-[#c8c2bd]">{userData?.fullName || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">Email</label>
                      <div className="text-[#c8c2bd]">{userData?.email || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">Account Status</label>
                      <div className="text-[#c8c2bd] capitalize">{userData?.accountStatus || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">Role</label>
                      <div className="text-[#c8c2bd] capitalize">{userData?.role || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-[#c8c2bd]">Subscription</h3>
                  <div className="space-y-4 p-4 rounded-lg border border-white/10">
                    <div>
                      <label className="text-sm text-[#86868b]">Current Plan</label>
                      <div className="text-[#c8c2bd] capitalize">{userData?.subscription?.plan || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">Credits</label>
                      <div className="text-[#c8c2bd]">{userData?.credits || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">Start Date</label>
                      <div className="text-[#c8c2bd]">{formatDate(paymentData?.startDate)}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">End Date</label>
                      <div className="text-[#c8c2bd]">{formatDate(paymentData?.endDate)}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">Next Billing On</label>
                      <div className="text-[#c8c2bd]">
                        {formatDate(paymentData?.endDate)}
                      </div>
                    </div>
                    {userData?.subscription?.plan && userData.subscription.plan !== 'free' && (
                      <Button
                        variant="destructive"
                        className="mt-4 w-full"
                        onClick={handleCancelSubscription}
                      >
                        Cancel Subscription
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-[#c8c2bd]">Preferences</h3>
                  <div className="space-y-4 p-4 rounded-lg border border-white/10">
                    <div>
                      <label className="text-sm text-[#86868b]">Theme</label>
                      <div className="text-[#c8c2bd] capitalize">{userData?.preferences?.theme || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">Language</label>
                      <div className="text-[#c8c2bd] uppercase">{userData?.preferences?.language || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">Timezone</label>
                      <div className="text-[#c8c2bd]">{userData?.preferences?.timezone || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-[#c8c2bd]">Usage Statistics</h3>
                  <div className="space-y-4 p-4 rounded-lg border border-white/10">
                    <div>
                      <label className="text-sm text-[#86868b]">Last Active</label>
                      <div className="text-[#c8c2bd]">{formatDate(userData?.lastLoginAt)}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">Total Logins</label>
                      <div className="text-[#c8c2bd]">{userData?.usage?.totalLogins || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-[#c8c2bd]">Security</h3>
                  <div className="space-y-4 p-4 rounded-lg border border-white/10">
                    <div>
                      <label className="text-sm text-[#86868b]">Last Password Change</label>
                      <div className="text-[#c8c2bd]">{formatDate(userData?.security?.lastPasswordChange)}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">MFA Enabled</label>
                      <div className="text-[#c8c2bd]">{userData?.security?.mfaEnabled ? 'Yes' : 'No'}</div>
                    </div>
                    <div>
                      <label className="text-sm text-[#86868b]">Recovery Email</label>
                      <div className="text-[#c8c2bd]">{userData?.security?.recoveryEmail || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button
                variant="outline"
                className="text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9] border-none"
                size="lg"
                onClick={() => router.push('/mockup-home')}
              >
                Go to Dashboard <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsErrorDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

