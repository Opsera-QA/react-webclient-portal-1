import React from "react";
import PropTypes from "prop-types";
import {faWrench} from "@fortawesome/pro-light-svg-icons";
import ToolLinkButton from "components/common/buttons/inventory/ToolLinkButton";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import DescriptionField from "components/common/fields/text/DescriptionField";
import CreateAndUpdateDateFieldBase from "components/common/fields/date/CreateAndUpdateDateFieldBase";

function RegistryToolCard({ toolData, isLoading, loadToolInNewWindow }) {
  const getTitleBar = () => {
    return <IconTitleBar className={"title"} titleIcon={faWrench} title={`${toolData.getData("name")}`} isLoading={isLoading} />;
  };

  if (isLoading) {
    return <IconCardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  return (
    <IconCardContainerBase titleBar={getTitleBar()} isLoading={isLoading} className={"tool-registry-card"}>
      <div className="h-100 w-100">
        <div className="description-height small">
          <DescriptionField dataObject={toolData} fieldName={"description"} />
        </div>
        <div className="small">
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
            className={"w-100 mt-auto ml-auto"}
            loadToolInNewWindow={loadToolInNewWindow}
            variant={"outline-primary"}
          />
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
