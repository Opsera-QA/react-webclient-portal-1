import React from "react";
import PropTypes from "prop-types";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import DescriptionField from "components/common/fields/text/DescriptionField";
import CreateAndUpdateDateFieldBase from "components/common/fields/date/CreateAndUpdateDateFieldBase";
import {
  getLargeVendorIconFromToolIdentifier
} from "components/common/helpers/icon-helpers";
import ToolIdentifierLinkButton from "components/common/buttons/admin/tool_identifier/ToolIdentifierLinkButton";

function ToolIdentifierCard({ toolIdentifierModel, isLoading, loadTaskInNewWindow }) {
  const getTitleBar = () => {
    let icon = getLargeVendorIconFromToolIdentifier(toolIdentifierModel?.getData("identifier"));

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
        title={`${toolIdentifierModel?.getData("name")}`}
        isLoading={isLoading}
      />
    );
  };


  const getDescription = () => {
    return (
      <div className="description-height small pl-1">
      <DescriptionField dataObject={toolIdentifierModel} fieldName={"description"} />
    </div>
    );
  };

  if (isLoading) {
    return <IconCardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  return (
    <IconCardContainerBase
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      isLoading={isLoading}
      className={"vertical-selection-card"}
    >
      <div className="date-and-button">
        <div className="small pl-1">
          <CreateAndUpdateDateFieldBase className={"mt-3 mb-1"} model={toolIdentifierModel} />
        </div>
        <div>
          <ToolIdentifierLinkButton
            toolIdentifierId={toolIdentifierModel?.getData("_id")}
            className={"w-100 mt-1"}
            openInNewWindow={loadTaskInNewWindow}
            variant={"primary"}
          />
        </div>
      </div>
    </IconCardContainerBase>
  );
}

ToolIdentifierCard.propTypes = {
  toolIdentifierModel: PropTypes.object,
  isLoading: PropTypes.bool,
  loadTaskInNewWindow: PropTypes.bool
};

export default ToolIdentifierCard;
