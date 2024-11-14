import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { projectStorage, projectFirestore } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) return;

    // Create references
    const storageRef = ref(projectStorage, file.name);
    const collectionRef = collection(projectFirestore, 'images');

    // Create upload task
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Handle state changes
    const handleStateChange = (snapshot) => {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
    };

    // Handle errors
    const handleError = (err) => {
      setError(err);
    };

    // Handle completion
    const handleCompletion = async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collectionRef, { url: downloadURL, createdAt: serverTimestamp() });
        setUrl(downloadURL);
      } catch (err) {
        setError(err);
      }
    };

    uploadTask.on('state_changed', handleStateChange, handleError, handleCompletion);

    // Cleanup on unmount
    return () => {
      uploadTask.cancel();
    };

  }, [file]);

  return { progress, url, error };
};

export default useStorage;
