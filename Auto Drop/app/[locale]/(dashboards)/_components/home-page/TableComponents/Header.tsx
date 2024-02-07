export default function Header({ title }: { title: string }) {
  return (
    <>
      <div className="flex text-lg text-[#253439]">{title}</div>
    </>
  );
}
