import ActivateClient from "./client";

export const dynamic = "force-dynamic"; // optional, avoids caching during activation

type Params = { slug?: string[] };

export default async function ActivatePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug = [] } = await params; // 👈 await because params is a Promise
  const [id, token] = slug;

  return <ActivateClient id={id} token={token} />;
}
