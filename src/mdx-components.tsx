// src/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import TranslatedHeading from "@/components/TranslatedHeading";
import { useMemo } from "react";

const components: MDXComponents = {
  TranslatedHeading: (props) => <TranslatedHeading {...props} />,
  // Add more MDX components here as needed
};

export function useMDXComponents(): MDXComponents {
  return useMemo(() => components, []);
}
