import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // Create a reference to the collection
    const colRef = collection(projectFirestore, collectionName);

    // Create a query to order by 'createdAt'
    const q = query(colRef, orderBy('createdAt', 'desc'));

    // Subscribe to the collection
    const unsub = onSnapshot(q, (snapshot) => {
      let documents = [];
      snapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    // Cleanup function to unsubscribe from the listener
    return () => unsub();
  }, [collectionName]);

  return { docs };
};

export default useFirestore;
