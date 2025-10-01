"use client";

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CategoryFormSchema } from "@/lib/types";
import { categoryFormSchemaValidation } from "@/lib/validations";
import { Loader } from "lucide-react";

const AddCategory = () => {
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchemaValidation),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmitCategory: SubmitHandler<CategoryFormSchema> = async (data) => {
    console.log({ data }, "<----handleSubmitCategory");
  };

  console.log("ariadi");

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add Category</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitCategory)} className="space-y-8">
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

              <Button type="submit">{form.formState.isSubmitting ? <Loader scale={22} className="animate-spin mx-auto" /> : "Submit"}</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddCategory;
