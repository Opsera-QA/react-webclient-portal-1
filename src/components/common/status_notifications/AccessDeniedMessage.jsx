import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import IconBase from "components/common/icons/IconBase";
import { faExclamationTriangle } from "@fortawesome/pro-light-svg-icons";

export default function AccessDeniedMessage(
  {
    text,
    className,
  }) {
  return (
    <div className={"d-flex"}>
      <IconBase
        icon={faExclamationTriangle}
        iconSize={"lg"}
        className={"mr-3 danger-red"}
      />
      <H5FieldSubHeader
        subheaderText={text}
        className={className}
      />
    </div>
  );
}

AccessDeniedMessage.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

AccessDeniedMessage.defaultProps = {
  text: "Access Denied! You do not have permissions to access this resource.",
  className: "danger-red",
};