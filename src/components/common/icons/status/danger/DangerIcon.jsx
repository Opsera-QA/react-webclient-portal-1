import React from "react";
import IconBase from "components/common/icons/IconBase";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function DangerIcon({ className }) {
  return (
    <IconBase
      icon={faExclamationCircle}
      iconClassName={"danger-red"}
      className={className}
    />
  );
}

DangerIcon.propTypes = {
  handleDeleteClick: PropTypes.func,
  className: PropTypes.string,
  tooltipBody: PropTypes.any,
  disabled: PropTypes.bool
};

export default DangerIcon;