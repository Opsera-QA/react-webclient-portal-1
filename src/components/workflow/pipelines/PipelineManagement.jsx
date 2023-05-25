import React, {useEffect} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import PipelinesHelpDocumentation from "../../common/help/documentation/pipelines/PipelinesHelpDocumentation";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";
import useGetPipelines from "hooks/workflow/pipelines/useGetPipelines";
import PipelineFilterOverlay from "components/workflow/PipelineFilterOverlay";
import PipelineWelcomeView from "components/workflow/pipelines/PipelineWelcomeView";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import SideBySideViewBase from "components/common/tabs/SideBySideViewBase";
import InformationDialog from "components/common/status_notifications/info";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import PipelineCardView from "components/workflow/pipelines/PipelineCardView";
import PipelinesTableBase from "components/workflow/pipelines/pipeline_details/PipelinesTableBase";
import PipelineVerticalTabContainer from "components/workflow/pipelines/PipelineVerticalTabContainer";
import TableCardView from "components/common/table/TableCardView";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";
import {useHistory} from "react-router-dom";
import CreateNewPipelineWizard from "../wizards/updated_pipeline_wizard/CreateNewPipelineWizard";

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

function PipelineManagement() {
  const {
    pipelines,
    isLoading,
    error,
    pipelineFilterModel,
    setPipelineFilterModel,
    loadData,
    subscribedPipelineIds
  } = useGetPipelines(
    pipelineFields,
    true,
    true,
  );
  const { userData, toastContext } = useComponentStateReference();
  const history = useHistory();

  useEffect(() => {}, []);

  const getBody = () => {
    if (!Array.isArray(pipelines) && !isLoading) {
      return (
        <CenteredContentWrapper minHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}>
          <div className="my-5">
            <InformationDialog message="Could not load pipelines."/>
          </div>
        </CenteredContentWrapper>
      );
    }

    if (Array.isArray(pipelines) && pipelines.count === 0 && pipelineFilterModel?.getData("type") === "owner" && (pipelineFilterModel?.getActiveFilters() == null || pipelineFilterModel?.getActiveFilters()?.length === 0)) {
      return (
        <CenteredContentWrapper minHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}>
          <PipelineWelcomeView />
        </CenteredContentWrapper>
      );
    }

    return (
      <PaginationContainer
        loadData={loadData}
        isLoading={isLoading}
        filterDto={pipelineFilterModel}
        setFilterDto={setPipelineFilterModel}
        data={pipelines}
        nextGeneration={true}
      >
        <SideBySideViewBase
          leftSideView={getVerticalTabContainer()}
          rightSideView={getCurrentView()}
          leftSideMinimumWidth={"245px"}
          leftSideMaximumWidth={"245px"}
          minimumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
        />
      </PaginationContainer>
    );
  };

  const getPipelinesBody = () => {
    if (!Array.isArray(pipelines) && pipelines.length === 0) {
      const activeFilters = pipelineFilterModel?.getActiveFilters();
      if (activeFilters && activeFilters.length > 0) {
        return (
          <CenteredContentWrapper minHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}>
            <div className="px-2 max-content-width mx-auto" style={{ minWidth: "505px" }}>
              <div className="my-5"><InformationDialog message="No pipelines meeting the filter requirements were found."/></div>
            </div>
          </CenteredContentWrapper>
        );
      }

      return (
        <CenteredContentWrapper minHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}>
          <div className="px-2 max-content-width" style={{ minWidth: "505px" }}>
            <div className="my-5"><InformationDialog message="No pipelines are available for this view at this time."/></div>
          </div>
        </CenteredContentWrapper>
      );
    }

    return (getBody());
  };

  const addPipeline = () => {
    // history.push(`/workflow/catalog/library`);
    toastContext.showOverlayPanel(
        <CreateNewPipelineWizard loadData={loadData}/>
    );
  };

  const onRowSelect = (rowData) => {
    history.push(`/workflow/details/${rowData.original._id}/summary`);
  };

  const getCardView = () => {
    return (
      <PipelineCardView
        isLoading={isLoading}
        loadData={loadData}
        pipelines={pipelines}
        subscribedPipelineIds={subscribedPipelineIds}
        error={error}
      />
    );
  };

  const getTableView = () => {
    return (
      <PipelinesTableBase
        isLoading={isLoading}
        pipelines={pipelines}
        loadData={loadData}
        onRowClickFunction={onRowSelect}
        error={error}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <PipelineVerticalTabContainer
        pipelineFilterModel={pipelineFilterModel}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  const getCurrentView = () => {
    return (
      <TableCardView
        filterModel={pipelineFilterModel}
        data={pipelines}
        isLoading={isLoading}
        cardView={getCardView()}
        tableView={getTableView()}
      />
    );
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelines"}
      navigationTabContainer={<WorkflowSubNavigationBar currentTab={"pipelines"}/>}
      pageDescription={"Select a Pipeline to view details."}
      auditLogType={auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE}
      filterOverlay={<PipelineFilterOverlay pipelineFilterModel={pipelineFilterModel} loadDataFunction={loadData} />}
      addRecordFunction={PipelineRoleHelper.canCreatePipeline(userData) === true ? addPipeline : undefined}
      loadDataFunction={loadData}
      isSoftLoading={isLoading}
      filterModel={pipelineFilterModel}
      setFilterModel={setPipelineFilterModel}
      helpComponent={<PipelinesHelpDocumentation/>}
    >
      {getPipelinesBody()}
    </ScreenContainer>
  );

}

export default PipelineManagement;
