"use client";

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { colors, sizes } from "@/lib/constants";
import { Loader } from "lucide-react";
import { Label } from "./ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/actions/category.action";
import { CategoryType, ProductFormSchema, ProductFormSchemaValidation } from "@repo/types";
import { createProduct } from "@/lib/actions/product.action";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddProduct = () => {
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(ProductFormSchemaValidation),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      categorySlug: "",
      basePrice: 0,
      availableSizes: [],
      availableColors: [],
      availableImages: {},
      variants: [],
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Auto-generate variants when sizes or colors change
  const watchedSizes = form.watch("availableSizes");
  const watchedColors = form.watch("availableColors");

  useEffect(() => {
    if (watchedSizes.length > 0 && watchedColors.length > 0) {
      const generatedVariants: ProductFormSchema["variants"] = [];

      watchedSizes.forEach((size) => {
        watchedColors.forEach((color) => {
          generatedVariants.push({
            size,
            color,
            stock: 0,
            price: 0,
          });
        });
      });

      form.setValue("variants", generatedVariants);
    } else {
      form.setValue("variants", []);
    }
  }, [form, watchedSizes, watchedColors]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, color: string) => {
    const file = e.target.files?.[0];

    console.log({ file }, "<--handleImageUpload");

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "luxora");

        console.log({ formData }, "<--handleImageUpload2");

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await res.json();

        console.log({ data }, "<--handleImageUpload3");

        if (data.secure_url) {
          const currentImage = form.getValues("availableImages") || {};
          form.setValue("availableImages", {
            ...currentImage,
            [color]: data.secure_url,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to upload image");
      }
    }
  };

  const handleSubmitProduct = useMutation({
    mutationFn: async (data: ProductFormSchema) => {
      console.log({ data }, "<----handleSubmitProduct1");

      const res = await createProduct(data);

      if (res && res.error) {
        throw new Error(res.error);
      }

      console.log({ res }, "<---handleSubmitProduct2");

      return res;
    },
    onSuccess: () => {
      toast.success("Product created successfully");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateVariantField = (index: number, field: keyof ProductFormSchema["variants"][0], value: number) => {
    const variants = form.getValues("variants") || [];

    const updatedVariants = [...variants];

    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value,
    };
    form.setValue("variants", updatedVariants);
  };

  return (
    <SheetContent className="w-full max-w-2xl">
      <ScrollArea className="h-screen scrollbar">
        <SheetHeader className="pr-4">
          <SheetTitle className="mb-4">Add Product</SheetTitle>

          <SheetDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => handleSubmitProduct.mutate(data))} className="space-y-8">
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

                {/* Base Price */}
                <FormField
                  control={form.control}
                  name="basePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} value={field.value} />
                      </FormControl>
                      <FormDescription>Enter the base price of the product.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                {categories && (
                  <FormField
                    control={form.control}
                    name="categorySlug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat: CategoryType) => (
                                <SelectItem key={cat.id} value={cat.slug}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>Enter the category of the product.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Sizes */}
                <FormField
                  control={form.control}
                  name="availableSizes"
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
                  name="availableColors"
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
                        </div>
                      </FormControl>

                      <FormDescription>Select the available colors for the product.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image */}
                {form.watch("availableColors").length > 0 && (
                  <FormField
                    control={form.control}
                    name="availableImages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            {form.watch("availableColors")?.map((color) => (
                              <div className="mb-4 flex items-center gap-4" key={color}>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                                  <span className="text-sm font-medium min-w-[80px]">{color}:</span>
                                </div>

                                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, color)} />

                                {field.value?.[color] ? <span className="text-green-600 text-sm">Image selected</span> : <span className="text-red-600 text-sm">Image required</span>}
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Variants */}
                {form.watch("variants") && form.watch("variants")!.length > 0 && (
                  <div className="space-y-4">
                    <FormLabel>Product Variants</FormLabel>
                    <div className="space-y-4 max-h-60 overflow-y-auto p-2 border rounded-md scrollbar">
                      {form.watch("variants")!.map((variant, index) => (
                        <div key={`${variant.size}-${variant.color}-${index}`} className="p-3 border rounded-md space-y-3">
                          {/* Color & Size */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: variant.color }} />

                              <span className="font-medium capitalize">
                                {variant.color} - {variant.size.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {/* Stock */}
                          <div className="grid grid-cols-2 gap-4">
                            <FormItem>
                              <FormLabel className="text-xs">Stock</FormLabel>
                              <FormControl>
                                <Input type="number" value={variant.stock} onChange={(e) => updateVariantField(index, "stock", Number(e.target.value))} min={0} />
                              </FormControl>
                            </FormItem>

                            {/* Price */}
                            <FormItem>
                              <FormLabel className="text-xs">Price</FormLabel>
                              <FormControl>
                                <Input type="number" value={variant.price} onChange={(e) => updateVariantField(index, "price", Number(e.target.value))} min={1} />
                              </FormControl>
                            </FormItem>
                          </div>
                        </div>
                      ))}
                    </div>

                    <FormDescription>Variants are automatically generated based on selected sizes and colors. You can customize stock and price for each variant.</FormDescription>

                    <FormMessage>{form.formState.errors.variants?.message}</FormMessage>
                  </div>
                )}

                <Button type="submit" disabled={form.formState.isSubmitting || handleSubmitProduct.isPending}>
                  {form.formState.isSubmitting || handleSubmitProduct.isPending ? <Loader className="animate-spin mx-auto" size={20} /> : "Submit"}
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
