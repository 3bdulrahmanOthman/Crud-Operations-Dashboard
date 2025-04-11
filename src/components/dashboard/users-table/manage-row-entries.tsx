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
import { UserProps } from "@/types";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { SelectDropdown } from "@/components/select-dropdown";
import { useForm } from "react-hook-form";
import { AvatarUploader } from "@/components/ui/file-uploader/avatar-uploader";
import { userSchema } from "@/lib/validation/user";
import { PasswordInput } from "@/components/password-input";

export type UserFormValues = z.infer<typeof userSchema>;

interface ManageDataEntriesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: UserProps;
  onAction: (values: UserFormValues) => Promise<void>;
  loading?: boolean;
}

export function ManageDataEntries({
  open,
  onOpenChange,
  user,
  onAction,
  loading,
}: ManageDataEntriesProps) {
  const isEdit = !!user;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: isEdit
      ? { ...user, isEdit }
      : {
          name: "",
          email: "",
          password: "",
          avatar: "",
          role: "customer",
          isEdit,
        },
  });

  const onSubmit = (values: UserFormValues) => {
    toast.promise(onAction(values), {
      loading: isEdit ? "Updating user..." : "Adding user...",
      success: () => `User ${isEdit ? "updated" : "added"} successfully!`,
      error: (error) => getErrorMessage(error),
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(state) => onOpenChange(state)}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the user details below."
              : "Fill in the details to add a new user."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              {/* Avatar */}
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel className="sr-only">Avatar</FormLabel>
                    <FormControl>
                      <AvatarUploader
                        onChange={field.onChange}
                        value={field.value}
                        size="lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* First Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              {!isEdit && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        className="w-full"
                        defaultValue={String(field.value)}
                        onValueChange={(value) => {
                          field.onChange(value);
                          console.log(value);
                        }}
                        placeholder="Select Category"
                        items={["customer", "admin"].map((r) => ({
                          label: r.charAt(0).toUpperCase() + r.slice(1),
                          value: r,
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
            aria-label="Close dialog"
          >
            Cancel
          </Button>
          <Button type="submit" form="user-form" disabled={loading}>
            {loading ? (
              <Icons.loader className="mr-2 size-4 animate-spin" />
            ) : null}
            {isEdit ? "Update User" : "Save User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
