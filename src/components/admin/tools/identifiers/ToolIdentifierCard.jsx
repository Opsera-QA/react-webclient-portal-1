import React from "react";
import PropTypes from "prop-types";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import {
  getLargeVendorIconFromToolIdentifier
} from "components/common/helpers/icon-helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";
import ToolCardFooter from "temp-library-components/cards/tools/ToolCardFooter";

export default function ToolIdentifierCard(
  {
    toolIdentifierModel,
    onClickFunction,
    tooltip,
  }) {
  const getTitleBar = () => {
    const icon = getLargeVendorIconFromToolIdentifier(toolIdentifierModel?.getData("identifier"));

    if (hasStringValue(icon) === true) {
      return (
        <IconTitleBar
          iconString={icon}
          title={`${toolIdentifierModel?.getData("name")}`}
        />
      );
    }

    return (
      <IconTitleBar
        formattedIcon={icon}
        title={`${toolIdentifierModel?.getData("name")}`}
      />
    );
  };

  return (
    <IconCardContainerBase
      titleBar={getTitleBar()}
      cardFooter={<ToolCardFooter />}
      onClickFunction={() => onClickFunction(toolIdentifierModel)}
      tooltip={tooltip}
    />
  );
}

ToolIdentifierCard.propTypes = {
  toolIdentifierModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
};
