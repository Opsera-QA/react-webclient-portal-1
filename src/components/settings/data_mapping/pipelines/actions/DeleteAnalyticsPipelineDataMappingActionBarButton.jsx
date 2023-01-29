import React from "react";
import PropTypes from "prop-types";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {useHistory} from "react-router-dom";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import {
  analyticsPipelineDataMappingHelper
} from "components/settings/data_mapping/pipelines/analyticsPipelineDataMapping.helper";

export default function DeleteAnalyticsPipelineDataMappingActionBarButton(
  {
    analyticsPipelineDataMappingModel,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();

  const handleDeleteFunction = async () => {
    return await analyticsPipelineDataMappingModel.deleteModel();
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Analytics Pipeline Data Mapping"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(analyticsPipelineDataMappingHelper.getManagementScreenLink())}
      />
    );
  };

  if (analyticsPipelineDataMappingModel.canDelete() !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={showOverlayFunction}
      type={"Analytics Pipeline Data Mapping"}
      className={className}
    />
  );
}

DeleteAnalyticsPipelineDataMappingActionBarButton.propTypes = {
  analyticsPipelineDataMappingModel: PropTypes.object,
  className: PropTypes.string,
};
