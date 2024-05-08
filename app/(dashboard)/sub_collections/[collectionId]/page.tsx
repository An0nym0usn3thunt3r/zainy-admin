'use client'

import { useEffect, useState, useCallback } from "react"
import Loader from "@/components/custom ui/Loader"
import SubCollectionForm from "@/components/sub_collections/SubCollectionForm"

const CollectionDetails = ({ params }: { params: { collectionId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [collectionDetails, setCollectionDetails] = useState<SubCollectionType | null>(null)

  const getCollectionDetails = useCallback(async () => {
    try { 
      const res = await fetch(`/api/sub_collections/${params.collectionId}`, {
        method: "GET"
      })
      const data = await res.json()
      setCollectionDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[sub_collectionId_GET]", err)
    }
  }, [params.collectionId])

  useEffect(() => {
    const fetchData = async () => {
      await getCollectionDetails()
    }
    fetchData()
  }, [getCollectionDetails])

  return loading ? <Loader /> : (
    <SubCollectionForm initialData={collectionDetails}/>
  )
}

export default CollectionDetails
