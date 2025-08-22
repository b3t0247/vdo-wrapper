import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin();
const withMDXPlugin = withMDX({ extension: /\.mdx$/ });

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withNextIntl(withMDXPlugin(nextConfig));
