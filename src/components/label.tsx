import clsx from "clsx";
import Price from "./price";

export default function Label({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 p-2 srccontainer/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        }
      )}
    >
      <div className="flex flex-col mx-auto items-center rounded p-1 font-semibold text-[#191919]  ">
        <h5 className="line-clamp-2 flex-grow leading-none uppercase tracking-widest text-xxs">
          {title}
        </h5>
        <Price
          className="flex-none rounded-full text-[#191919] text-xxs pt-1 font-light"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden src[275px]/label:inline"
        />
      </div>
    </div>
  );
}