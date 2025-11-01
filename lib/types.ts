import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Project = {
  image: string;
  name: string;
  description: string;
  stack: [StaticImport, string, boolean?][];
  href: string;
  demo: string;
};
