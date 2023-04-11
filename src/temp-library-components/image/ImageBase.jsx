import React from "react";
import * as PropType from "prop-types";
import {Image} from "react-bootstrap";

export default function ImageBase(
  {
    altText,
    imageSource,
    className,
    width,
    height,
    maxWidth,
    maxHeight,
  }) {
  return (
    <div
      className={className}
      style={{
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      }}
    >
      <Image
        className={"img-fluid"}
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
  width: PropType.number,
  height: PropType.number,
  maxWidth: PropType.number,
  maxHeight: PropType.number,
};
