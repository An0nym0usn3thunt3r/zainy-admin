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
// import MultiSelectCat from "../custom ui/MultiSelectCat";
// import Loader from "../custom ui/Loader";

// const formSchema = z.object({
//   title: z.string().min(2).max(100),
//   description: z.string().min(2).max(500).trim(),
//   media: z.array(z.string()),
//   collections: z.array(z.string()),
//   categories: z.array(z.string()),
//   tags: z.array(z.string()),
//   sizes: z.array(z.string()),
//   colors: z.array(z.string()),
//   price: z.coerce.number().min(0.1),
//   discount: z.coerce.number().min(0.1),
// });

// interface ProductFormProps {
//   initialData?: ProductType | null;
// }

// const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [collections, setCollections] = useState<CollectionType[]>([]);
//   const [categories, setCategories] = useState<CategoriesType[]>([]);
//   const [colorCat, setColorCat] = useState<colorCat[]>([
//     { color: "red", price: 10 },
//     { color: "green", price: 10 },
//   ]);
//   const [sizeCat, setSizeCat] = useState<sizeCat[]>([
//     { size: "red", price: 10 },
//   ]);

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

//   const getCategories = async () => {
//     try {
//       const res = await fetch("/api/categories", {
//         method: "GET",
//       });
//       const data = await res.json();
//       await setCategories(data);
//       setLoading(false);
//     } catch (err) {
//       console.log("[categories_GET]", err);
//       toast.error("Something went wrong! Please try again.");
//     }
//   };

//   useEffect(() => {
//     getCategories();
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
//           categories: initialData.categories.map(
//             (category) => category._id
//           ),
//         }
//       : {
//           title: "",
//           description: "",
//           media: [],
//           collections: [],
//           categories: [],
//           tags: [],
//           sizes: [],
//           colors: [],
//           price: 0.1,
//           discount: 0.1,
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

//   const handleColorChange = (index:any, event:any) => {
//     const newColors = [...colorCat];
//     newColors[index].color = event.target.value;
//     setColorCat(newColors);
//   };

//   const handleSizeChange = (index:any, event:any) => {
//     const newSize = [...sizeCat];
//     newSize[index].size = event.target.value;
//     setSizeCat(newSize);
//   };

//   const handleColorPriceChange = (index:any, event:any) => {
//     const newColors = [...colorCat];
//     newColors[index].price = event.target.value;
//     setColorCat(newColors);
//   };

//   const handleSizePriceChange = (index:any, event:any) => {
//     const newSize = [...sizeCat];
//     newSize[index].price = event.target.value;
//     setSizeCat(newSize);
//   };

//   const deleteColorCat = (index: number) => {
//     setColorCat((prevColorCat) => {
//       const newColorCat = [...prevColorCat];
//       newColorCat.splice(index, 1);
//       return newColorCat;
//     });
//   };
  
//   const deleteSizeCat = (index: number) => {
//     setSizeCat((prevSizeCat) => {
//       const newSizeCat = [...prevSizeCat];
//       newSizeCat.splice(index, 1);
//       return newSizeCat;
//     });
//   };

//   const addColorCatField = () => {
//     setColorCat(prevColorCat => [...prevColorCat, { color: "", price: 0 }]);
//   };

//   const addSizeCatField = () => {
//     setSizeCat(prevSizeCat => [...prevSizeCat, { size: "", price: 0 }]);
//   };
  
  

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     console.log("\n\n\nform:")
//     console.log(values)
//     try {
//       setLoading(true);
//       console.log("\n\n\n initialData : ");
//       console.log(initialData);
//       const url = initialData
//         ? `/api/products/${initialData._id}`
//         : "/api/products";
//       const res = await fetch(url, {
//         method: "POST",
//         body: JSON.stringify(values),
//       });
//       if (res.ok) {
//         setLoading(false);
//         toast.success(`Product ${initialData ? "updated" : "created"}`);
//         // window.location.href = "/products";
//         // router.push("/products");
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
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Title"
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
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Description"
//                     {...field}
//                     rows={5}
//                     onKeyDown={handleKeyPress}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-1" />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="media"
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

//           <div className="md:grid md:grid-cols-3 gap-8">
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price ($)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="Price"
//                       {...field}
//                       onKeyDown={handleKeyPress}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-red-1" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="discount"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Discount (AED)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="Discount"
//                       {...field}
//                       onKeyDown={handleKeyPress}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-red-1" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="tags"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tags</FormLabel>
//                   <FormControl>
//                     <MultiText
//                       placeholder="Tags"
//                       value={field.value}
//                       onChange={(tag) => field.onChange([...field.value, tag])}
//                       onRemove={(tagToRemove) =>
//                         field.onChange([
//                           ...field.value.filter((tag) => tag !== tagToRemove),
//                         ])
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage className="text-red-1" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//             control={form.control}
//             name="sizes"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>size</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="size"
//                     {...field}
//                     value={JSON.stringify(sizeCat)}
//                     />
//                 </FormControl>
//                 <FormMessage className="text-red-1" />
//               </FormItem>
//             )}
//           />
//             <FormField
//               control={form.control}
//               name="colors"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>colors</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="colors"
//                       value={JSON.stringify(colorCat)}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-red-1" />
//                 </FormItem>
//               )}
//             />
//             {collections.length > 0 && (
//               <FormField
//                 control={form.control}
//                 name="collections"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Collections</FormLabel>
//                     <FormControl>
//                       <MultiSelect
//                         placeholder="Collections"
//                         collections={collections}
//                         value={field.value}
//                         onChange={(_id) =>
//                           field.onChange([...field.value, _id])
//                         }
//                         onRemove={(idToRemove) =>
//                           field.onChange([
//                             ...field.value.filter(
//                               (collectionId) => collectionId !== idToRemove
//                             ),
//                           ])
//                         }
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-1" />
//                   </FormItem>
//                 )}
//               />
//             )}
//             {categories.length > 0 && (
//               <FormField
//                 control={form.control}
//                 name="categories"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Categories</FormLabel>
//                     <FormControl>
//                       <MultiSelectCat
//                         placeholder="Categories"
//                         categories={categories}
//                         value={field.value?.length > 0 ? field.value : null}
//                         onChange={(tag) =>
//                           field.onChange([...(field?.value || []), tag])
//                         }
//                         onRemove={(idToRemove) =>
//                           field.onChange([
//                             ...field.value.filter(
//                               (collectionId) => collectionId !== idToRemove
//                             ),
//                           ])
//                         }
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-1" />
//                   </FormItem>
//                 )}
//               />
//             )}
//           </div>

//           <div className="md:grid md:grid-cols-2 gap-2">
//             <div className="border rounded">
//               <div className="flex flex-row justify-between text-center font-bold p-4">
//                 <div>Color</div>
//                 <div>Price</div>
//                 <div>Total</div>
//                 <div>Action</div>
//               </div>
//               {colorCat?.length > 0 &&
//                 colorCat.map((item, index) => (
//                   <>
//                     <div className="flex flex-row justify-between p-4" key={index}>
//                       <input
//                         type="text"
//                         placeholder="color"
//                         value={item.color}
//                         className="w-1/3 border border-black rounded h-10 p-4"
//                         onChange={(event) => handleColorChange(index, event)}
//                       />
//                       <input
//                         type="number"
//                         placeholder="price"
//                         value={item.price}
//                         className="w-1/3 border border-black rounded h-10 p-4"
//                         onChange={(event) => handleColorPriceChange(index, event)}
//                       />
//                       <input
//                         type="number"
//                         placeholder="total"
//                         value={parseFloat(item.price) + parseFloat(form.getValues("price"))}
//                         className="w-1/3 border border-black rounded h-10 p-4"
//                         onChange={(event) => handleSizePriceChange(index, event)}
//                       />

//                       <div><Button type="button" variant={"outline"} onClick={() => deleteColorCat(index)}>Delete</Button></div>
//                     </div>
//                   </>
//                 ))}

//               <div className="flex justify-center items-center p-4 mt-10">
//                 <Button type="button" variant={"outline"} className="mx-2" onClick={addColorCatField}>+</Button>
//                 <Button type="button" variant={"outline"}>
//                   Save changes
//                 </Button>
//               </div>
//             </div>
//             <div className="border rounded">
//               <div className="flex flex-row justify-between text-center font-bold p-4">
//                 <div>Size</div>
//                 <div>Price</div>
//                 <div>Total</div>
//                 <div>Action</div>
//               </div>
//               {sizeCat?.length > 0 &&
//                 sizeCat.map((item, index) => (
//                   <>
//                     <div className="flex flex-row justify-between p-4" key={index}>
//                       <input
//                         type="text"
//                         placeholder="size"
//                         value={item.size}
//                         className="w-1/3 border border-black rounded h-10 p-4"
//                         onChange={(event) => handleSizeChange(index, event)}
//                       />
//                       <input
//                         type="number"
//                         placeholder="price"
//                         value={item.price}
//                         className="w-1/3 border border-black rounded h-10 p-4"
//                         onChange={(event) => handleSizePriceChange(index, event)}
//                       />
//                       <input
//                         type="number"
//                         placeholder="total"
//                         value={parseFloat(item.price) + parseFloat(form.getValues("price"))}
//                         className="w-1/3 border border-black rounded h-10 p-4"
//                         onChange={(event) => handleSizePriceChange(index, event)}
//                       />

//                       <div><Button type="button" variant={"outline"} onClick={() => deleteSizeCat(index)}>Delete</Button></div>
//                     </div>
//                   </>
//                 ))}

//               <div className="flex justify-center items-center p-4 mt-10">
//                 <Button type="button" variant={"outline"} className="mx-2" onClick={addSizeCatField}>+</Button>

//                 <Button type="button" variant={"outline"}>
//                   Save changes
//                 </Button>
//               </div>
//             </div>
//           </div>

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
