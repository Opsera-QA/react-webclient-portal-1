import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import PipelineTemplatesTable from "components/admin/pipeline_templates/PipelineTemplatesTable";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import PipelineTemplateManagementSubNavigationBar
  from "components/admin/pipeline_templates/PipelineTemplateManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPlatformPipelineTemplates from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplates";

export default function PipelineTemplateManagement() {
  const {
    pipelineTemplates,
    isLoading,
    loadData,
    error,
    pipelineTemplateFilterModel,
    setPipelineTemplateFilterModel,
  } = useGetPlatformPipelineTemplates();
  const {
    accessRoleData,
    isOpseraAdministrator,
  } = useComponentStateReference();

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"templateManagement"}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={
        <PipelineTemplateManagementSubNavigationBar
          activeTab={"pipelineTemplateManagement"}
        />
      }
    >
      <PipelineTemplatesTable
        pipelineTemplates={pipelineTemplates}
        isLoading={isLoading}
        loadData={loadData}
        error={error}
        pipelineTemplateFilterModel={pipelineTemplateFilterModel}
        setPipelineTemplateFilterModel={setPipelineTemplateFilterModel}
      />
    </ScreenContainer>
  );
}