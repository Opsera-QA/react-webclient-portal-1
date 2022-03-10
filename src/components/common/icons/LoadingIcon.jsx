import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";

function LoadingIcon({ className, iconSize }) {
  return (
    <IconBase
      iconSize={iconSize}
      className={className}
      spinIcon={true}
      icon={faSpinner}
    />
  );
}

LoadingIcon.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.string
};

export default React.memo(LoadingIcon);