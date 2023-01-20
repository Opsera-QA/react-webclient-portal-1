import React from "react";
import * as PropType from "prop-types";
import ImageBase from "temp-library-components/image/ImageBase";

export default function OpseraInfinityLogo(
  {
    scale,
    className,
  }) {
  return (
    <ImageBase
      className={className}
      scale={scale}
      defaultWidth={171}
      defaultHeight={126}
      altText={"Opsera Inc."}
      imageSource={"/img/logos/opsera_bird_infinity_171_126.png"}
    />
  );
}

OpseraInfinityLogo.propTypes = {
  scale: PropType.number,
  className: PropType.string,
};
