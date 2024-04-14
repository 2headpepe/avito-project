import { fetchImagesPage } from "../../../store/images";
import { RootState } from "../../../store/store";
import { Carousel } from "antd";
import { useEffect } from "react";
import ImageWithLoader from "../../MainPage/components/ImageWithLoader/ImageWithLoader";
import { useAppDispatch, useAppSelector } from "../../../store/store";

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
  const dispatch = useAppDispatch();
  const images = useAppSelector((state: RootState) => state.images);

  useEffect(() => {
    dispatch(fetchImagesPage({ movieId, page: images.currentPage }));
  }, [images.currentPage, dispatch, movieId]);

  if (!images.imagesByMovieId[movieId]) return null;

  const imagesToShow = images.imagesByMovieId[movieId].length ? (
    images.imagesByMovieId[movieId].map((image) => (
      <ImageWithLoader
        width={width}
        height={height}
        alt={"No image available"}
        src={image.url}
        key={image.url}
      />
    ))
  ) : (
    <h4>Нет информации</h4>
  );
  return <Carousel style={{ width: width }}>{imagesToShow}</Carousel>;
};

export default ImageCarousel;
