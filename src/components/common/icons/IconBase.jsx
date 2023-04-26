import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";
import {hasStringValue} from "components/common/helpers/string-helpers";

function IconBase(
  {
    isLoading,
    icon,
    className,
    iconClassName,
    iconSize,
    iconStyling,
    onClickFunction,
    iconTransformProperties,
    spinIcon,
    disabled,

    // TODO: Remove?
    iconTitle,
    iconColor,
  }) {
  const getIconClassNames = () => {
    let iconClassNames = "";

    if (hasStringValue(iconClassName) === true) {
      iconClassNames = iconClassName;
    }

    if (onClickFunction != null) {
      iconClassNames = disabled === true ? `${iconClassNames} not-allowed` : `${iconClassNames} pointer`;
    }

    return iconClassNames;
  };

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
        onClick={disabled !== true ? onClickFunction : undefined}
        icon={icon}
        spin={spinIcon}
        size={iconSize}
        transform={iconTransformProperties}
        fixedWidth
        className={getIconClassNames()}
        title={iconTitle}
        color={iconColor}
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
  spinIcon: PropTypes.bool,
  iconTransformProperties: PropTypes.string,
  iconTitle: PropTypes.string,
  iconColor: PropTypes.string,
  disabled: PropTypes.bool,
};

export default React.memo(IconBase);