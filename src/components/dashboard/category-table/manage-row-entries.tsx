"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { CategoryProps } from "@/types";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { useForm } from "react-hook-form";
import { categorySchema } from "@/lib/validation/categories";
import FileUploader from "@/components/ui/file-uploader";

export type CategoryFormValues = z.infer<typeof categorySchema>;

interface ManageCategoryEntryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: CategoryProps;
  onAction: (values: CategoryFormValues) => Promise<void>;
  loading?: boolean;
}

export function ManageCategoryEntry({
  open,
  onOpenChange,
  category,
  onAction,
  loading,
}: ManageCategoryEntryProps) {
  const isEdit = !!category;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: isEdit
      ? { ...category, image: [category.image], isEdit }
      : { name: "", image: [], isEdit },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    toast.promise(onAction(values), {
      loading: isEdit ? "Updating category..." : "Adding category...",
      success: () => `Category ${isEdit ? "updated" : "added"} successfully!`,
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update category details below."
              : "Fill in the details to add a new category."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <Form {...form}>
            <form
              id="category-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* Images */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        onChange={field.onChange}
                        value={field.value ?? []}
                        uploadEndpoint="categoryImage"
                        maxFiles={1}
                        maxSize={3}
                        customText={{
                          prompt: "Upload category image",
                          sizeInfo: "Max 3MB • 1 image only",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
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
            aria-label="Close dialog"
          >
            Cancel
          </Button>
          <Button type="submit" form="category-form" disabled={loading}>
            {loading && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Update Category" : "Save Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
