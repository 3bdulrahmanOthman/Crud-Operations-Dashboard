"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";
import { CategoryProps, ProductProps } from "@/types";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { productSchema } from "@/lib/validation/products";
import { SelectDropdown } from "@/components/select-dropdown";
import FileUploader from "../../ui/file-uploader";
import { useForm } from "react-hook-form";

export type ProductFormValues = z.infer<typeof productSchema>;

interface ManageDataEntriesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: ProductProps;
  categories?: CategoryProps[];
  onAction: (values: ProductFormValues) => Promise<void>;
  loading?: boolean;
}

export function ManageDataEntries({
  open,
  onOpenChange,
  product,
  categories,
  onAction,
  loading,
}: ManageDataEntriesProps) {
  const isEdit = !!product;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: isEdit
      ? {
          ...product,
          categoryId: product.category?.id,
          isEdit,
        }
      : {
          title: "",
          price: 0,
          description: "",
          categoryId: 1,
          images: [],
          isEdit,
        },
  });

  const onSubmit = async (values: ProductFormValues) => {
    console.log("product", values)
    toast.promise(onAction(values), {
      loading: isEdit ? "Updating product..." : "Adding product...",
      success: () => `Product ${isEdit ? "updated" : "added"} successfully!`,
      error: (error) => getErrorMessage(error),
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the product details below. "
              : "Fill in the details to add a new product. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <Form {...form}>
            <form
              id="product-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              {/* Images */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        onChange={field.onChange}
                        value={field.value}
                        maxFiles={4}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product title" {...field} />
                    </FormControl>
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
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value || "0"))
                        }
                      />
                    </FormControl>
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
                      <Textarea
                        placeholder="Enter product description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        className="w-full"
                        defaultValue={String(field.value)}
                        onValueChange={(value) => {field.onChange(value) 
                          console.log(value)}}
                        placeholder="Select Category"
                        items={(categories ?? []).map((c: CategoryProps) => ({
                          label: c.name,
                          value: String(c.id),
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="product-form" disabled={loading}>
            {loading ? (
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isEdit ? "Update Product" : "Save Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
