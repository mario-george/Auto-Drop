import LogoutProtectWrapper from "./LogoutHandler";
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <div className="">
        {/* <LogoutProtectWrapper /> */}
        {children}
      </div>
    </>
  );
}
