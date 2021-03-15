import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";

function IconBase({ isLoading, icon, className }) {
  const getIcon = () => {
    if (isLoading) {
      return <LoadingIcon isLoading={isLoading} />;
    }

    return <FontAwesomeIcon icon={icon} fixedWidth />;
  }

  if (icon == null) {
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
  className: PropTypes.string
};

export default React.memo(IconBase);