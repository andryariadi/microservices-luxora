import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Product } from "@/lib/types";
import { OrderType } from "@repo/types";
import { ScrollArea } from "./ui/scroll-area";

const CardList = ({ title, lateTransactions, popularProducts }: { title: string; lateTransactions?: OrderType[]; popularProducts?: Product[] }) => {
  return (
    <section className="space-y-5">
      <h1 className="text-lg font-medium">{title}</h1>

      {/* Cards */}
      <div className="flex flex-col gap-2">
        {/* Popular Products */}
        {title === "Popular Products" ? (
          popularProducts?.map((item) => (
            <Card key={item.id} className="flex-row items-center justify-between gap-4 p-4">
              <div className="relative w-12 h-12 rounded-sm overflow-hidden">
                <Image src={Object.values(item.images)[0] || ""} alt={item.name} fill className="object-cover" />
              </div>

              <CardContent className="flex-1 p-0">
                <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              </CardContent>

              <CardFooter className="p-0">${item.price}K</CardFooter>
            </Card>
          ))
        ) : (
          // Latest Transactions
          <ScrollArea className="max-h-[400px] overflow-y-auto scrollbar">
            {lateTransactions?.map((order) => (
              <Card key={order._id} className="flex-row items-center justify-between gap-4 p-4  mb-3">
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">{order.email}</CardTitle>
                  <Badge variant="secondary">{order.status}</Badge>
                </CardContent>
                <CardFooter className="p-0">${order.amount / 100}</CardFooter>
              </Card>
            ))}
          </ScrollArea>
        )}
      </div>
    </section>
  );
};

export default CardList;
