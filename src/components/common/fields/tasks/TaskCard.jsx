import React from "react";
import PropTypes from "prop-types";
import ToolLinkButton from "components/common/buttons/inventory/ToolLinkButton";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import DescriptionField from "components/common/fields/text/DescriptionField";
import CreateAndUpdateDateFieldBase from "components/common/fields/date/CreateAndUpdateDateFieldBase";
import {getLargeVendorIconFromToolIdentifier} from "components/common/helpers/icon-helpers";

function TaskCard({ taskData, isLoading, loadToolInNewWindow }) {
  const getTitleBar = () => {
    let icon = getLargeVendorIconFromToolIdentifier(process.env.REACT_APP_OPSERA_S3_STORAGE_URL, taskData?.getData("tool_identifier"));

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
        title={`${taskData.getData("name")}`}
        isLoading={isLoading}
      />
    );
  };


  const getDescription = () => {
    return (
      <div className="description-height small pl-1">
      <DescriptionField dataObject={taskData} fieldName={"description"} />
    </div>
    );
  };

  if (isLoading) {
    return <IconCardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  return (
    <IconCardContainerBase titleBar={getTitleBar()} contentBody={getDescription()} isLoading={isLoading} className={"tool-registry-card"}>
      <div className="date-and-button">
        <div className="small pl-1">
          <CreateAndUpdateDateFieldBase className={"mt-3 mb-1"} model={taskData} />
        </div>
        <div>
          <ToolLinkButton
            toolId={taskData?.getData("_id")}
            className={"w-100 mt-1"}
            loadToolInNewWindow={loadToolInNewWindow}
            variant={"primary"}
          />
        </div>
      </div>
    </IconCardContainerBase>
  );
}

TaskCard.propTypes = {
  taskData: PropTypes.object,
  isLoading: PropTypes.bool,
  loadToolInNewWindow: PropTypes.bool
};

export default TaskCard;
