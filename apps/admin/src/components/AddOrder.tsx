"use client";

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { OrderFormSchema } from "@/lib/types";
import { orderFormSchemaValidation } from "@/lib/validations";
import { Loader } from "lucide-react";

const AddOrder = () => {
  const form = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchemaValidation),
    defaultValues: {
      amount: "",
      userId: "",
    },
  });

  const handleSubmitOrder: SubmitHandler<OrderFormSchema> = async (data) => {
    console.log({ data }, "<----handleSubmitOrder");
  };

  console.log("andry");

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add Order</SheetTitle>

        <SheetDescription asChild>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitOrder)} className="space-y-8">
              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>

                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>

                    <FormDescription>Enter the amount of the order.</FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* User ID */}
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormDescription>Enter the User ID.</FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Status</FormLabel>

                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Enter the status of the order.</FormDescription>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Button type="submit">{form.formState.isSubmitting ? <Loader scale={22} className="animate-spin mx-auto" /> : "Submit"}</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddOrder;
