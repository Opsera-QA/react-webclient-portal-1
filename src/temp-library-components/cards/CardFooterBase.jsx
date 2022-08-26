import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function CardFooterBase(
  {
    backgroundColor,
    color,
    icon,
    text,
  }) {
  if (hasStringValue(text) !== true) {
    return undefined;
  }

  return (
    <div
      className={"d-flex w-100 py-1"}
      style={{
        backgroundColor: backgroundColor,
        color: color,
      }}
    >
      <div
        className={"mx-auto"}
        style={{
          fontSize: "13px",
          letterSpacing: "0.6px",
        }}
      >
        {/*<IconBase*/}
        {/*  icon={icon}*/}
        {/*  className={"mr-2"}*/}
        {/*  iconSize={"xl"}*/}
        {/*/>*/}
        {text}
      </div>
    </div>
  );
}

CardFooterBase.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.object,
};