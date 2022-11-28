import React from "react";
import {useParams} from "react-router-dom";
import pipelineTemplateActions from "components/admin/pipeline_templates/pipelineTemplate.actions";
import templateEditorMetadata from "components/admin/pipeline_templates/pipelineTemplate.metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarShowJsonButton from "components/common/actions/buttons/ActionBarShowJsonButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import PipelineTemplateDetailPanel from "components/admin/pipeline_templates/details/PipelineTemplateDetailPanel";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import PipelineTemplateManagementSubNavigationBar
  from "components/admin/pipeline_templates/PipelineTemplateManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPlatformPipelineTemplateModelById
  from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplateModelById";
import {
  platformPipelineTemplateCatalogActions
} from "components/workflow/catalog/platform/platformPipelineTemplateCatalog.actions";

function PipelineTemplateDetailView() {
  const {templateId} = useParams();
  const {
    isOpseraAdministrator,
    getAccessToken,
    cancelTokenSource,
    accessRoleData,
  } = useComponentStateReference();
  const {
    pipelineTemplateModel,
    setPipelineTemplateModel,
    isLoading,
  } = useGetPlatformPipelineTemplateModelById(templateId);

  const getActionBar = () => {
    if (pipelineTemplateModel == null) {
      return <></>;
    }

    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/templates"}/>
        </div>
        <div className={"d-flex"}>
          <ActionBarShowJsonButton dataObject={pipelineTemplateModel}/>
          <ActionBarDeleteButton2
            relocationPath={"/admin/templates"}
            dataObject={pipelineTemplateModel}
            handleDelete={deleteTemplate}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const deleteTemplate = () => {
    return platformPipelineTemplateCatalogActions.deletePlatformPipelineTemplate(
      getAccessToken,
      cancelTokenSource,
      templateId,
    );
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"templateDetailView"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      dataObject={pipelineTemplateModel}
      isLoading={isLoading}
      metadata={templateEditorMetadata}
      actionBar={getActionBar()}
      navigationTabContainer={
        <PipelineTemplateManagementSubNavigationBar
          activeTab={"pipelineTemplateViewer"}
        />
      }
      detailPanel={
        <PipelineTemplateDetailPanel
          setTemplateData={setPipelineTemplateModel}
          templateData={pipelineTemplateModel}
        />
      }
    />
  );
}

export default PipelineTemplateDetailView;