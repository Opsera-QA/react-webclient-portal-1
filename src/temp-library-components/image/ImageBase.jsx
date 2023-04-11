import React from "react";
import * as PropType from "prop-types";

export default function ImageBase(
  {
    altText,
    imageSource,
    className,
    imageClassName,
    width,
    height,
  }) {
  return (
    <div className={className}>
      <img
        className={imageClassName}
        alt={altText}
        src={imageSource}
        width={width}
        height={height}
      />
    </div>
  );
}

ImageBase.propTypes = {
  altText: PropType.string,
  imageSource: PropType.string,
  className: PropType.string,
  imageClassName: PropType.string,
  width: PropType.number,
  height: PropType.number,
};
