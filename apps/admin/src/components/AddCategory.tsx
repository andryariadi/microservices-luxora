"use client";

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { CategoryFormSchema, CategoryFormSchemaValidation } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/lib/actions/category.action";
import { toast } from "react-toastify";

const AddCategory = () => {
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(CategoryFormSchemaValidation),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  // const handleSubmitCategory: SubmitHandler<CategoryFormSchema> = async (data) => {
  //   console.log({ data }, "<----handleSubmitCategory");
  // };

  const handleSubmitCategory = useMutation({
    mutationFn: async (data: CategoryFormSchema) => {
      const res = await createCategory(data);

      console.log({ data, res }, "<----handleSubmitCategory");
    },
    onSuccess: () => {
      toast.success("Category created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  console.log({ handleSubmitCategory }, "<--addCategoryForm");

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add Category</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => handleSubmitCategory.mutate(data))} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter category name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter category slug.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">{form.formState.isSubmitting ? <Loader scale={22} className="animate-spin mx-auto" /> : "Submit"}</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddCategory;
