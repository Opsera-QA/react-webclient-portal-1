import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { apiRequestHelper } from "temp-library-components/helpers/api/apiRequest.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { platformPipelineTemplateCatalogActions } from "../../../catalog/platform/platformPipelineTemplateCatalog.actions";
import { isMongoDbId } from "../../../../common/helpers/mongo/mongoDb.helpers";
import { pipelineHelper } from "../../../pipeline.helper";
import OverlayWizardButtonContainerBase from "../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import ErrorMessageFieldBase from "../../../../common/fields/text/message/ErrorMessageFieldBase";
import {
  pipelineTemplateIdentifierConstants
} from "../../../../admin/pipeline_templates/pipelineTemplateIdentifier.constants";
import {useHistory} from "react-router-dom";

const HEIGHT = "700px";

export default function DeployBlankPipeline({
  setButtonContainer,
  backButtonFunction,
}) {
  const [initializationState, setInitializationState] = useState(
    apiRequestHelper.API_REQUEST_STATES.BUSY,
  );
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();
  const [pipelineId, setPipelineId] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    setButtonContainer(
      <OverlayWizardButtonContainerBase
        backButtonFunction={
          apiRequestHelper.API_REQUEST_STATES.ERROR
            ? backButtonFunction
            : undefined
        }
      />,
    );
  }, []);

  const createBlankPipeline = async () => {
    try {
      const response =
        await platformPipelineTemplateCatalogActions.deployPlatformTemplateByIdentifier(
          getAccessToken,
          cancelTokenSource,
          pipelineTemplateIdentifierConstants.PIPELINE_TEMPLATE_IDENTIFIERS
            .BLANK_PIPELINE_TEMPLATE,
        );
      const newPipelineId = response?.data?._id;
      if (isMongoDbId(newPipelineId) === true) {
        setPipelineId(newPipelineId);
        setInitializationState(apiRequestHelper.API_REQUEST_STATES.SUCCESS);
        return;
      }
      setInitializationState(apiRequestHelper.API_REQUEST_STATES.ERROR);
    } catch (error) {
      setInitializationState(apiRequestHelper.API_REQUEST_STATES.ERROR);
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(
          error,
          "Error Creating Blank Pipeline Template:",
        );
      }
    }
  };

  const getBody = () => {
    switch (initializationState) {
      case apiRequestHelper.API_REQUEST_STATES.BUSY:
        createBlankPipeline();
        return (
          <CenterLoadingIndicator
            customMessage={`Creating a new Pipeline with a Blank Pipeline Template`}
          />
        );
      case apiRequestHelper.API_REQUEST_STATES.ERROR:
        return (
          <CenteredContentWrapper>
            <ErrorMessageFieldBase
              showErrorLabel={false}
              message={
                "There was an issue finalizing the initialization for this Pipeline. Use the back button to re deploy the pipeline template."
              }
            />
          </CenteredContentWrapper>
        );
      case apiRequestHelper.API_REQUEST_STATES.SUCCESS:
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
        history.push(pipelineHelper.getDetailViewLink(pipelineId));
    }
  };

  return (
    <div
      style={{
        minHeight: HEIGHT,
      }}
    >
      {getBody()}
    </div>
  );
}

DeployBlankPipeline.propTypes = {
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func,
};
