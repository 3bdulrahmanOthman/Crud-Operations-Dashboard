"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { RenderIcon } from "@/lib/utils";
import { useMemo } from "react";

interface Option {
  label?: string;
  icon?: string;
  iconProps?: React.SVGProps<SVGSVGElement>;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "destructive";
  separator?: boolean;
  disabled?: boolean;
}

interface DataTableActionsProps {
  options: Option[];
}

export function DataTableActions({ options }: DataTableActionsProps) {
  const renderedOptions = useMemo(() => (
    options.map(({ label, icon, separator, onClick, className, variant, disabled, iconProps }, index) => {
      if (separator) return <DropdownMenuSeparator key={`separator-${index}`} />;
      return (
        <DropdownMenuItem key={label} onClick={onClick} className={className} disabled={disabled} variant={variant}>
          {label}
          {icon && (
            <DropdownMenuShortcut>
              <RenderIcon icon={icon as keyof typeof Icons} {...iconProps} />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
      );
    })
  ), [options]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <Icons.ellipsis className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {renderedOptions}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
