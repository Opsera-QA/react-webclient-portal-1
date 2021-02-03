import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import {faWrench} from "@fortawesome/pro-light-svg-icons";
import ToolLinkButton from "components/common/buttons/inventory/ToolLinkButton";
import CardContainerBase from "components/common/card_containers/CardContainerBase";
import TagField from "components/common/fields/multiple_items/TagField";
import TitleBar from "components/common/fields/TitleBar";
import DateFieldBase from "components/common/fields/date/DateFieldBase";

function RegistryToolCard({ toolData, isLoading, loadToolInNewWindow }) {
  const getTitleBar = () => {
    return <TitleBar titleIcon={faWrench} title={`Tool: [${toolData.getData("name")}]`} isLoading={isLoading} inactive={toolData?.getData("active") !== true} />;
  };

  if (isLoading) {
    return <CardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  // TODO: rewrite to be like Todd's requirements
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
        <ToolLinkButton toolId={toolData.getData("_id")} loadToolInNewWindow={loadToolInNewWindow}/>
      </div>
    </CardContainerBase>
  );
}

RegistryToolCard.propTypes = {
  toolData: PropTypes.object,
  isLoading: PropTypes.bool,
  loadToolInNewWindow: PropTypes.bool
};

export default RegistryToolCard;
