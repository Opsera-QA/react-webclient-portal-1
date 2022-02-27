import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import UsersTagsTable from "components/settings/data_mapping/users/UserDataMappingsTable";
import {userDataMappingActions} from "components/settings/data_mapping/users/userDataMapping.actions";
import {DialogToastContext} from "contexts/DialogToastContext";

function UserDataMappingManagement() {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userDataMappings, setUserDataMappings] = useState([]);
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
      await getUserDataMappings(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getUserDataMappings = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await userDataMappingActions.getUserDataMappingsV2(getAccessToken, cancelSource);
      const mappings = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(mappings)) {
        setUserDataMappings(mappings);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  return (
    // <ScreenContainer
    //   navigationTabContainer={<DataMappingManagementSubNavigationBar activeTab={"dataMappings"} />}
    //   breadcrumbDestination={"dataMappingManagement"}
    //   isLoading={isLoading}
    //   pageDescription={"Manage User Data Mapping for the Opsera Analytics Engine."}
    // >
    <div className={"mt-2"}>
      <UsersTagsTable
        loadData={loadData}
        isLoading={isLoading}
        data={userDataMappings}
        isMounted={isMounted}
      />
    </div>
    // </ScreenContainer>
  );
}

export default UserDataMappingManagement;
