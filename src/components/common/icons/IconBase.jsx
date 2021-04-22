import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";

function IconBase({ isLoading, icon, className, iconSize }) {
  const getIcon = () => {
    if (isLoading) {
      return <LoadingIcon isLoading={isLoading} iconSize={iconSize} />;
    }

    return <FontAwesomeIcon icon={icon} size={iconSize} fixedWidth />;
  };

  if (icon == null && isLoading !== true) {
    return null;
  }

  return (
    <span className={className}>
      {getIcon()}
    </span>
  );
}

IconBase.propTypes = {
  isLoading: PropTypes.bool,
  icon: PropTypes.object,
  className: PropTypes.string,
  iconSize: PropTypes.string
};

export default React.memo(IconBase);