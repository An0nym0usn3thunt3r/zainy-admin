"use client";

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
  description: z.string().min(2).max(500).trim(),
  price: z.coerce.number().min(0.1),
  discount: z.coerce.number().optional(),
  collections: z.array(z.string()),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  color1: z.string(),
  color2: z.string(),
  color3: z.string(),
  color4: z.string(),
  color5: z.string(),
  cp1: z.coerce.number(),
  cp2: z.coerce.number(),
  cp3: z.coerce.number(),
  cp4: z.coerce.number(),
  cp5: z.coerce.number(),
  ci1: z.array(z.string()),
  ci2: z.array(z.string()),
  ci3: z.array(z.string()),
  ci4: z.array(z.string()),
  ci5: z.array(z.string()),
  size1: z.string(),
  size2: z.string(),
  size3: z.string(),
  size4: z.string(),
  size5: z.string(),
  sp1: z.coerce.number(),
  sp2: z.coerce.number(),
  sp3: z.coerce.number(),
  sp4: z.coerce.number(),
  sp5: z.coerce.number(),
});

interface ProductFormProps {
  initialData?: ProductType2 | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
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
    getCollections();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          collections: initialData.collections.map(
            (collection) => collection._id
          ),
          categories: initialData.categories.map((category) => category._id),
        }
      : {
          title: "",
          description: "",
          price: 0.1,
          discount: 0.1,
          collections: [],
          categories: [],
          tags: [],
          color1: "",
          color2: "",
          color3: "",
          color4: "",
          color5: "",
          cp1: 0,
          cp2: 0,
          cp3: 0,
          cp4: 0,
          cp5: 0,
          ci1: [],
          ci2: [],
          ci3: [],
          ci4: [],
          ci5: [],
          size1: "",
          size2: "",
          size3: "",
          size4: "",
          size5: "",
          sp1: 0,
          sp2: 0,
          sp3: 0,
          sp4: 0,
          sp5: 0,
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
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
        // window.location.href = "/products";
        // router.push("/products");
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

          <div className="md:grid md:grid-cols-2 gap-8 p-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
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
                        onChange={(_id) =>
                          field.onChange([...field.value, _id])
                        }
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
                        onChange={(tag) =>
                          field.onChange([...(field?.value || []), tag])
                        }
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
                  <TableColumn>Difference in Price</TableColumn>
                  <TableColumn>Total Price</TableColumn>
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
                      {form?.getValues("cp1") + form?.getValues("price")}
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
                      {form?.getValues("cp2") + form?.getValues("price")}
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
                      {form?.getValues("cp3") + form?.getValues("price")}
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
                      {form?.getValues("cp4") + form?.getValues("price")}
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
                      {form?.getValues("cp5") + form?.getValues("price")}
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
                </TableBody>
              </Table>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Size Varients"
              title="Size Varients"
            >
              <Table aria-label="price varient table">
                <TableHeader>
                  <TableColumn> </TableColumn>
                  <TableColumn>Size</TableColumn>
                  <TableColumn>Difference in Price</TableColumn>
                  <TableColumn>Total Price</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>1.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size1"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 1"
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
                        name="sp1"
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
                      {form?.getValues("sp1") + form?.getValues("price")}
                    </TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>2.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size2"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 2"
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
                        name="sp2"
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
                      {form?.getValues("sp2") + form?.getValues("price")}
                    </TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>3.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size3"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 3"
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
                        name="sp3"
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
                      {form?.getValues("sp3") + form?.getValues("price")}
                    </TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>4.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size4"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 4"
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
                        name="sp4"
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
                      {form?.getValues("sp4") + form?.getValues("price")}
                    </TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell>5.</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="size5"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Size 5"
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
                        name="sp5"
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
                      {form?.getValues("sp5") + form?.getValues("price")}
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
