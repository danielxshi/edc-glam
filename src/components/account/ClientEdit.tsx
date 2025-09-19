"use client";
import AddressForm from "@/components/account/AddressForm";

export default function ClientEdit({
  id,
  initial,
}: { id: string; initial: any }) {
  return <AddressForm id={id} initial={initial} />;
}
