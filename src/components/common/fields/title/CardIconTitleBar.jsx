import React from "react";
import PropTypes from "prop-types";
import {
  cutOffExcessCharacters,
  ensureStringFallsMeetsCharacterLimits,
  hasStringValue,
} from "components/common/helpers/string-helpers";
import LoadingIcon from "components/common/icons/LoadingIcon";
import IconBase from "components/common/icons/IconBase";

export default function CardIconTitleBar(
  {
    title,
    titleClassName,
    subTitle,
    subTitleClassName,
    icon,
    iconString,
    formattedIcon,
    iconColor,
    iconSize,
    isLoading,
    inactive,
    characterLimit,
    className,
  }) {
  const parsedTitle = ensureStringFallsMeetsCharacterLimits(title, characterLimit);

  const getIcon = () => {
    if (hasStringValue(iconString) === true) {
      return (
        <div
          className={"d-flex"}
          style={{
            height: "100px",
          }}
        >
          <div className={"my-auto"}>
            {iconString}
          </div>
        </div>
      );
    }

    if (formattedIcon) {
      return (
        <div
          className={"d-flex"}
          style={{
            height: "100px",
          }}
        >
          <div className={"my-auto"}>
            {formattedIcon}
          </div>
        </div>
      );
    }

    return (
      <div
        className={"d-flex"}
        style={{
          height: "100px",
        }}
      >
        <div className={"my-auto"}>
          <IconBase
            icon={icon}
            iconSize={iconSize}
            iconColor={iconColor}
          />
        </div>
      </div>
    );
  };

  const getStateColumn = () => {
    if (inactive != null) {
      return (
        <div className={"d-flex w-100"}>
          <div className="mx-auto">{inactive ? "Inactive" : "Active"}</div>
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (hasStringValue(subTitle) === true || isLoading === true) {
      return (
        <div
          style={{
            fontSize: "16px",
          }}
        >
          <div
            className={"small d-flex"}
          >
            <div className={subTitleClassName}>
              <IconBase
                isLoading={isLoading}
                className={"mr-2"}
                iconSize={"sm"}
              />
              {subTitle}
            </div>
          </div>
        </div>
      );
    }
  };

  const getTitle = () => {
    if (hasStringValue(title) === true) {
      return (
        <div className={"d-flex w-100 mt-3"}>
          <div className={titleClassName}>
            <div className={"icon-card-title"}>
              {parsedTitle}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <div className="d-flex">
        <div className={"mx-auto h-100 mt-2"}>
          <div className={"my-auto"}>
            {getIcon()}
          </div>
        </div>
      </div>
      {getTitle()}
      {getSubtitle()}
      {getStateColumn()}
    </div>
  );
}


CardIconTitleBar.propTypes = {
  className: PropTypes.string,
  inactive: PropTypes.bool,
  title: PropTypes.string,
  titleClassName: PropTypes.string,
  subTitle: PropTypes.string,
  subTitleClassName: PropTypes.string,
  icon: PropTypes.object,
  iconString: PropTypes.string,
  formattedIcon: PropTypes.object,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
  characterLimit: PropTypes.number,
  isLoading: PropTypes.bool
};

CardIconTitleBar.defaultProps = {
  characterLimit: 60,
  iconSize: "3x",
};