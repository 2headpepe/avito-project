import { fetchImagesPage } from "../../../lib/images/images";
import { AppDispatch, RootState } from "../../../lib/store";
import { Carousel } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageWithLoader from "../../MainPage/components/ImageWithLoader/ImageWithLoader";

interface IImageCarousel {
  movieId: number;
  width?: number | string;
  height?: number | string;
}
const ImageCarousel: React.FC<IImageCarousel> = ({
  movieId,
  width,
  height,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const images = useSelector((state: RootState) => state.images);

  useEffect(() => {
    dispatch(fetchImagesPage({ movieId, page: images.currentPage }));
  }, [images.currentPage, dispatch, movieId]);

  if (!images.imagesByMovieId[movieId]) return null;

  const imagesToShow = images.imagesByMovieId[movieId].map((image) => (
    <ImageWithLoader
      width={width}
      height={height}
      alt={"No image available"}
      src={image.url}
      key={image.url}
    />
  ));
  return <Carousel style={{ width: width }}>{imagesToShow}</Carousel>;
};

export default ImageCarousel;
