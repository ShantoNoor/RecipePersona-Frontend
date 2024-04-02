import { useState } from "react";
import Spinner from "./Spinner";

const Image = ({ src, alt = "image", ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <img
        style={{ display: !loading ? "block" : "none" }}
        onLoad={() => setLoading(false)}
        src={src}
        alt={alt}
        title={alt}
        {...props}
      />
      {loading && (
        <div className="bg-gray-500 h-full w-full flex items-center justify-center dark:bg-gray-500 object-cover object-center animate-pulse">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Image;
