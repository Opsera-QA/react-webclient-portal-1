import React from "react";
import {useParams} from "react-router-dom";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import useGetCustomerPipelineTemplateModelById
  from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplateModelById";
import pipelineTemplateMetadata from "components/admin/pipeline_templates/pipelineTemplate.metadata";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import CustomerPipelineTemplateDetailPanel
  from "components/workflow/catalog/private/details/CustomerPipelineTemplateDetailPanel";
import ActionBarTransferCustomerPipelineTemplateButton
  from "components/workflow/catalog/private/action_bar/ActionBarTransferCustomerPipelineTemplateButton";
import ActionBarDeleteCustomerPipelineTemplateButton
  from "components/workflow/catalog/private/action_bar/ActionBarDeleteCustomerPipelineTemplateButton";
import ViewCustomerPipelineTemplateAuditLogsActionBarButton
  from "components/workflow/catalog/private/action_bar/ViewCustomerPipelineTemplateAuditLogsActionBarButton";

export default function CustomerPipelineTemplateDetailView() {
  const {id} = useParams();
  const {
    pipelineTemplateModel,
    setPipelineTemplateModel,
    isLoading,
    loadData,
  } = useGetCustomerPipelineTemplateModelById(id);

  const getActionBar = () => {
    if (pipelineTemplateModel != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/workflow/catalog/library"}/>
          </div>
          <div className="d-flex">
            <ActionBarTransferCustomerPipelineTemplateButton
              templateModel={pipelineTemplateModel}
              loadTemplate={loadData}
              className={"ml-3"}
            />
            <ViewCustomerPipelineTemplateAuditLogsActionBarButton
              templateModel={pipelineTemplateModel}
              className={"ml-3"}
            />
            <ActionBarDeleteCustomerPipelineTemplateButton
              customerPipelineTemplateModel={pipelineTemplateModel}
              className={"ml-3"}
            />
          </div>
        </ActionBarContainer>
      );
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"customerPipelineTemplateDetailView"}
      metadata={pipelineTemplateMetadata}
      navigationTabContainer={<WorkflowSubNavigationBar currentTab={"customerPipelineTemplateDetailView"}/>}
      dataObject={pipelineTemplateModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <CustomerPipelineTemplateDetailPanel
          pipelineTemplateModel={pipelineTemplateModel}
          setPipelineTemplateModel={setPipelineTemplateModel}
        />
      }
    />
  );
}