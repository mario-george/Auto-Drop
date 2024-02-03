"use client";
interface HomePageCardProps {
  firstEl?: any;
  secondEl?: any;
  ThirdEl?: React.ReactNode;
}

export default function Page({
  firstEl,
  secondEl,
  ThirdEl,
}: HomePageCardProps) {
  return (
    <>
      <div className="flex justify-between bg-white rounded-md">
        <div className="flex flex-col space-y-3">
          <div>{firstEl}</div>
          <div>{secondEl}</div>
        </div>
        {ThirdEl}
      </div>
    </>
  );
}
