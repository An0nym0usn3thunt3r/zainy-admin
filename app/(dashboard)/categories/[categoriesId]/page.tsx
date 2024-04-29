'use client'

import { useEffect, useState, useCallback } from "react"
import Loader from "@/components/custom ui/Loader"
import CategoriesForm from "@/components/categories/CategoriesForm"

const categoriesDetails = ({ params }: { params: { categoriesId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [categoriesDetails, setCategoriesDetails] = useState<CategoriesType | null>(null)

  const getCategoriesDetails = useCallback(async () => {
    try { 
      const res = await fetch(`/api/categories/${params.categoriesId}`, {
        method: "GET"
      })
      const data = await res.json()
      setCategoriesDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[categoriesId_GET]", err)
    }
  }, [params.categoriesId])

  useEffect(() => {
    const fetchData = async () => {
      await getCategoriesDetails()
    }
    fetchData()
  }, [getCategoriesDetails])

  return loading ? <Loader /> : (
    <CategoriesForm initialData={categoriesDetails}/>
  )
}

export default categoriesDetails
