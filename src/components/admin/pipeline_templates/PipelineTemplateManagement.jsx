import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import pipelineTemplateActions from "components/admin/pipeline_templates/pipelineTemplate.actions";
import PipelineTemplatesTable from "components/admin/pipeline_templates/PipelineTemplatesTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import PipelineTemplateManagementSubNavigationBar
  from "components/admin/pipeline_templates/PipelineTemplateManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function PipelineTemplateManagement() {
  const { getAccessToken, userAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineTemplates, setPipelineTemplates] = useState([]);
  const { isMounted, cancelTokenSource } = useComponentStateReference();

  useEffect(() => {
    setPipelineTemplates([]);

    if (userAccessRoles?.OpseraAdministrator === true) {
      loadData().catch((error) => {
        if (isMounted === true) {
          throw error;
        }
      });
    }
  }, [userAccessRoles]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getTemplates();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTemplates = async () => {
    const response = await pipelineTemplateActions.getTemplatesV2(getAccessToken, cancelTokenSource);
    const newPipelineTemplates = response?.data;

    if (isMounted?.current === true && Array.isArray(newPipelineTemplates)) {
      setPipelineTemplates(newPipelineTemplates);
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"templateManagement"}
      isLoading={!userAccessRoles}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={userAccessRoles}
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
      />
    </ScreenContainer>
  );
}

export default PipelineTemplateManagement;