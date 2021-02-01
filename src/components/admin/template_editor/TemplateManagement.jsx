import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import templateActions from "components/admin/template_editor/template-actions";
import TemplateTable from "components/admin/template_editor/TemplateTable";
import {DialogToastContext} from "contexts/DialogToastContext";

function TemplateManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [templateList, setTemplateList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getTemplates();
      }
    }
  };

  const getTemplates = async () => {
    const templateListResponse = await templateActions.getTemplates(getAccessToken);
    setTemplateList(templateListResponse?.data);
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"templateManagement"}
      isLoading={!accessRoleData}
      accessDenied={!accessRoleData?.OpseraAdministrator}
    >
      <TemplateTable data={templateList} isLoading={isLoading} loadData={loadData}/>
    </ScreenContainer>
  );
}

export default TemplateManagement;