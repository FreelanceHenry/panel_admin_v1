import { URL_HOST_DEV, URL_HOST_PROD } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  imageId: number;
};

const ImageView = ({ imageId }: Props) => {
  const [image, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await axios.get(`${URL_HOST_PROD}/api/v1/Image/${imageId}`);
      setImageSrc(res.data);
    };

    imageId && fetchImage();
  }, [imageId]);

  return image ? (
    <img
      src={`${URL_HOST_PROD}/uploads/${image}`}
      alt="Uploaded"
      className="w-28 h-28 object-contain"
    />
  ) : (
    <p className="loader"></p>
  );
};

export default ImageView;
