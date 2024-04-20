// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useRouter } from "next/navigation";

// import { Separator } from "../ui/separator";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "../ui/textarea";
// import ImageUpload from "../custom ui/ImageUpload";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Delete from "../custom ui/Delete";
// import MultiText from "../custom ui/MultiText";
// import MultiSelect from "../custom ui/MultiSelect";
// import Loader from "../custom ui/Loader";

// const formSchema = z.object({
//   link: z.string(),
//   image: z.array(z.string()),
// });

// interface ProductFormProps {
//   initialData?: ProductType | null; //Must have "?" to make it optional
// }

// const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [collections, setCollections] = useState<LimitedOffersCollectionType[]>([]);

//   const getCollections = async () => {
//     try {
//       const res = await fetch("/api/collections", {
//         method: "GET",
//       });
//       const data = await res.json();
//       setCollections(data);
//       setLoading(false);
//     } catch (err) {
//       console.log("[collections_GET]", err);
//       toast.error("Something went wrong! Please try again.");
//     }
//   };

//   useEffect(() => {
//     getCollections();
//   }, []);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialData
//       ? {
//           ...initialData,
//           collections: initialData.collections.map(
//             (collection) => collection._id
//           ),
//         }
//       : {
//           link: "",
//           image: "",
//         },
//   });

//   const handleKeyPress = (
//     e:
//       | React.KeyboardEvent<HTMLInputElement>
//       | React.KeyboardEvent<HTMLTextAreaElement>
//   ) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//     }
//   };

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       setLoading(true);
//       const url = initialData
//         ? `/api/limited_offers/${initialData._id}`
//         : "/api/limited_offers";
//       const res = await fetch(url, {
//         method: "POST",
//         body: JSON.stringify(values),
//       });
//       if (res.ok) {
//         setLoading(false);
//         toast.success(`Offer ${initialData ? "updated" : "created"}`);
//         router.push("/LimitedOffers");
//       }
//     } catch (err) {
//       console.log("[products_POST]", err);
//       toast.error("Something went wrong! Please try again.");
//     }
//   };

//   return loading ? (
//     <Loader />
//   ) : (
//     <div className="p-10">
//       {initialData ? (
//         <div className="flex items-center justify-between">
//           <p className="text-heading2-bold">Edit Product</p>
//           <Delete id={initialData._id} item="product" />
//         </div>
//       ) : (
//         <p className="text-heading2-bold">Create Product</p>
//       )}
//       <Separator className="bg-grey-1 mt-4 mb-7" />
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="link"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Link</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Link"
//                     {...field}
//                     onKeyDown={handleKeyPress}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-1" />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="image"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Image</FormLabel>
//                 <FormControl>
//                   <ImageUpload
//                     value={field.value}
//                     onChange={(url) => field.onChange([...field.value, url])}
//                     onRemove={(url) =>
//                       field.onChange([
//                         ...field.value.filter((image) => image !== url),
//                       ])
//                     }
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-1" />
//               </FormItem>
//             )}
//           />

//           <div className="flex gap-10">
//             <Button type="submit" className="bg-blue-1 text-white">
//               Submit
//             </Button>
//             <Button
//               type="button"
//               onClick={() => router.push("/products")}
//               className="bg-blue-1 text-white"
//             >
//               Discard
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default ProductForm;