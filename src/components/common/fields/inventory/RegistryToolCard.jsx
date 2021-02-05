import React from "react";
import PropTypes from "prop-types";
import {faWrench} from "@fortawesome/pro-light-svg-icons";
import ToolLinkButton from "components/common/buttons/inventory/ToolLinkButton";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import DescriptionField from "components/common/fields/text/DescriptionField";
import CreateAndUpdateDateFieldBase from "components/common/fields/date/CreateAndUpdateDateFieldBase";
import ToolIdentifierVendorIconField from "components/common/fields/icon/ToolIdentifierVendorIconField";

function RegistryToolCard({ toolData, isLoading, loadToolInNewWindow }) {
  const getTitleBar = () => {
    console.log("tool Identifier: " + JSON.stringify(toolData.getData("tool_identifier")))
    return (
      <IconTitleBar
        className={"title"}
        icon={<ToolIdentifierVendorIconField dataObject={toolData} fieldName={"tool_identifier"} />}
        title={`${toolData.getData("name")}`}
        isLoading={isLoading}
      />
    );
  };

  if (isLoading) {
    return <IconCardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  return (
    <IconCardContainerBase titleBar={getTitleBar()} isLoading={isLoading} className={"tool-registry-card"}>
      <div className="w-100">
        <div className="description-height small pl-1">
          <DescriptionField dataObject={toolData} fieldName={"description"} />
        </div>
        <div className="date-and-button">
          <div className="small pl-1">
            <CreateAndUpdateDateFieldBase
              className={"mt-3 mb-1"}
              dataObject={toolData}
              createdAtFieldName={"createdAt"}
              updatedAtFieldName={"updatedAt"}
            />
          </div>
          <div>
            <ToolLinkButton
              toolId={toolData.getData("_id")}
              className={"w-100 mt-1"}
              loadToolInNewWindow={loadToolInNewWindow}
              variant={"outline-primary"}
            />
          </div>
        </div>
      </div>
    </IconCardContainerBase>
  );
}

RegistryToolCard.propTypes = {
  toolData: PropTypes.object,
  isLoading: PropTypes.bool,
  loadToolInNewWindow: PropTypes.bool
};

export default RegistryToolCard;
