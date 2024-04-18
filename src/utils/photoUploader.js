import axios from "axios";
import { toast } from "sonner";

const photoUploader = (photo) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", photo);
    toast.promise(
      axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_apiKey_imagebb
        }`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      ),
      {
        loading: "Uploading image please wait ...",
        success: (res) => {
          const photoUrl = res.data.data.url;
          resolve(photoUrl);
          return "Image upload successfull";
        },
        error: (err) => {
          reject(null);
          toast.error("Unable to upload image");
          return err.message;
        },
      }
    );
  });
};

export default photoUploader;
