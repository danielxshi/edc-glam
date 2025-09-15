// Ensures params is NOT a Promise for App Router pages
declare module "next" {
  interface PageProps {
    params?: Record<string, string | string[]> & { [key: string]: string };
    searchParams?: Record<string, string | string[] | undefined>;
  }
}

