import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateSalesforceWorkflowWizard from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import { faWandMagicSparkles } from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import FreeTrialWorkspaceFilterModel from "components/workspace/trial/views/freeTrialWorkspace.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { PIPELINE_TYPES } from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import { isTaskTypeOfCategory, TASK_TYPE_CATEGORIES } from "components/tasks/task.types";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

export default function SalesforceWorkflowSelectionCardView() {
  return (
    <div>
      Add cards
    </div>
  );
}

SalesforceWorkflowSelectionCardView.propTypes = {};


