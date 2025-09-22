// components/announcement/AnnouncementBar.server.tsx
import { getAnnouncement } from "@/lib/announcement";
import AnnouncementBarClient from "./AnnouncementBarClient";

export default async function AnnouncementBarServer() {
  const a = await getAnnouncement();
  if (!a) return null;
  return <AnnouncementBarClient announcement={a} />;
}
