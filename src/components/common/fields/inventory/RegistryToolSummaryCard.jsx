import React from "react";
import PropTypes from "prop-types";
import {faWrench} from "@fortawesome/pro-light-svg-icons";
import ToolLinkButton from "components/common/buttons/inventory/ToolLinkButton";
import CardContainerBase from "components/common/card_containers/CardContainerBase";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import TitleBar from "components/common/fields/TitleBar";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import DescriptionField from "components/common/fields/text/DescriptionField";

function RegistryToolSummaryCard({ toolData, isLoading, loadToolInNewWindow, closePanel }) {
  const getTitleBar = () => {
    return <TitleBar titleIcon={faWrench} title={`${toolData.getData("name")}`} isLoading={isLoading} inactive={toolData?.getData("active") !== true} />;
  };

  if (isLoading) {
    return <CardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  return (
    <CardContainerBase titleBar={getTitleBar()} isLoading={isLoading}>
      <div className={"px-2"}>
        <div className="mb-1">
          <DescriptionField dataObject={toolData} fieldName={"description"}/>
        </div>
        <div className="mb-2">
          <TagField dataObject={toolData} fieldName={"tags"} showLabel={false} />
        </div>
        <div className="d-flex justify-content-between">
          <DateFieldBase dataObject={toolData} fieldName={"createdAt"} className={"mt-auto mb-1"}/>
          <DateFieldBase dataObject={toolData} fieldName={"updatedAt"} className={"mt-auto mb-1"}/>
          <ToolLinkButton toolId={toolData.getData("_id")} loadToolInNewWindow={loadToolInNewWindow} closePanel={closePanel}/>
        </div>
      </div>
    </CardContainerBase>
  );
}

RegistryToolSummaryCard.propTypes = {
  toolData: PropTypes.object,
  isLoading: PropTypes.bool,
  loadToolInNewWindow: PropTypes.bool,
  closePanel: PropTypes.func
};

export default RegistryToolSummaryCard;
