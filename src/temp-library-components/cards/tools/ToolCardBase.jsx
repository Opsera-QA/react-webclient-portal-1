import PropTypes from "prop-types";
import React from "react";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";
import ToolCardFooter from "temp-library-components/cards/tools/ToolCardFooter";
import ToolCardBody from "temp-library-components/cards/tools/ToolCardBody";

export default function ToolCardBase(
  {
    toolModel,
    onClickFunction,
    tooltip,
  }) {
  const getTitleBar = () => {
    const icon = getLargeVendorIconFromToolIdentifier(toolModel?.getData("tool_identifier"));

    if (hasStringValue(icon) === true) {
      return (
        <IconTitleBar
          iconString={icon}
          title={`${toolModel.getData("name")}`}
        />
      );
    }

    return (
      <IconTitleBar
        formattedIcon={icon}
        title={`${toolModel.getData("name")}`}
      />
    );
  };

  const getToolCardBody = () => {
    return (
      <ToolCardBody
        toolModel={toolModel}
      />
    );
  };

  if (toolModel == null) {
    return undefined;
  }

  return (
    <IconCardContainerBase
      cardFooter={<ToolCardFooter />}
      titleBar={getTitleBar()}
      contentBody={getToolCardBody()}
      onClickFunction={onClickFunction}
      tooltip={tooltip}
    />
  );
}

ToolCardBase.propTypes = {
  toolModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
};