// import { db, auth } from '@/firebaseConfig';
// import { collection, addDoc, Timestamp, getDocs, query, where, orderBy } from 'firebase/firestore';
// import { useEffect, useState } from 'react';
// import { onAuthStateChanged, User } from 'firebase/auth';

// export interface Scene {
//   id: string;
//   mediaItem: {
//     fileUrl: string;
//     isVideo: boolean;
//     duration?: number;
//     order: number;
//   };
//   transitions?: {
//     in?: string;
//     out?: string;
//   };
// }

// export interface Project {
//   id?: string;
//   userId: string;
//   title: string;
//   description: string;
//   templateName: string;
//   templateEffect: string;
//   aspectRatio: {
//     width: number;
//     height: number;
//     name: string;
//   };
//   duration: number;
//   backgroundColor: string;
//   fileUrl: string;
//   renderedVideoUrl: string;
//   scenes: Scene[];
//   createdAt: Timestamp;
//   updatedAt: Timestamp;
// }

// export const useProjects = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log('Auth state changed:', currentUser ? 'User logged in' : 'No user');
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchProjects = async () => {
//     if (!user) {
//       console.log('No user logged in, skipping project fetch');
//       setProjects([]);
//       return;
//     }
    
//     console.log('Fetching projects for user:', user.uid);
//     try {
//       const projectsRef = collection(db, 'projects');
//       const q = query(
//         projectsRef,
//         where('userId', '==', user.uid),
//         orderBy('createdAt', 'desc')
//       );
      
//       const querySnapshot = await getDocs(q);
//       const projectsList = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Project[];
      
//       console.log('Fetched projects:', projectsList);
//       setProjects(projectsList);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchProjects();
//     }
//   }, [user]);

//   const saveProject = async (projectData: Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
//     if (!user) {
//       console.error('No user logged in, cannot save project');
//       throw new Error('User not authenticated');
//     }

//     console.log('Saving project for user:', user.uid);
//     console.log('Project data:', projectData);

//     try {
//       const projectsRef = collection(db, 'projects');
//       const timestamp = Timestamp.now();
      
//       const newProject = {
//         ...projectData,
//         userId: user.uid,
//         createdAt: timestamp,
//         updatedAt: timestamp,
//       };

//       const docRef = await addDoc(projectsRef, newProject);
//       console.log('Project saved successfully with ID:', docRef.id);

//       const savedProject = { id: docRef.id, ...newProject };
//       setProjects(prevProjects => [savedProject, ...prevProjects]);

//       return savedProject;
//     } catch (error) {
//       console.error('Error saving project:', error);
//       throw error;
//     }
//   };

//   return { projects, loading, saveProject, fetchProjects };
// };







import { db, auth } from '@/firebaseConfig';
import { collection, addDoc, Timestamp, getDocs, query, where, orderBy, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

export interface Scene {
  id: string;
  mediaItem: {
    fileUrl: string;
    isVideo: boolean;
    duration?: number;
    order: number;
  };
  transitions?: {
    in?: string;
    out?: string;
  };
}

export interface Project {
  id?: string;
  userId: string;
  title: string;
  description: string;
  templateName: string;
  templateEffect: string;
  aspectRatio: {
    width: number;
    height: number;
    name: string;
  };
  duration: number;
  backgroundColor: string;
  fileUrl: string;
  renderedVideoUrl: string;
  scenes: Scene[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const useProjects = () => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser ? 'User logged in' : 'No user');
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setProjects([]);
      return;
    }

    const projectsRef = collection(db, 'projects');
    const q = query(
      projectsRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedProjects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      
      console.log('Real-time projects update:', updatedProjects);
      setProjects(updatedProjects);
    }, (error) => {
      console.error('Error fetching projects:', error);
    });

    return () => unsubscribe();
  }, [user]);

  const saveProject = async (projectData: Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) {
      console.error('No user logged in, cannot save project');
      throw new Error('User not authenticated');
    }

    console.log('Saving project for user:', user.uid);
    console.log('Project data:', projectData);

    try {
      const projectsRef = collection(db, 'projects');
      const timestamp = Timestamp.now();
      
      const newProject = {
        ...projectData,
        userId: user.uid,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      const docRef = await addDoc(projectsRef, newProject);
      console.log('Project saved successfully with ID:', docRef.id);

      return { id: docRef.id, ...newProject };
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!user) {
      console.error('No user logged in, cannot delete project');
      throw new Error('User not authenticated');
    }

    try {
      const projectRef = doc(db, 'projects', projectId);
      await deleteDoc(projectRef);
      console.log('Project deleted successfully:', projectId);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  return { projects, loading, saveProject, deleteProject };
};

