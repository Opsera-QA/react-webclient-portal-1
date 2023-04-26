import React from "react";
import PropTypes from "prop-types";
import {
  getLargeVendorIconFromToolIdentifier
} from "components/common/helpers/icon-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import ToolCardHeader from "temp-library-components/cards/tools/ToolCardHeader";
import ToolCardBody from "temp-library-components/cards/tools/ToolCardBody";
import ToolCardFooter from "temp-library-components/cards/tools/ToolCardFooter";

function ToolIdentifierCard(
  {
    toolIdentifierModel,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    const icon = getLargeVendorIconFromToolIdentifier(toolIdentifierModel?.getData("identifier"));

    if (hasStringValue(icon) === true) {
      return (
        <CardIconTitleBar
          iconString={icon}
          title={`${toolIdentifierModel?.getData("name")}`}
        />
      );
    }

    return (
      <CardIconTitleBar
        formattedIcon={icon}
        title={`${toolIdentifierModel?.getData("name")}`}
      />
    );
  };

  if (toolIdentifierModel == null) {
    return undefined;
  }

  return (
    <SelectionIconCard
      className={"h-100"}
      cardHeader={<ToolCardHeader toolModel={toolIdentifierModel} />}
      titleBar={getTitleBar()}
      contentBody={<ToolCardBody toolModel={toolIdentifierModel} />}
      onClickFunction={onClickFunction}
      tooltip={tooltip}
      cardFooter={<ToolCardFooter />}
      selectedOption={selectedOption}
      option={option}
      highlightedBorderColor={themeConstants.COLOR_PALETTE.GREEN}
    />
  );
}

ToolIdentifierCard.propTypes = {
  toolIdentifierModel: PropTypes.object,
  toolModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  selectedOption: PropTypes.string,
  option: PropTypes.string,
};

export default ToolIdentifierCard;
