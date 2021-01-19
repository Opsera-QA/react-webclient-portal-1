import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DateFieldBase from "components/common/form_fields/DateFieldBase";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import {faWrench} from "@fortawesome/pro-light-svg-icons";
import ToolLinkButton from "components/common/buttons/inventory/ToolLinkButton";
import CardContainerBase from "components/common/card_containers/CardContainerBase";
import DetailScreenTitleBar from "components/common/panels/detail_view_container/DetailScreenTitleBar";
import TagField from "components/common/fields/multiple_items/TagField";

function RegistryToolSummaryCard({ toolData, isLoading, loadToolInNewWindow }) {
  const getTitleBar = () => {
    return <DetailScreenTitleBar titleIcon={faWrench} title={`Tool: [${toolData.getData("name")}]`} isLoading={isLoading} inactive={toolData?.getData("active") !== true} />;
  };

  if (isLoading) {
    return <CardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  return (
    <CardContainerBase titleBar={getTitleBar()} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={toolData} fieldName={"description"}/>
      </div>
      <div className="mb-2">
        <TagField dataObject={toolData} fieldName={"tags"}/>
      </div>
      <div className="d-flex justify-content-between">
        <DateFieldBase dataObject={toolData} fieldName={"createdAt"}/>
        <DateFieldBase dataObject={toolData} fieldName={"updatedAt"}/>
        <ToolLinkButton pipelineId={toolData.getData("_id")} loadPipelineInNewWindow={loadToolInNewWindow}/>
      </div>
    </CardContainerBase>
  );
}

RegistryToolSummaryCard.propTypes = {
  toolData: PropTypes.object,
  isLoading: PropTypes.bool,
  loadToolInNewWindow: PropTypes.bool
};

export default RegistryToolSummaryCard;
