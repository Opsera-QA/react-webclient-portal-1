import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { DialogToastContext } from "contexts/DialogToastContext";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import axios from "axios";
import CustomEnvironmentVariablesSubNavigationBar
  from "components/admin/environment_variables/CustomEnvironmentVariablesSubNavigationBar";
import customEnvironmentVariableActions
  from "components/admin/environment_variables/customEnvironmentVariables.actions";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

function CustomEnvironmentVariableManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [customEnvironmentVariableObject, setCustomEnvironmentVariableObject] = useState({});
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
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
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

      if (meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, userRoleAccess)) {
        await getNodeCustomEnvironmentVariables(cancelSource);
      }
    }
  };

  const getNodeCustomEnvironmentVariables = async (cancelSource = cancelTokenSource) => {
    const response = await customEnvironmentVariableActions.getNodeCustomEnvironmentVariables(getAccessToken, cancelSource);
    const customEnvironmentVariables = response?.data?.data;

    if (isMounted?.current === true && customEnvironmentVariables) {
      setCustomEnvironmentVariableObject(customEnvironmentVariables);
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"customEnvironmentVariableManagement"}
      isLoading={!accessRoleData || isLoading}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      navigationTabContainer={<CustomEnvironmentVariablesSubNavigationBar activeTab={"customEnvironmentVariableManagement"} />}
    >
      <div className={"mx-3 mb-3"}>
        <StandaloneJsonField
          titleText={"Node Custom Environment Variables"}
          json={customEnvironmentVariableObject}
        />
      </div>
    </ScreenContainer>
  );
}

export default CustomEnvironmentVariableManagement;
