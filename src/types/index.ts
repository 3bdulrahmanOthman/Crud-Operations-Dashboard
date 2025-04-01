import { Icons } from "@/components/icons";

interface Options {
  label: string;
  value: string;
  count?: number;
  icon?: keyof typeof Icons;
}

interface NavItem {
  title: string;
  path?: string;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  badge?: string;
  label?: string;
  description?: string;
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

type SidebarNavItem = NavItemWithChildren;

interface ProductProps {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  category?: CategoryProps;
  categoryId: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryProps {
  id: string;
  name: string;
  slug: string;
  image: string;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}


export type {
  CategoryProps,
  UserProps,
  ProductProps,
  NavItem,
  NavItemWithChildren,
  SidebarNavItem,
  Options,
};
