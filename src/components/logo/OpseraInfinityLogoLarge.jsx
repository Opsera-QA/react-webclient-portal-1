import React from "react";
import * as PropType from "prop-types";
import ImageBase from "temp-library-components/image/ImageBase";

export default function OpseraInfinityLogoLarge(
  {
    scale,
    className,
  }) {
  return (
    <ImageBase
      className={className}
      scale={scale}
      defaultWidth={958}
      defaultHeight={547}
      altText={"Opsera Inc."}
      imageSource={"/img/logos/opsera_bird_infinity_958_547.png"}
    />
  );
}

OpseraInfinityLogoLarge.propTypes = {
  scale: PropType.number,
  className: PropType.string,
};
