"use client";

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { ProductFormSchema } from "@/lib/types";
import { productFormSchemaValidation } from "@/lib/validations";
import { categories, colors, sizes } from "@/lib/constants";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Label } from "./ui/label";

const AddProduct = () => {
  const [imageFiles, setImageFiles] = useState<Record<string, File[]>>({});

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchemaValidation),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      sizes: [],
      colors: [],
      images: {},
    },
  });

  const handleImageUpload = (color: string, files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    setImageFiles((prev) => ({
      ...prev,
      [color]: fileArray,
    }));

    // Convert files to base64 or store file objects
    const reader = new FileReader();
    reader.onload = () => {
      form.setValue(`images.${color}` as keyof ProductFormSchema, reader.result as string);
    };

    reader.readAsDataURL(files[0]);
  };

  const handleSubmitProduct: SubmitHandler<ProductFormSchema> = async (data) => {
    console.log({ data }, "<----handleSubmitProduct");
    console.log({ imageFiles }, "<----uploaded files");

    // Here you would typically:
    // 1. Upload images to storage (Cloudinary, S3, etc.)
    // 2. Get image URLs
    // 3. Submit product data with image URLs to your API
  };

  const selectedColors = form.watch("colors");

  console.log({ formwatch: form.watch(), selectedColors }, "<----selectedColors");

  return (
    <SheetContent className="w-full max-w-2xl">
      <ScrollArea className="h-screen scrollbar">
        <SheetHeader className="pr-4">
          <SheetTitle className="mb-4">Add Product</SheetTitle>

          <SheetDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitProduct)} className="space-y-8">
                {/* Product Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter the name of the product.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Short Description */}
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter the short description of the product.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>Enter the description of the product.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} value={field.value} />
                      </FormControl>
                      <FormDescription>Enter the price of the product.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the category of the product.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sizes */}
                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sizes</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-4 my-2">
                          {sizes.map((size) => (
                            <div className="flex items-center gap-2" key={size}>
                              <Checkbox
                                id={`size-${size}`}
                                checked={field.value?.includes(size)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, size]);
                                  } else {
                                    field.onChange(currentValues.filter((v) => v !== size));
                                  }
                                }}
                              />

                              <Label htmlFor={`size-${size}`} className="text-xs cursor-pointer">
                                {size}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </FormControl>

                      <FormDescription>Select the available sizes for the product.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Colors */}
                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colors</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 my-2">
                            {colors.map((color) => (
                              <div className="flex items-center gap-2" key={color}>
                                <Checkbox
                                  id={`color-${color}`}
                                  checked={field.value?.includes(color)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValues, color]);
                                    } else {
                                      field.onChange(currentValues.filter((v) => v !== color));
                                    }
                                  }}
                                />

                                <Label htmlFor={`color-${color}`} className="text-xs flex items-center gap-2 cursor-pointer">
                                  <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }} />
                                  {color}
                                </Label>
                              </div>
                            ))}
                          </div>

                          {/* Image upload for selected colors */}
                          {selectedColors && selectedColors.length > 0 && (
                            <div className="mt-8 space-y-4">
                              <p className="text-sm font-medium">Upload images for selected colors:</p>

                              {selectedColors.map((color) => (
                                <div className="flex items-center gap-4 p-3 border rounded-md" key={color}>
                                  {/* Color swatch */}
                                  <div className="flex items-center gap-2 min-w-[100px]">
                                    <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }} />
                                    <span className="text-sm">{color}</span>
                                  </div>

                                  {/* Input for image upload */}
                                  <Input type="file" accept="image/*" multiple onChange={(e) => handleImageUpload(color, e.target.files)} className="flex-1" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>

                      <FormDescription>Select the available colors for the product.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? <Loader className="animate-spin mx-auto" size={20} /> : "Submit"}
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </ScrollArea>
    </SheetContent>
  );
};

export default AddProduct;
