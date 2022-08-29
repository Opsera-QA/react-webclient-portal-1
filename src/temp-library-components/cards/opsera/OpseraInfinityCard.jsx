import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import { faExclamationTriangle } from "@fortawesome/pro-light-svg-icons";
import CreateWorkflowWizard from "components/wizard/free_trial/workflows/CreateWorkflowWizard";
import useComponentStateReference from "hooks/useComponentStateReference";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";

export default function OpseraInfinityCard(
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
  const getTitleBar = () => {
    return (
      <IconTitleBar
        className={"m-3 mb-4"}
        formattedIcon={
          <OpseraInfinityLogo scale={.75} />
        }
        title={title}
        subTitle={subTitle}
        titleClassName={"mx-auto mt-2"}
        subTitleClassName={"mx-auto"}
        iconSize={"4x"}
        isLoading={isLoading}
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

OpseraInfinityCard.propTypes = {
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