import PropTypes from "prop-types";
import React from "react";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import DescriptionField from "components/common/fields/text/DescriptionField";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import { faTools } from "@fortawesome/pro-thin-svg-icons";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";

export default function ToolCardBase(
  {
    toolModel,
    onClickFunction,
    tooltip,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    let icon = getLargeVendorIconFromToolIdentifier(toolModel?.getData("tool_identifier"));

    if (typeof icon === "string") {
      icon = (
        <div className="d-flex w-100 h-100 mt-2 mb-4">
          <div className="my-auto tool-title-text">{icon}</div>
        </div>
      );
    }

    return (
      <IconTitleBar
        icon={icon}
        title={`${toolModel.getData("name")}`}
      />
    );
  };


  const getDescription = () => {
    return (
      <div>
        <div className={"small pl-1"}>
          <DescriptionField dataObject={toolModel} className={"description-height"} />
        </div>
      </div>
    );
  };

  const getTypeHeader = () => {
    return (
      <CardFooterBase
        backgroundColor={themeConstants.COLOR_PALETTE.GREEN}
        color={themeConstants.COLOR_PALETTE.WHITE}
        icon={faTools}
        text={"Tool"}
      />
    );
  };

  if (toolModel == null) {
    return undefined;
  }

  return (
    <IconCardContainerBase
      header={getTypeHeader()}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      className={"vertical-selection-card"}
      tooltip={tooltip}
      style={{
        // boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        cursor: mouseHelper.getMouseCursor(onClickFunction),
      }}
    />
  );
}

ToolCardBase.propTypes = {
  toolModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
};