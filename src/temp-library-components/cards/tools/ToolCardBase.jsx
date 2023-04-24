import PropTypes from "prop-types";
import React from "react";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";
import ToolCardFooter from "temp-library-components/cards/tools/ToolCardFooter";
import ToolCardBody from "temp-library-components/cards/tools/ToolCardBody";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import useComponentStateReference from "hooks/useComponentStateReference";
import ToolCardHeader from "temp-library-components/cards/tools/ToolCardHeader";

export default function ToolCardBase(
  {
    toolModel,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    const icon = getLargeVendorIconFromToolIdentifier(toolModel?.getData("tool_identifier"));

    if (hasStringValue(icon) === true) {
      return (
        <CardIconTitleBar
          iconString={icon}
          title={`${toolModel?.getData("name")}`}
        />
      );
    }

    return (
      <CardIconTitleBar
        formattedIcon={icon}
        title={`${toolModel?.getData("name")}`}
      />
    );
  };

  if (toolModel == null) {
    return undefined;
  }

  return (
    <SelectionIconCard
      className={"h-100"}
      cardHeader={<ToolCardHeader toolModel={toolModel} />}
      titleBar={getTitleBar()}
      contentBody={<ToolCardBody toolModel={toolModel} />}
      onClickFunction={onClickFunction}
      tooltip={tooltip}
      cardFooter={<ToolCardFooter />}
      selectedOption={selectedOption}
      option={option}
      highlightedBorderColor={themeConstants.COLOR_PALETTE.GREEN}
    />
  );
}

ToolCardBase.propTypes = {
  toolModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  selectedOption: PropTypes.string,
  option: PropTypes.string,
};