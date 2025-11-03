"use client";

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { UserFormSchema, UserFormSchemaValidation } from "@repo/types";
import { toast } from "react-toastify";
import { createUser } from "@/lib/actions/user.action";

const AddUser = () => {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(UserFormSchemaValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: [],
      password: "",
    },
  });

  const handleSubmitUser = useMutation({
    mutationFn: async (data: UserFormSchema) => {
      const res = await createUser(data);

      if (res && res.error) {
        throw new Error(res.error);
      }

      console.log({ data, res }, "<----handleSubmitUser");

      return res;
    },
    onSuccess: () => {
      toast.success("User created successfully");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add User</SheetTitle>
        <ScrollArea className="max-h-[40rem] pr-5 pb-2 scrollbar">
          <SheetDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => handleSubmitUser.mutate(data))} className="space-y-8">
                {/* Firstname */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter user first name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Lastname */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter user last name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter username.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Address */}
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Addresses</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="email1@gmail.com, email2@gmail.com"
                          onChange={(e) => {
                            const emails = e.target.value
                              .split(",")
                              .map((email) => email.trim())
                              .filter((email) => email);
                            field.onChange(emails);
                          }}
                        />
                      </FormControl>
                      <FormDescription>Only admin can see your email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormDescription>Enter user password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={handleSubmitUser.isPending} className="disabled:opacity-50 disabled:cursor-not-allowed">
                  {handleSubmitUser.isPending ? <Loader scale={22} className="animate-spin mx-auto" /> : "Submit"}
                </Button>
              </form>
            </Form>
          </SheetDescription>
        </ScrollArea>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddUser;
