import React from "react";
import PropTypes from "prop-types";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import DescriptionField from "components/common/fields/text/DescriptionField";
import {
  getLargeVendorIconFromToolIdentifier
} from "components/common/helpers/icon-helpers";
import SelectToolIdentifierButton
  from "components/common/buttons/select/admin/tool_identifier/SelectToolIdentifierButton";

function ToolIdentifierSelectionCard({ toolIdentifierModel, setDataFunction, isLoading }) {
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
      <SelectToolIdentifierButton
        className={"w-100 mt-1"}
        toolIdentifier={toolIdentifierModel?.getPersistData()}
        setDataFunction={setDataFunction}
      />
    </IconCardContainerBase>
  );
}

ToolIdentifierSelectionCard.propTypes = {
  toolIdentifierModel: PropTypes.object,
  isLoading: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

export default ToolIdentifierSelectionCard;
