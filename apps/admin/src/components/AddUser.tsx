"use client";

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UserFormSchema } from "@/lib/types";
import { userFormSchemaValidation } from "@/lib/validations";
import { ScrollArea } from "./ui/scroll-area";
import { Loader } from "lucide-react";

const AddUser = () => {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchemaValidation),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    },
  });

  const handleSubmitUser: SubmitHandler<UserFormSchema> = async (data) => {
    console.log({ data }, "<----handleSubmitUser");
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add User</SheetTitle>
        <ScrollArea className="max-h-[40rem] pr-5 pb-2 scrollbar">
          <SheetDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitUser)} className="space-y-8">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter user full name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Only admin can see your email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Only admin can see your phone number (optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter user address (optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter user city (optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">{form.formState.isSubmitting ? <Loader scale={22} className="animate-spin mx-auto" /> : "Submit"}</Button>
              </form>
            </Form>
          </SheetDescription>
        </ScrollArea>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddUser;
