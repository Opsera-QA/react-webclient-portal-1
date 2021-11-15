import React, {useState, useEffect, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import templateActions from "components/admin/template_editor/template-actions";
import TemplateTable from "components/admin/template_editor/TemplateTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import PipelineTemplateManagementSubNavigationBar
  from "components/admin/template_editor/PipelineTemplateManagementSubNavigationBar";

function TemplateManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [templateList, setTemplateList] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator === true) {
        await getTemplates(cancelSource);
      }
    }
  };

  const getTemplates = async (cancelSource = cancelTokenSource) => {
    const templateListResponse = await templateActions.getTemplatesV2(getAccessToken, cancelSource);

    if (isMounted?.current === true && templateListResponse?.data) {
      setTemplateList(templateListResponse.data);
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"templateManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={
        <PipelineTemplateManagementSubNavigationBar
          activeTab={"pipelineTemplateManagement"}
        />
      }
    >
      <TemplateTable data={templateList} isLoading={isLoading} loadData={loadData}/>
    </ScreenContainer>
  );
}

export default TemplateManagement;