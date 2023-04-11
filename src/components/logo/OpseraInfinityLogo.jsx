import React from "react";
import * as PropType from "prop-types";
import ImageBase from "temp-library-components/image/ImageBase";

export default function OpseraInfinityLogo(
  {
    desiredHeight,
    desiredWidth,
    className,
    imageClassName,
  }) {
  return (
    <ImageBase
      className={className}
      imageClassName={imageClassName}
      width={desiredWidth}
      height={desiredHeight}
      altText={"Opsera Inc."}
      imageSource={"/img/logos/opsera_bird_infinity_171_126.png"}
    />
  );
}

OpseraInfinityLogo.propTypes = {
  desiredHeight: PropType.number,
  desiredWidth: PropType.number,
  className: PropType.string,
  imageClassName: PropType.string,
};
