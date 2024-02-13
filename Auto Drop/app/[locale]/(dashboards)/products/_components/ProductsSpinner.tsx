function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-full mx-auto min-w-screen ">
      <div className="animate-spin h-[20rem] w-[20rem] border-t-2 border-b-2 border-blue-500 rounded-full"></div>
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
