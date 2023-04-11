import React from "react";
import * as PropType from "prop-types";
import { numberHelpers } from "components/common/helpers/number/number.helpers";

export default function ImageBase(
  {
    altText,
    imageSource,
    className,
    width,
    height,
  }) {
  return (
    <div className={className}>
      <img
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
};
