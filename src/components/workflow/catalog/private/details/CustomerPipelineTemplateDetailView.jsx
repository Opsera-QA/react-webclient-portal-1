import React from "react";
import {useParams} from "react-router-dom";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import TagManagementSubNavigationBar from "components/settings/tags/TagManagementSubNavigationBar";
import useGetCustomerPipelineTemplateModelById
  from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplateModelById";
import pipelineTemplateMetadata from "components/admin/pipeline_templates/pipelineTemplate.metadata";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import CustomerPipelineTemplateDetailPanel
  from "components/workflow/catalog/private/details/CustomerPipelineTemplateDetailPanel";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  customerPipelineTemplateCatalogActions
} from "components/workflow/catalog/private/customerPipelineTemplateCatalog.actions";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";

export default function CustomerPipelineTemplateDetailView() {
  const {id} = useParams();
  const {
    pipelineTemplateModel,
    setPipelineTemplateModel,
    isLoading,
  } = useGetCustomerPipelineTemplateModelById(id);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  const deletePipelineTemplate = async () => {
  return await customerPipelineTemplateCatalogActions.deleteCustomerPipelineTemplate(getAccessToken, cancelTokenSource, id);
  };

  const getActionBar = () => {
    if (pipelineTemplateModel != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/workflow/catalog/library"}/>
          </div>
          <div className="d-flex">
            {/*<TagSubscriptionIcon tagModel={pipelineTemplateModel} className={"mr-3"} />*/}
            {/*TODO: Hook requirements up inside action bar buttons/inputs*/}
            <ActionBarDeleteButton2 dataObject={pipelineTemplateModel} handleDelete={deletePipelineTemplate} relocationPath={"/workflow/catalog/library"} />
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