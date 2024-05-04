"use client";

// home > ele > sub ele > product

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";
import MultiSelectCat from "../custom ui/MultiSelectCat";
import Loader from "../custom ui/Loader";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(500).trim(),
  price: z.coerce.number().min(0.1),
  discount: z.coerce.number().optional(),
  image: z.array(z.string()),
  categories: z.array(z.string()),
  collections: z.array(z.string()),
  subcollections: z.array(z.string()),
  tags: z.array(z.string()),
  color1: z.string(),
  color2: z.string(),
  color3: z.string(),
  color4: z.string(),
  color5: z.string(),
  color6: z.string(),
  color7: z.string(),
  color8: z.string(),
  color9: z.string(),
  color10: z.string(),
  color11: z.string(),
  color12: z.string(),
  color13: z.string(),
  color14: z.string(),
  color15: z.string(),
  color16: z.string(),
  color17: z.string(),
  color18: z.string(),
  color19: z.string(),
  color20: z.string(),

  cp1: z.coerce.number(),
  cp2: z.coerce.number(),
  cp3: z.coerce.number(),
  cp4: z.coerce.number(),
  cp5: z.coerce.number(),
  cp6: z.coerce.number(),
  cp7: z.coerce.number(),
  cp8: z.coerce.number(),
  cp9: z.coerce.number(),
  cp10: z.coerce.number(),
  cp11: z.coerce.number(),
  cp12: z.coerce.number(),
  cp13: z.coerce.number(),
  cp14: z.coerce.number(),
  cp15: z.coerce.number(),
  cp16: z.coerce.number(),
  cp17: z.coerce.number(),
  cp18: z.coerce.number(),
  cp19: z.coerce.number(),
  cp20: z.coerce.number(),

  ci1: z.array(z.string()),
  ci2: z.array(z.string()),
  ci3: z.array(z.string()),
  ci4: z.array(z.string()),
  ci5: z.array(z.string()),
  ci6: z.array(z.string()),
  ci7: z.array(z.string()),
  ci8: z.array(z.string()),
  ci9: z.array(z.string()),
  ci10: z.array(z.string()),
  ci11: z.array(z.string()),
  ci12: z.array(z.string()),
  ci13: z.array(z.string()),
  ci14: z.array(z.string()),
  ci15: z.array(z.string()),
  ci16: z.array(z.string()),
  ci17: z.array(z.string()),
  ci18: z.array(z.string()),
  ci19: z.array(z.string()),
  ci20: z.array(z.string()),

  size1: z.string(),
  size2: z.string(),
  size3: z.string(),
  size4: z.string(),
  size5: z.string(),
  size6: z.string(),
  size7: z.string(),
  size8: z.string(),
  size9: z.string(),
  size10: z.string(),
  size11: z.string(),
  size12: z.string(),
  size13: z.string(),
  size14: z.string(),
  size15: z.string(),
  size16: z.string(),
  size17: z.string(),
  size18: z.string(),
  size19: z.string(),
  size20: z.string(),
});

interface ProductFormProps {
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [subCollections, setSubCollections] = useState<SubCollectionType[]>([]);
  const [categoriesNow, setCategoriesNow] = useState<string[]>([]);
  const [collectionsNow, setCollectionsNow] = useState<string[]>([]);

  const getSubCollections = async () => {
    console.log("getSubCollections : ");
    console.log(collectionsNow);
    collectionsNow?.map(async (value, index) => {
      try {
        const res = await fetch(`/api/sub_collections/id/${value}`, {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        setSubCollections([...subCollections, data]);
        setLoading(false);
      } catch (err) {
        console.log("[sub_collections_GET]", err);
        toast.error("Something went wrong! Please try again.");
      }
    });
  };

  const getCollections = async () => {
    console.log("getCollections : ");
    console.log(collections);
    console.log("RequestGetCollections");
    categoriesNow?.map(async (value, index) => {
      try {
        const res = await fetch(`/api/collections/id/${value}`, {
          method: "GET",
        });
        const data = await res.json();
        setCollections([...collections, data]);
        setLoading(false);
      } catch (err) {
        console.log("[sub_collections_GET]", err);
        toast.error("Something went wrong! Please try again.");
      }
    });
  };

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories", {
        method: "GET",
      });
      const data = await res.json();
      await setCategories(data);
      setLoading(false);
    } catch (err) {
      console.log("[categories_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCollections([]);
    if (collections.length == 0) {
      getCollections();
    }
  }, [categoriesNow]);

  useEffect(() => {
    setSubCollections([]);
    if (subCollections.length == 0) {
      getSubCollections();
    }
  }, [collectionsNow]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          collections: initialData.collections.map(
            (collection) => collection._id
          ),
          subcollections: initialData.subcollections.map(
            (scollection) => scollection._id
          ),
          categories: initialData.categories.map((category) => category._id),
        }
      : {
          title: "",
          description: "",
          price: 0.1,
          discount: 0.1,
          image: [],
          categories: [],
          collections: [],
          subcollections: [],
          tags: [],
          color1: "",
          color2: "",
          color3: "",
          color4: "",
          color5: "",
          color6: "",
          color7: "",
          color8: "",
          color9: "",
          color10: "",
          color11: "",
          color12: "",
          color13: "",
          color14: "",
          color15: "",
          color16: "",
          color17: "",
          color18: "",
          color19: "",
          color20: "",

          cp1: 0,
          cp2: 0,
          cp3: 0,
          cp4: 0,
          cp5: 0,
          cp6: 0,
          cp7: 0,
          cp8: 0,
          cp9: 0,
          cp10: 0,
          cp11: 0,
          cp12: 0,
          cp13: 0,
          cp14: 0,
          cp15: 0,
          cp16: 0,
          cp17: 0,
          cp18: 0,
          cp19: 0,
          cp20: 0,

          ci1: [],
          ci2: [],
          ci3: [],
          ci4: [],
          ci5: [],
          ci6: [],
          ci7: [],
          ci8: [],
          ci9: [],
          ci10: [],
          ci11: [],
          ci12: [],
          ci13: [],
          ci14: [],
          ci15: [],
          ci16: [],
          ci17: [],
          ci18: [],
          ci19: [],
          ci20: [],

          size1: "",
          size2: "",
          size3: "",
          size4: "",
          size5: "",
          size6: "",
          size7: "",
          size8: "",
          size9: "",
          size10: "",
          size11: "",
          size12: "",
          size13: "",
          size14: "",
          size15: "",
          size16: "",
          size17: "",
          size18: "",
          size19: "",
          size20: "",
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    console.log("key event : " + e.key)
    // if (e.key === "Enter") {
    //   e.preventDefault();
    // }
  };

  const handleAddCategoriesNow = (newCategory: string) => {
    if (!categoriesNow.includes(newCategory)) {
      setCategoriesNow([...categoriesNow, newCategory]);
    } else {
      console.log("Category already exists!");
    }
  };

  const handleRemoveCategoryNow = (categoryToRemove: string) => {
    const updatedCategories = categoriesNow.filter(
      (category) => category !== categoryToRemove
    );
    setCategoriesNow(updatedCategories);
  };

  const handleAddCollectionsNow = (newCategory: string) => {
    if (!collectionsNow.includes(newCategory)) {
      setCollectionsNow([...collectionsNow, newCategory]);
    } else {
      console.log("collection already exists!");
    }
  };

  const handleRemoveCollectionsNow = (categoryToRemove: string) => {
    const updatedCategories = collectionsNow.filter(
      (category) => category !== categoryToRemove
    );
    setCollectionsNow(updatedCategories);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("\n\n\nform:");
    console.log(values);
    try {
      setLoading(true);
      console.log("\n\n\n initialData : ");
      console.log(initialData);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (err) {
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Product</p>
          <Delete id={initialData._id} item="product" />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Product</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-2 gap-8 p-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (AED)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount (AED)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Discount"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            {categories.length > 0 && (
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <MultiSelectCat
                        placeholder="Categories"
                        categories={categories}
                        value={field.value?.length > 0 ? field.value : null}
                        onChange={(tag) => {
                          handleAddCategoriesNow(tag);
                          field.onChange([...(field?.value || []), tag]);
                        }}
                        onRemove={(idToRemove) => {
                          handleRemoveCategoryNow(idToRemove);
                          field.onChange([
                            ...field.value.filter(
                              (collectionId) => collectionId !== idToRemove
                            ),
                          ]);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />
            )}
            {collections.length > 0 && (
              <FormField
                control={form.control}
                name="collections"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collections</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Collections"
                        collections={collections}
                        value={field.value}
                        onChange={(tag) => {
                          handleAddCollectionsNow(tag);
                          field.onChange([...(field?.value || []), tag]);
                        }}
                        onRemove={(idToRemove) => {
                          handleRemoveCollectionsNow(idToRemove);
                          field.onChange([
                            ...field.value.filter(
                              (collectionId) => collectionId !== idToRemove
                            ),
                          ]);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />
            )}
            {subCollections.length > 0 && (
              <FormField
                control={form.control}
                name="subcollections"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Collections</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Sub Collections"
                        collections={subCollections}
                        value={field.value}
                        onChange={(_id) => {
                          field.onChange([...field.value, _id]);
                        }}
                        onRemove={(idToRemove) =>
                          field.onChange([
                            ...field.value.filter(
                              (collectionId) => collectionId !== idToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiText
                    placeholder="Tags"
                    value={field.value}
                    onChange={(tag) => field.onChange([...field.value, tag])}
                    onRemove={(tagToRemove) =>
                      field.onChange([
                        ...field.value.filter((tag) => tag !== tagToRemove),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <Accordion>
            <AccordionItem
              key="1"
              aria-label="Color Varients"
              title="Color Varients"
            >
              <Table aria-label="Color varient table">
                <TableHeader>
                  <TableColumn> </TableColumn>
                  <TableColumn>Color</TableColumn>
                  <TableColumn>Size</TableColumn>
                  <TableColumn>Price</TableColumn>
                  <TableColumn>Image</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>1.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color1"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 1"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size1"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp1"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 1"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci1"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>2.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color2"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 2"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size2"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp2"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 2"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci2"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>3.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color3"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 3"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size3"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp3"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 3"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci3"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>4.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color4"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 4"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size4"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp4"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 4"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci4"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell>5.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color5"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 5"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size5"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp5"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 5"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci5"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="6">
                    <TableCell>6.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color6"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 6"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size6"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 6"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp6"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 6"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci6"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="7">
                    <TableCell>7.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color7"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 7"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size7"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 7"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp7"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 7"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci7"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="8">
                    <TableCell>8.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color8"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 8"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size8"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 8"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp8"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 8"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci8"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="9">
                    <TableCell>9.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color9"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 9"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size9"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 9"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp9"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 9"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci9"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="10">
                    <TableCell>10.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color10"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 10"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size10"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 10"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp10"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 10"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci10"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="11">
                    <TableCell>11.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color11"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 11"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size11"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 11"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp11"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 11"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci11"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="12">
                    <TableCell>12.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color12"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 12"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size12"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 12"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp12"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 12"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci12"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="13">
                    <TableCell>13.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color13"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 13"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size13"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 13"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp13"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 13"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci13"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="14">
                    <TableCell>14.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color14"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 14"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size14"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 14"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp14"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 14"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci14"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="15">
                    <TableCell>15.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color15"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 15"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size15"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 15"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp15"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 15"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci15"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="16">
                    <TableCell>16.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color16"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 16"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size16"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 16"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp16"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 16"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci16"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="17">
                    <TableCell>17.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color17"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 17"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size17"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 17"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp17"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 17"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci17"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="18">
                    <TableCell>18.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color18"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 18"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size18"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 18"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp18"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 18"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci18"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="19">
                    <TableCell>19.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color19"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 19"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size19"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 19"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp19"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 19"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci19"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow key="20">
                    <TableCell>20.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="color20"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Color 20"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size20"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 20"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="cp20"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price 20"
                                {...field}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="ci20"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={(url) =>
                                  field.onChange([...field.value, url])
                                }
                                onRemove={(url) =>
                                  field.onChange([
                                    ...field.value.filter(
                                      (image) => image !== url
                                    ),
                                  ])
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-1" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionItem>
          </Accordion>

          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/products")}
              className="bg-blue-1 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
