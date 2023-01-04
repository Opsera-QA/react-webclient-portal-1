import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function OverlayIconBase(
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
    iconTitle,
    iconColor,
    overlayTitle,
    overlayBody,
    overlayPlacement,
    visible,
    overlayWidth,
  }) {
  if (icon == null || visible === false) {
    return null;
  }

  return (
    <TooltipWrapper
      innerText={overlayBody}
      title={overlayTitle}
      showCloseButton={false}
      placement={overlayPlacement}
      overlayWidth={overlayWidth}
    >
      <div>
        <IconBase
          className={className}
          iconStyling={iconStyling}
          onClickFunction={onClickFunction}
          isLoading={isLoading}
          icon={icon}
          spinIcon={spinIcon}
          iconSize={iconSize}
          iconTransformProperties={iconTransformProperties}
          iconClassName={iconClassName}
          iconTitle={iconTitle}
          iconColor={iconColor}
        />
      </div>
    </TooltipWrapper>
  );
}

OverlayIconBase.propTypes = {
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
  overlayTitle: PropTypes.string,
  overlayBody: PropTypes.any,
  overlayPlacement: PropTypes.string,
  visible: PropTypes.bool,
  overlayWidth: PropTypes.string,
};

export default React.memo(OverlayIconBase);