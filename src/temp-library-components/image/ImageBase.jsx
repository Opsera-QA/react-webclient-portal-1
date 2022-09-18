import React from "react";
import * as PropType from "prop-types";
import { numberHelpers } from "components/common/helpers/number/number.helpers";

export default function ImageBase(
  {
    scale,
    altText,
    defaultWidth,
    defaultHeight,
    imageSource,
    className,
  }) {
  const getWidthForScale = () => {
    if (numberHelpers.hasNumberValue(defaultWidth) !== true) {
      return undefined;
    }

    let scaleFactor = 1;

    if (numberHelpers.isNumberGreaterThan( 0, scale)) {
      scaleFactor = scale;
    }

    return scaleFactor * defaultWidth;
  };

  const getHeightForScale = () => {
    if (numberHelpers.hasNumberValue(defaultHeight) !== true) {
      return undefined;
    }

    let scaleFactor = 1;

    if (numberHelpers.isNumberGreaterThan( 0, scale)) {
      scaleFactor = scale;
    }

    return scaleFactor * defaultHeight;
  };

  const width = getWidthForScale();
  const height = getHeightForScale();

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
  scale: PropType.number,
  altText: PropType.string,
  imageSource: PropType.string,
  defaultHeight: PropType.number,
  defaultWidth: PropType.number,
  className: PropType.string,
};
