"use client"

import { useEffect, useState } from "react"

import Loader from "@/components/custom ui/Loader"
import BlogForm from "@/components/blogs/BlogsForm"

const CollectionDetails = ({ params }: { params: { collectionId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [collectionDetails, setCollectionDetails] = useState<BlogType | null>(null)

  const getCollectionDetails = async () => {
    try { 
      const res = await fetch(`/api/blogs/${params.collectionId}`, {
        method: "GET"
      })
      const data = await res.json()
      setCollectionDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[blog_GET]", err)
    }
  }

  useEffect(() => {
    getCollectionDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? <Loader /> : (
    <BlogForm />
  )
}

export default CollectionDetails