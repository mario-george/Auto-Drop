import { useState } from "react";
import { BounceLoader } from "react-spinners";

export default function useLoader() {
  const [loading, setLoading] = useState(false);
  const overlayStyles = {
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.5)",

    zIndex: 99999,
  };

  const loadingHandler = () => {
    setLoading((prevLoadingState: boolean) => !loading);
  };

  const LoaderComponent = loading ? (
    <div>
      {" "}
        <div style={overlayStyles} className="fixed w-screen h-screen inset-0 flex items-center justify-center">

      <BounceLoader
        // cssOverride={overlayStyles}
        size={150}
        color="white"
        // className="!fixed !w-screen !h-screen"
      />
    </div>
    </div>
  ) : (
    <></>
  );

  return { loadingHandler, LoaderComponent, loading, setLoading };
}
