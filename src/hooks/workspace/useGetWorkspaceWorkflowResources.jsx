import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useWorkspaceActions from "hooks/workspace/useWorkspaceActions";
import WorkspaceFilterModel from "components/workspace/views/workspace.filter.model";
import {WORKFLOW_WIDGET_VIEWS} from "components/landing/v2/widgets/workspace/WorkflowWidgetNavigationBar";
import WorkflowWidgetFilterModel from "hooks/workspace/workflowWidget.filter.model";

export default function useGetWorkspaceWorkflowResources(
  currentView,
  fields,
  handleErrorFunction,
) {
  const [workspaceItems, setWorkspaceItems] = useState([]);
  const [workspaceItemIds, setWorkspaceItemIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [workflowWidgetFilterModel, setWorkflowWidgetFilterModel] = useState(new WorkflowWidgetFilterModel());
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const workspaceActions = useWorkspaceActions();

  useEffect(() => {
    setWorkspaceItems([]);

    if (loadData && currentView) {
      loadData(getWorkspaceWorkflowResources, handleErrorFunction).catch(() => {});
    }
  }, [currentView]);

  const getWorkspaceWorkflowResources = async (
    newFilterModel = workflowWidgetFilterModel,
  ) => {
    setWorkspaceItems([]);
    let response;

    switch (currentView) {
      case WORKFLOW_WIDGET_VIEWS.FOLLOWING:
        response = await workspaceActions.getSubscribedWorkflowResources(
          newFilterModel,
          fields,
          newFilterModel?.getData("active"),
        );
        break;
      case WORKFLOW_WIDGET_VIEWS.RECENT_ACTIVITY:
        response = await workspaceActions.getRecentWorkflowResources(
          newFilterModel,
          fields,
          newFilterModel?.getData("active"),
        );
        break;
      case WORKFLOW_WIDGET_VIEWS.MY_WORKFLOWS:
      default:
        response = await workspaceActions.getMyWorkspaceWorkflowResources(
          newFilterModel,
          fields,
          newFilterModel?.getData("active"),
        );
        break;
    }

    const items = DataParsingHelper.parseNestedArray(response, "data.data", []);
    const ids = DataParsingHelper.parseNestedArray(response, "data.sortedIds", []);
    setWorkspaceItemIds([...ids]);
    setWorkspaceItems([...items]);
    newFilterModel.updateTotalCount(DataParsingHelper.parseNestedInteger(response, "data.count", 0));
    newFilterModel.updateActiveFilters();
    setWorkflowWidgetFilterModel({...newFilterModel});
  };

  const hasMoreItems = currentPage * 12 <= workspaceItemIds.length;
  console.log("workspaceItemIds: " + JSON.stringify(workspaceItemIds.length));

  const loadMoreWorkflows = async () => {
    const startIndex = currentPage * 12;
    console.log("itemIdsBefore: " + JSON.stringify(workspaceItemIds));
    const idArray = workspaceItemIds.slice(startIndex, startIndex + 12);
    console.log("idArray: " + JSON.stringify(idArray));

    const response = await workspaceActions.getWorkspaceWorkflowResourcesByIds(
      idArray,
    );
    const items = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setWorkspaceItems([...workspaceItems, ...items]);
    setCurrentPage(currentPage + 1);
  };

  return ({
    workspaceItems: workspaceItems,
    setWorkspaceItems: setWorkspaceItems,
    workflowWidgetFilterModel: workflowWidgetFilterModel,
    setWorkflowWidgetFilterModel: setWorkflowWidgetFilterModel,
    loadData: async (newFilterModel) => loadData(async () => getWorkspaceWorkflowResources(newFilterModel), handleErrorFunction),
    loadMoreWorkflows: loadMoreWorkflows,
    hasMoreItems: hasMoreItems,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
