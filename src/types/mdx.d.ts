// mdx.d.ts
declare module "*.mdx" {
  import { ComponentType } from "react";

  interface MDXProps {
    locale?: string;
    section?: string;
  }

  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
}
