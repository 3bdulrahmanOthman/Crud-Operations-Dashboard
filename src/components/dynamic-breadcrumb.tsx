"use client";

import { Fragment, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path,
      };
    });
  }, [pathname]);

  if (breadcrumbs.length === 0) return null;

  const firstCrumb = breadcrumbs[0];
  const middleCrumbs = breadcrumbs.slice(1, -1);
  const lastCrumb = breadcrumbs[breadcrumbs.length - 1];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {isMobile && breadcrumbs.length > 2 ? (
          <>
            {/* First Breadcrumb Item */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={firstCrumb.path}>{firstCrumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Middle Crumbs Dropdown */}
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "hover:bg-transparent size-8"
                  )}
                >
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle breadcrumb menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {middleCrumbs.map((crumb) => (
                    <DropdownMenuItem key={crumb.path} asChild>
                      <Link href={crumb.path}>{crumb.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Last Breadcrumb Item */}
            <BreadcrumbItem>
              <BreadcrumbPage>{lastCrumb.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          // Desktop View or Mobile with <= 3 items
          breadcrumbs.map((crumb, index) => (
            <Fragment key={crumb.path}>
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.path}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}