import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateSalesforceWorkflowWizard from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import { faRectangleList, faWandMagicSparkles } from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import FreeTrialWorkspaceFilterModel from "components/workspace/trial/views/freeTrialWorkspace.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { PIPELINE_TYPES } from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import { isTaskTypeOfCategory, TASK_TYPE_CATEGORIES } from "components/tasks/task.types";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import FilterContainer from "components/common/table/FilterContainer";
import FreeTrialWorkspaceItemViews from "components/workspace/trial/views/all/FreeTrialWorkspaceItemViews";

export default function FreeTrialSelectSalesforceWorkflowScreen() {
  const [workspaceItems, setWorkspaceItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskMetadata, setTaskMetadata] = useState(false);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setWorkspaceItems([]);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setWorkspaceItems([]);
      setIsLoading(true);
      await getWorkspaceItems();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getWorkspaceItems = async () => {
    const response = await workspaceActions.getFreeTrialWorkspaceItems(
      getAccessToken,
      cancelTokenSource,
    );
    const items = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(items)) {
      setTaskMetadata(response?.data?.taskMetadata);
      const filteredItems = [];

      // TODO: We should make a route that handles this
      const salesforcePipelines = items.filter((workspaceItem) => {
        const types = workspaceItem?.type;

        return (
          workspaceItem?.workspaceType === workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE
          && Array.isArray(types) && types[0] === PIPELINE_TYPES.SALESFORCE
        );
      });

      filteredItems.push(...salesforcePipelines);

      const salesforceTasks = items.filter((workspaceItem) => {
        const type = workspaceItem?.type;

        return (
          workspaceItem?.workspaceType === workspaceConstants.WORKSPACE_ITEM_TYPES.TASK
          && isTaskTypeOfCategory(type, TASK_TYPE_CATEGORIES.SALESFORCE, false)
        );
      });
      filteredItems.push(...salesforceTasks);

      setWorkspaceItems([...filteredItems]);
    }
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          customMessage={"Loading Salesforce Workflows"}
        />
      );
    }

    return (
      <FreeTrialWorkspaceItemViews
        workspaceItems={workspaceItems}
        isLoading={isLoading}
        loadData={loadData}
        taskMetadata={taskMetadata}
      />
    );
  };

  return (

    <FilterContainer
      body={getBody()}
      titleIcon={faRectangleList}
      isLoading={isLoading}
      loadData={loadData}
      title={"Select a Salesforce Workflow"}
      className={"px-2 pb-2"}
    />
  );
}

FreeTrialSelectSalesforceWorkflowScreen.propTypes = {};


