import PropTypes from "prop-types";
import React from "react";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import useComponentStateReference from "hooks/useComponentStateReference";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";
import { faSearch, faSitemap } from "@fortawesome/pro-light-svg-icons";
import CardFooterBase from "../../../temp-library-components/cards/CardFooterBase";

export const SALESFORCE_INSIGHTS_TYPES = {
  LOOKUP: "lookup",
  DEPENDENCY_ANALYSER: "dependency_analyser",
};

export const SALESFORCE_INSIGHTS_TYPE_LABELS = {
  LOOKUP: "Salesforce Lookup",
  DEPENDENCY_ANALYSER: "Dependency Analyser",
};

export default function SalesforceInsightsOptionCardBase(
  {
    title,
    subTitle,
    description,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
    disabled,
    warningMessage,
    children,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    return (
      <CardIconTitleBar
        icon={getIconForWorkspaceResourceType()}
        iconColor={getHighlightedBorderColor()}
        title={title}
        subTitle={subTitle}
        titleClassName={"px-1 mx-auto"}
        subTitleClassName={"px-1 mx-auto"}
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

  const getIconForWorkspaceResourceType = () => {
    switch (option) {
      case SALESFORCE_INSIGHTS_TYPES.LOOKUP:
        return faSearch;
      case SALESFORCE_INSIGHTS_TYPES.DEPENDENCY_ANALYSER:
        return faSitemap;
    }
  };

  const getCardFooter = () => {
    switch (option) {
      case SALESFORCE_INSIGHTS_TYPES.LOOKUP:
        return (
          <CardFooterBase
            backgroundColor={themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE}
            color={themeConstants.COLOR_PALETTE.WHITE}
            text={"Component Lookup"}
          />
        );
      case SALESFORCE_INSIGHTS_TYPES.DEPENDENCY_ANALYSER:
        return (
          <CardFooterBase
            backgroundColor={themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE}
            color={themeConstants.COLOR_PALETTE.WHITE}
            text={"Dependency Analyser"}
          />
        );
    }
  };

  const getHighlightedBorderColor = () => {
    switch (option) {
      case SALESFORCE_INSIGHTS_TYPES.LOOKUP:
        return themeConstants.COLOR_PALETTE.SALESFORCE_BLUE;
      case SALESFORCE_INSIGHTS_TYPES.DEPENDENCY_ANALYSER:
        return themeConstants.COLOR_PALETTE.SALESFORCE_BLUE;
    }
  };

  return (
    <SelectionIconCard
      cardFooter={getCardFooter()}
      selectedOption={selectedOption}
      option={option}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      disabled={disabled}
      tooltip={tooltip}
      warningMessage={warningMessage}
      highlightedBorderColor={getHighlightedBorderColor()}
    >
      {children}
    </SelectionIconCard>
  );
}

SalesforceInsightsOptionCardBase.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  iconColor: PropTypes.string,
  selectedOption: PropTypes.any,
  option: PropTypes.any,
  warningMessage: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.any,
};