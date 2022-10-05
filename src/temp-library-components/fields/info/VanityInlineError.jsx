import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import { faExclamationCircle } from "@fortawesome/pro-light-svg-icons";

export default function VanityInlineError(
  {
    text,
    className,
  }) {
  const getStyle = () => {
    return ({
      borderRadius: "1rem",
      // boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)",
      color: "#dc3545",
    });
  };

  return (
    <div
      className={className}
      style={getStyle()}
    >
      <div className={"d-flex"}>
        <div>
          <IconBase
            icon={faExclamationCircle}
            className={"mr-2"}
            iconSize={"lg"}
          />
        </div>
        <div>
          {text}
        </div>
      </div>
    </div>
  );
}

VanityInlineError.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};