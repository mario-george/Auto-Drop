export function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-full mx-auto min-w-screen ">
      <div className="animate-spin h-[10rem] w-[10rem] tab:h-[20rem] tab:w-[20rem] border-t-2 border-b-2 border-blue-500 rounded-full"></div>
    </div>
  );
}

export function FetchSpinner() {
  return (
    <div className="z-30 absolute inset-0 mx-auto my-auto bg-white/50 ">
      <div className="z-30 absolute inset-0 mx-auto my-auto animate-spin h-[7.5rem] w-[7.5rem] tab:h-[15rem] tab:w-[15rem] border-t-2 border-b-2 border-blue-500 rounded-full"></div>
    </div>
  );
}
export default function ProductsSpinner({ products, productsAR, lang }: any) {
  return (
    <>
      {products.length === 0 && lang == "en" && (
        <div className=" my-10 col-span-full">
          {" "}
          <Spinner />
        </div>
      )}
      {productsAR.length === 0 && lang == "ar" && (
        <div className=" my-10 col-span-full">
          {" "}
          <Spinner />
        </div>
      )}
    </>
  );
}
