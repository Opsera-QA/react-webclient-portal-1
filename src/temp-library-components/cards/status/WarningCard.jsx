import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import { faExclamationTriangle } from "@fortawesome/pro-light-svg-icons";
import CreateWorkflowWizard from "components/wizard/free_trial/workflows/CreateWorkflowWizard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function WarningCard(
  {
    title,
    subTitle,
    tooltip,
    description,
    selectedOption,
    onClickFunction,
    option,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  const getTitleBar = () => {
    return (
      <IconTitleBar
        icon={faExclamationTriangle}
        iconColor={themeConstants.COLOR_PALETTE.OPSERA_GOLD}
        title={title}
        subTitle={subTitle}
        titleClassName={"px-1 mx-auto"}
        subTitleClassName={"px-1 mb-2 mx-auto"}
        iconSize={"4x"}
      />
    );
  };

  const getDescription = () => {
    if (description) {
      return (
        <div className={"my-3"}>
          <div className={"small pl-1"}>
            {description}
          </div>
        </div>
      );
    }
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

WarningCard.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  iconColor: PropTypes.string,
  selectedOption: PropTypes.any,
  option: PropTypes.any,
  tooltip: PropTypes.string,
  onClickFunction: PropTypes.func,
};