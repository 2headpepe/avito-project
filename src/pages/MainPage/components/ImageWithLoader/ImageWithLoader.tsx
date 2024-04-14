import { useState } from "react";
import styles from "./ImageWithLoader.module.css";
interface TImageWithLoaderProps {
  width?: number | string;
  height?: number | string;
  alt: string;
  src: string;
  hover?: JSX.Element;
}
const ImageWithLoader: React.FC<TImageWithLoaderProps> = ({
  width,
  height,
  alt,
  src,
  hover,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const imageStyle = {
    display: loaded ? "" : "none",
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.image}
      style={{
        width: width,
        height: height,
      }}
    >
      {!loaded && <div className={styles.loader}></div>}
      <img
        src={src}
        alt={alt}
        height={height}
        width={width}
        onLoad={() => setLoaded(true)}
        style={imageStyle}
      />
      {isHovered && loaded && hover}
    </div>
  );
};

export default ImageWithLoader;
