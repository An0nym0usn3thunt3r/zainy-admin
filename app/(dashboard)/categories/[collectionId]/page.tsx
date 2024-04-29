'use client'

import { useEffect, useState, useCallback } from "react"
import Loader from "@/components/custom ui/Loader"
import CategoriesForm from "@/components/categories/CategoriesForm"

const CollectionDetails = ({ params }: { params: { collectionId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

  const getCollectionDetails = useCallback(async () => {
    try { 
      const res = await fetch(`/api/categories/${params.collectionId}`, {
        method: "GET"
      })
      const data = await res.json()
      setCollectionDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[collectionId_GET]", err)
    }
  }, [params.collectionId])

  useEffect(() => {
    const fetchData = async () => {
      await getCollectionDetails()
    }
    fetchData()
  }, [getCollectionDetails])

  return loading ? <Loader /> : (
    <CategoriesForm initialData={collectionDetails}/>
  )
}

export default CollectionDetails
