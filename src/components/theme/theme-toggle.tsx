"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Icons } from "../icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <ToggleGroup
      type="single"
      defaultValue="system"
      variant="default"
      className="bg-secondary"
      onValueChange={(value) => {
        if (value) setTheme(value);
      }}
      aria-label="Theme toggle"
    >
      <ToggleButton value="light" icon="sun" />
      <ToggleButton value="dark" icon="moon" />
      <ToggleButton value="system" icon="system" />
    </ToggleGroup>
  );
}

interface ToggleButtonProps {
  value: "light" | "dark" | "system";
  icon: keyof typeof Icons;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, icon }) => {
  const IconComponent = Icons[icon];
  return (
    <ToggleGroupItem
      value={value}
      aria-label={`${value.charAt(0).toUpperCase() + value.slice(1)} theme`}
    >
      <IconComponent className="size-4" />
    </ToggleGroupItem>
  );
};
