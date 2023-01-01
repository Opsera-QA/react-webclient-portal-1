import React, {useEffect, useState} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import pipelineActions from "components/workflow/pipeline-actions";
import PipelineTableCardView from "components/workflow/pipelines/PipelineTableCardView";
import PipelinesHelpDocumentation from "../../common/help/documentation/pipelines/PipelinesHelpDocumentation";
import PipelineFilterModel from "components/workflow/pipelines/pipeline.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";

function Pipelines() {
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineFilterModel, setPipelineFilterModel] = useState(new PipelineFilterModel());
  const [subscribedPipelineIds, setSubscribedPipelineIds] = useState([]);
  const {
    cancelTokenSource,
    getAccessToken,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (newPipelineFilterModel = pipelineFilterModel) => {
    try {
      if (isMounted?.current === true) {
        setIsLoading(true);
        setPipelines([]);
      }

      const pipelineFields = [
        "type",
        "_id",
        "name",
        "owner",
        "workflow.last_step",
        "workflow.run_count",
        "workflow.last_run",
        "createdAt",
        "updatedAt",
      ];
      const response = await pipelineActions.getPipelinesV2(
        getAccessToken,
        cancelTokenSource,
        newPipelineFilterModel,
        newPipelineFilterModel?.getData("type"),
        pipelineFields,
      );
      const pipelines = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(pipelines)) {
        setPipelines([...pipelines]);
        newPipelineFilterModel.updateTotalCount(response?.data?.count);
        newPipelineFilterModel.updateActiveFilters();
        setSubscribedPipelineIds(response?.data?.subscriptions);
        setPipelineFilterModel({...newPipelineFilterModel});
      }
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

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelines"}
      navigationTabContainer={<WorkflowSubNavigationBar currentTab={"pipelines"}/>}
      pageDescription={"Select a Pipeline to view details."}
      auditLogType={auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE}
      helpComponent={
        <PipelinesHelpDocumentation/>
      }
    >
      <PipelineTableCardView
        pipelines={pipelines}
        isLoading={isLoading}
        pipelineFilterModel={pipelineFilterModel}
        setPipelineFilterModel={setPipelineFilterModel}
        loadData={loadData}
        subscribedPipelineIds={subscribedPipelineIds}
      />
    </ScreenContainer>
  );

}

export default Pipelines;
