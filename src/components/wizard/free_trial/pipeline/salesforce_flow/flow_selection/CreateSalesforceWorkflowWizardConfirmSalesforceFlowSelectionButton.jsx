import React from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import CreateButton from "components/common/buttons/saving/CreateButton";
import {
  CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS
} from "components/wizard/free_trial/pipeline/salesforce_flow/CreateSalesforcePipelineWizard";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {
  SALESFORCE_FLOW_OPTIONS
} from "components/wizard/free_trial/pipeline/salesforce_flow/flow_selection/CreateSalesforcePipelineWizardFlowSelectionScreen";
import pipelineActions from "components/workflow/pipeline-actions";

export default function CreateSalesforceWorkflowWizardConfirmSalesforceFlowSelectionButton(
  {
    setCurrentScreen,
    gitToolModel,
    selectedFlow,
    gitToolId,
    setGitToolId,
  }) {
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  const initializeSalesforcePipelineTemplate = async () => {
    const response = await pipelineActions.deployTemplateV2(
      getAccessToken,
      cancelTokenSource,
      "630386aebcb7dc0019d1c2c9", // TODO: how to dynamically pull this?
      );
  };

  const confirmFlow = async () => {
    switch (selectedFlow) {
      case SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC:
      case SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING:
      case SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP:
        await initializeSalesforcePipelineTemplate();
        break;
      case SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_ORGANIZATION_SYNC_TASK:
        console.log("adding soon");
    }
  };

  return (
    <div className={"m-3"}>
      <ButtonContainerBase>
        <CreateButton
          addAnotherOption={false}
          showSuccessToasts={false}
          customLabel={"Confirm"}
          createRecord={confirmFlow}
          recordDto={gitToolModel}
        />
      </ButtonContainerBase>
    </div>
  );
}

CreateSalesforceWorkflowWizardConfirmSalesforceFlowSelectionButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  selectedFlow: PropTypes.string,
  gitToolModel: PropTypes.object,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
};

