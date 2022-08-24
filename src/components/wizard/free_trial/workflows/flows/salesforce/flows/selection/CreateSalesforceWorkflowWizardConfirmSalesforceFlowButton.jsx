import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import pipelineActions from "components/workflow/pipeline-actions";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import { Button } from "react-bootstrap";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import taskActions from "components/tasks/task.actions";
import modelHelpers from "components/common/model/modelHelpers";
import salesforceOrganizationSyncTaskConfigurationMetadata from "components/tasks/details/tasks/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function CreateSalesforceWorkflowWizardConfirmSalesforceFlowButton(
  {
    setCurrentScreen,
    selectedFlow,
    className,
  }) {
  return (
    <div className={className}>
      <ButtonContainerBase>
        <Button
          disabled={hasStringValue(selectedFlow) !== true}
          onClick={() => setCurrentScreen()}
          variant={"primary"}
        >
        <span>
          <IconBase
            icon={faCheckCircle}
            className={"mr-2"}
          />
          Confirm Flow
        </span>
        </Button>
      </ButtonContainerBase>
    </div>
  );
}

CreateSalesforceWorkflowWizardConfirmSalesforceFlowButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  selectedFlow: PropTypes.string,
  className: PropTypes.string,
};

