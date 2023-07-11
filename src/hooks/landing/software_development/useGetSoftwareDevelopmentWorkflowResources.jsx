import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {WORKFLOW_WIDGET_VIEWS} from "components/landing/v2/widgets/workspace/WorkflowWidgetNavigationBar";
import WorkflowWidgetFilterModel from "hooks/workspace/workflowWidget.filter.model";
import useSoftwareDevelopmentLandingActions
from "hooks/landing/software_development/useSoftwareDevelopmentLandingActions";

export default function useGetSoftwareDevelopmentWorkflowResources(
  currentView,
  fields,
  handleErrorFunction,
) {
  const [workflows, setWorkflows] = useState([]);
  const [workflowItemIds, setWorkflowItemIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [workflowWidgetFilterModel, setWorkflowWidgetFilterModel] = useState(new WorkflowWidgetFilterModel());
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const softwareDevelopmentLandingActions = useSoftwareDevelopmentLandingActions();

  useEffect(() => {
    setWorkflows([]);

    if (loadData && currentView) {
      loadData(getSoftwareDevelopmentLandingWorkflowResources, handleErrorFunction).catch(() => {});
    }
  }, [currentView]);

  const getSoftwareDevelopmentLandingWorkflowResources = async (
    newFilterModel = workflowWidgetFilterModel,
  ) => {
    setWorkflows([]);
    let response;

    switch (currentView) {
    case WORKFLOW_WIDGET_VIEWS.FOLLOWING:
      response = await softwareDevelopmentLandingActions.getSubscribedWorkflowResources(
        newFilterModel,
        fields,
        newFilterModel?.getData("active"),
      );
      break;
    case WORKFLOW_WIDGET_VIEWS.RECENT_ACTIVITY:
      response = await softwareDevelopmentLandingActions.getRecentWorkflowResources(
        newFilterModel,
        fields,
        newFilterModel?.getData("active"),
      );
      break;
    case WORKFLOW_WIDGET_VIEWS.MY_WORKFLOWS:
    default:
      response = await softwareDevelopmentLandingActions.getMyWorkspaceWorkflowResources(
        newFilterModel,
        fields,
        newFilterModel?.getData("active"),
      );
      break;
    }

    const items = DataParsingHelper.parseNestedArray(response, "data.data", []);
    const ids = DataParsingHelper.parseNestedArray(response, "data.sortedIds", []);
    setWorkflowItemIds([...ids]);
    setWorkflows([...items]);
    newFilterModel.updateTotalCount(DataParsingHelper.parseNestedInteger(response, "data.count", 0));
    newFilterModel.updateActiveFilters();
    setWorkflowWidgetFilterModel({...newFilterModel});
  };

  const hasMoreItems = currentPage * 12 < workflowItemIds.length;

  const loadMoreWorkflows = async () => {
    const startIndex = currentPage * 12;
    const idArray = workflowItemIds.slice(startIndex, startIndex + 12);

    const response = await softwareDevelopmentLandingActions.getWorkspaceWorkflowResourcesByIds(
      idArray,
    );
    const items = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setWorkflows([...workflows, ...items]);
    setCurrentPage(currentPage + 1);
  };

  return ({
    workflows: workflows,
    setWorkflows: setWorkflows,
    workflowWidgetFilterModel: workflowWidgetFilterModel,
    setWorkflowWidgetFilterModel: setWorkflowWidgetFilterModel,
    loadData: async (newFilterModel) => loadData(async () => getSoftwareDevelopmentLandingWorkflowResources(newFilterModel), handleErrorFunction),
    loadMoreWorkflows: loadMoreWorkflows,
    hasMoreItems: hasMoreItems,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
