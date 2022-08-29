import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";

export default function SalesforceSelectionCardBase(
  {
    title,
    subTitle,
    tooltip,
    selectedOption,
    option,
    onClickFunction,
    contentBody,
    disabled,
    isLoading,
    className,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  const getTitleBar = () => {
    return (
      <IconTitleBar
        className={"m-3 mb-4"}
        icon={faSalesforce}
        iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
        title={title}
        subTitle={subTitle}
        iconSize={"5x"}
        titleClassName={"mx-auto mt-2"}
        subTitleClassName={"mx-auto"}
      />
    );
  };

  return (
    <SelectionIconCardBase
      selectedOption={selectedOption}
      option={option}
      titleBar={getTitleBar()}
      contentBody={contentBody}
      onClickFunction={onClickFunction}
      tooltip={tooltip}
      disabled={disabled}
      isLoading={isLoading}
      className={className}
    />
  );
}

SalesforceSelectionCardBase.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  iconColor: PropTypes.string,
  selectedOption: PropTypes.any,
  option: PropTypes.any,
  tooltip: PropTypes.string,
  onClickFunction: PropTypes.func,
  contentBody: PropTypes.any,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};