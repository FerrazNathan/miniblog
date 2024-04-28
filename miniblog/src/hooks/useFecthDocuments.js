import { useEffect, useState } from "react";
import { database } from "../firebase/config";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments]= useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    async function loadData() {
      if(cancelled) return
      setLoading(true)

      const collectionRef = await collection(database, docCollection)

      try {
        let query;

        query = await query(collectionRef, orderBy("createdAt", "desc"))

        await onSnapshot(query, (querySnapshot) => {
   
          setDocuments(
            querySnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              }
            })
          )
          setLoading(false)
        })
      } catch(error) {
        setError(error)
        setLoading(false)
      }
    }

    loadData()
  }, [docCollection, search, uid, cancelled])

  useEffect(() => {
    return () => {
      setCancelled(true)
    }
  }, []) 

  return { documents, loading, error }
}