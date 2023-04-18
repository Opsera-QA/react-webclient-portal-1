import React from "react";
import * as PropType from "prop-types";
import {ImageBase} from "@opsera/react-vanity-set";

export default function OpseraInfinityLogoLarge(
  {
    desiredHeight,
    desiredWidth,
    className,
  }) {
  return (
    <ImageBase
      className={className}
      height={desiredHeight}
      width={desiredWidth}
      altText={"Opsera Inc."}
      imageSource={"/img/logos/opsera_bird_infinity_958_547.png"}
    />
  );
}

OpseraInfinityLogoLarge.propTypes = {
  desiredHeight: PropType.number,
  desiredWidth: PropType.number,
  className: PropType.string,
};
