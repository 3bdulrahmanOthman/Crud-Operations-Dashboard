"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ProductProps } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: ProductProps;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductViewModal({
  open,
  onOpenChange,
  product,
  onClose,
  onEdit,
  onDelete,
}: ProductViewModalProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Detailed view of the product
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-90 grid gap-6 py-4 pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Carousel */}
            <Card className="shadow-lg rounded-lg overflow-hidden bg-transparent border-2 border-dashed p-0">
              <CardContent className="p-6">
                <Carousel>
                  <CarouselContent>
                    {product.images.length > 0 ? (
                      product.images.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className="flex justify-center"
                        >
                          <Image
                            src={image}
                            alt={product.title}
                            width={400}
                            height={400}
                            className="rounded-md object-cover w-full"
                          />
                        </CarouselItem>
                      ))
                    ) : (
                      <CarouselItem className="flex justify-center">
                        <Image
                          src="/placeholder.svg"
                          alt="Placeholder"
                          width={400}
                          height={400}
                          className="rounded-md object-cover w-full"
                        />
                      </CarouselItem>
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="top-[calc(100%+0.5rem)] translate-y-0 left-0" />
                  <CarouselNext className="top-[calc(100%+0.5rem)] translate-y-0 left-2 translate-x-full" />
                </Carousel>
              </CardContent>
            </Card>

            {/* Product Information */}
            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Price
                  </h3>
                  <p className="text-2xl font-bold">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Category
                  </h3>
                  <p>{product.category?.name}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Description
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
                {product.createdAt && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Created
                      </h3>
                      <p className="text-sm">{formatDate(product.createdAt)}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onEdit}
              className="flex items-center"
            >
              <Icons.edit className="mr-2 size-4" /> Edit
            </Button>
            <Button
              variant="outline"
              onClick={onDelete}
              className="flex items-center text-destructive"
            >
              <Icons.trash className="mr-2 size-4" /> Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
