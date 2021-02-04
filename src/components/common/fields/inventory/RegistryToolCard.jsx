import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import {faWrench} from "@fortawesome/pro-light-svg-icons";
import ToolLinkButton from "components/common/buttons/inventory/ToolLinkButton";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import DescriptionField from "components/common/fields/text/DescriptionField";

function RegistryToolCard({ toolData, isLoading, loadToolInNewWindow }) {
  const getTitleBar = () => {
    return <IconTitleBar className={"title"} titleIcon={faWrench} title={`${toolData.getData("name")}`} isLoading={isLoading} inactive={toolData?.getData("active") !== true} />;
  };

  if (isLoading) {
    return <IconCardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  return (
    <IconCardContainerBase titleBar={getTitleBar()} isLoading={isLoading} className={"tool-registry-card"}>
      <small><DescriptionField dataObject={toolData} fieldName={"description"}/></small>
      <small><DateFieldBase dataObject={toolData} fieldName={"createdAt"}/></small>
      <small><DateFieldBase dataObject={toolData} fieldName={"updatedAt"}/></small>
      <div className="h-100 w-100">
        <div className="mt-auto mx-auto">
          <ToolLinkButton toolId={toolData.getData("_id")} loadToolInNewWindow={loadToolInNewWindow}/>
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
