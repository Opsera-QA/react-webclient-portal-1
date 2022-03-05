import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import ToolCategoryTable from "components/admin/tools/categories/ToolCategoryTable";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ToolManagementSubNavigationBar from "components/admin/tools/ToolManagementSubNavigationBar";
import {toolCategoryActions} from "components/admin/tools/categories/toolCategory.actions";

function ToolCategoryManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [toolTypes, setToolTypes] = useState([]);
  const isMounted = useRef(false);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
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

  const loadData = async (cancelSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    setAccessRoleData(userRoleAccess);
    if (userRoleAccess) {

      if (userRoleAccess?.OpseraAdministrator) {
        await getToolTypes(cancelSource);
      }
    }
  };

  const getToolTypes = async (cancelSource) => {
    try {
      const response = await toolCategoryActions.getToolTypesV2(getAccessToken, cancelSource, true);
      const toolTypes = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(toolTypes)) {
        setToolTypes(toolTypes);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  return (
    <ScreenContainer
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      isLoading={!accessRoleData || isLoading}
      navigationTabContainer={<ToolManagementSubNavigationBar activeTab={"categories"} />}
      breadcrumbDestination={"toolManagement"}
    >
      <ToolCategoryTable
        data={toolTypes}
        isLoading={isLoading}
        loadData={loadData}
      />
    </ScreenContainer>
  );
}

ToolCategoryManagement.propTypes = {};

export default ToolCategoryManagement;