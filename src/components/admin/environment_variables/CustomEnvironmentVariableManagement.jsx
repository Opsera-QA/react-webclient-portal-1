import React, { useState, useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import CustomEnvironmentVariablesSubNavigationBar
  from "components/admin/environment_variables/CustomEnvironmentVariablesSubNavigationBar";
import customEnvironmentVariableActions
  from "components/admin/environment_variables/customEnvironmentVariables.actions";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import {NODE_ANALYTICS_API_SERVER_URL, NODE_API_ORCHESTRATOR_SERVER_URL} from "config";
import useComponentStateReference from "hooks/useComponentStateReference";

function CustomEnvironmentVariableManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [customEnvironmentVariableObject, setCustomEnvironmentVariableObject] = useState(undefined);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
    toastContext,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setCustomEnvironmentVariableObject(undefined);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getNodeCustomEnvironmentVariables();
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

  const getNodeCustomEnvironmentVariables = async () => {
    const response = await customEnvironmentVariableActions.getNodeCustomEnvironmentVariables(getAccessToken, cancelTokenSource);
    const customEnvironmentVariables = response?.data?.data;

    if (isMounted?.current === true && customEnvironmentVariables) {
      setCustomEnvironmentVariableObject(customEnvironmentVariables);
    }
  };

  // TODO: Don't include sensitive data parameters OR sanitize them
  const getRelevantReactObjectProperties = () => {
    return ({
      NODE_ENV: process.env.NODE_ENV,
      PUBLIC_URL: process.env.PUBLIC_URL,
      REACT_APP_OPSERA_CLIENT_HOST: process.env.REACT_APP_OPSERA_CLIENT_HOST,
      REACT_APP_OPSERA_CLIENT_ROOT_URL: process.env.REACT_APP_OPSERA_CLIENT_ROOT_URL,
      REACT_APP_OPSERA_API_SERVER_URL: NODE_API_ORCHESTRATOR_SERVER_URL,
      REACT_APP_ANALYTICS_API_SERVER_URL: NODE_ANALYTICS_API_SERVER_URL,
      REACT_APP_OPSERA_ANALYTICS_SERVER_URL: process.env.REACT_APP_OPSERA_ANALYTICS_SERVER_URL,
      REACT_APP_OPSERA_S3_STORAGE_URL: process.env.REACT_APP_OPSERA_S3_STORAGE_URL,
      REACT_APP_OPSERA_TENANT: process.env.REACT_APP_OPSERA_TENANT,
    });
  };

  const getNodeContainer = () => {
    return (
      <div className={"my-2"}>
        <StandaloneJsonField
          titleText={"Node Custom Environment Variables"}
          json={customEnvironmentVariableObject}
          isLoading={isLoading}
        />
      </div>
    );
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"customEnvironmentVariableManagement"}
      navigationTabContainer={<CustomEnvironmentVariablesSubNavigationBar activeTab={"customEnvironmentVariableManagement"} />}
    >
      <div className={"mx-3 mb-3"}>
        <div className={"my-2"}>
          <StandaloneJsonField
            titleText={"React Custom Environment Variables"}
            json={getRelevantReactObjectProperties()}
          />
        </div>
        {getNodeContainer()}
      </div>
    </ScreenContainer>
  );
}

export default CustomEnvironmentVariableManagement;
