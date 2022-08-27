import PropTypes from "prop-types";
import React from "react";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function WorkflowCardBase(
  {
    icon,
    iconColor,
    title,
    subTitle,
    description,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    return (
      <IconTitleBar
        icon={
          <div className={"d-flex w-100 h-100 mt-2 mb-4"}>
            <div className={"my-auto tool-title-text"}>
              <IconBase
                icon={icon}
                iconSize={"2x"}
                iconColor={iconColor}
              />
            </div>
          </div>
        }
        title={title}
        subTitle={subTitle}
      />
    );
  };


  const getDescription = () => {
    return (
      <div className={"mt-3"}>
        <div className={"small pl-1"}>
          {description}
        </div>
      </div>
    );
  };

  return (
    <IconCardContainerBase
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      className={"vertical-selection-card"}
      tooltip={tooltip}
      style={{
        boxShadow: selectedOption === option ? "0 0 40px rgba(46, 25, 86, .25)" : undefined,
        borderRadius: "5px",
        cursor: mouseHelper.getMouseCursor(onClickFunction),
        borderColor: selectedOption === option ? themeConstants.COLOR_PALETTE.GOLD_HIGHLIGHT : undefined,
      }}
    />
  );
}

WorkflowCardBase.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  onClickFunction: PropTypes.string,
  tooltip: PropTypes.any,
  iconColor: PropTypes.string,
  selectedOption: PropTypes.any,
  option: PropTypes.any,
};