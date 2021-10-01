import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import Model from "core/data_model/model";
import { DialogToastContext } from "contexts/DialogToastContext";
import toolFilterMetadata from "components/inventory/tools/tool-filter-metadata";
import PropTypes from "prop-types";
import axios from "axios";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import ToolCategoryTable from "components/admin/tools/tool_category/ToolCategoryTable";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ToolManagementSubNavigationBar from "components/admin/tools/ToolManagementSubNavigationBar";

function ToolCategoryManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [toolTypes, setToolTypes] = useState([]);
  const [toolIdentifierFilterModel, setToolIdentifierFilterModel] = useState(new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false));
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
      const toolTypeResponse = await toolManagementActions.getToolTypesV2(getAccessToken, cancelSource);

      if (isMounted?.current === true) {
        setToolTypes(toolTypeResponse?.data);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
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
        toolIdentifierFilterModel={toolIdentifierFilterModel}
        setToolIdentifierFilterModel={setToolIdentifierFilterModel}
      />
    </ScreenContainer>
  );
}

ToolCategoryManagement.propTypes = {};

export default ToolCategoryManagement;