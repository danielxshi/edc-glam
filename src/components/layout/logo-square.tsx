import clsx from "clsx";
import LogoIcon from "./../icons/logo";
import Logo from "./../../../public/images/logo-edc-glam-v2.png";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx("flex flex-none items-center justify-center", {
        "h-[40px] rounded-xl": !size,

      })}
    >
      {/* <LogoIcon
        className={clsx({
          "h-[16px] w-[16px]": !size,
          "h-[10px] w-[10px]": size === "sm",
        })}
      /> */}
      <img
        src={Logo.src}
        alt="EDCGLAM Logo"
        className={clsx({
          "h-[128px]": !size,
        })}
      />
    </div>
  );
}
