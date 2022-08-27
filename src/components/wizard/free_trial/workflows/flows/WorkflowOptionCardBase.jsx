import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";

export default function WorkflowOptionCardBase(
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
  const getTitleBar = () => {
    return (
      <IconTitleBar
        icon={icon}
        iconColor={iconColor}
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
    <SelectionIconCardBase
      selectedOption={selectedOption}
      option={option}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      tooltip={tooltip}
    />
  );
}

WorkflowOptionCardBase.propTypes = {
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