import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";

function IconBase(
  {
    isLoading,
    icon,
    className,
    iconClassName,
    iconSize,
    iconStyling,
    onClickFunction,
  }) {
  const getIcon = () => {
    if (isLoading) {
      return (
        <LoadingIcon
          isLoading={isLoading}
          iconSize={iconSize}
        />
      );
    }

    return (
      <FontAwesomeIcon
        style={iconStyling}
        onClick={onClickFunction}
        icon={icon}
        size={iconSize}
        fixedWidth
        className={iconClassName}
      />
    );
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
  iconSize: PropTypes.string,
  onClickFunction: PropTypes.func,
  iconClassName: PropTypes.string,
  iconStyling: PropTypes.object,
};

export default React.memo(IconBase);