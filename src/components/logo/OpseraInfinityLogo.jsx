import React from "react";
import * as PropType from "prop-types";
import ImageBase from "temp-library-components/image/ImageBase";

export default function OpseraInfinityLogo(
  {
    desiredHeight,
    desiredWidth,
    className,
  }) {
  return (
    <ImageBase
      className={className}
      maxWidth={desiredWidth}
      maxHeight={desiredHeight}
      altText={"Opsera Inc."}
      imageSource={"/img/logos/opsera_bird_infinity_171_126.png"}
    />
  );
}

OpseraInfinityLogo.propTypes = {
  desiredHeight: PropType.number,
  desiredWidth: PropType.number,
  className: PropType.string,
};
