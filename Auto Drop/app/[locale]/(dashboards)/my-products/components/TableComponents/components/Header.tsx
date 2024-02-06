export default function Header({ title }: { title: string }) {
  return (
    <>
      <div className="flex text-[30px] text-[#253439]">{title}</div>
    </>
  );
}
