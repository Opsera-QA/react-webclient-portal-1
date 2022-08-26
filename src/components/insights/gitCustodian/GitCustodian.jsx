import React, {useEffect, useState, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import GitCustodianDetails from "./GitCustodianDetails";
import GitCustodianLookUpHelpDocumentation
  from "../../common/help/documentation/insights/GitCustodianLookUpHelpDocumentation";
import EditGitCustodianFiltersIcon from "./filters/EditGitCustodianFiltersIcon";
import { GitCustodianFilterMetadata } from "components/insights/gitCustodian/table/gitCustodianFilter.metadata";
import useComponentStateReference from "../../../hooks/useComponentStateReference";
import AccessDeniedContainer from "../../common/panels/detail_view_container/AccessDeniedContainer";

function GitCustodian() {
  const {getUserRecord, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [gitCustodianData, setGitCustodianData] = useState(undefined);
  const [gitCustodianFilterModel, setGitCustodianFilterModel] = useState(new Model({...GitCustodianFilterMetadata.newObjectFields}, GitCustodianFilterMetadata, false));
  const { isSiteAdministrator } =useComponentStateReference();

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    // eslint-disable-next-line no-undef
    let newDataObject = new Model({...GitCustodianFilterMetadata.newObjectFields}, GitCustodianFilterMetadata, true);
    newDataObject.setData("filters", []);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(newDataObject, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newDataObject = gitCustodianFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
      let newFilterDto = newDataObject;
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      newFilterDto.setData("totalCount", newFilterDto.getData('totalCount'));
      let pageSize = newFilterDto.getData("pageSize");
      newFilterDto.setData("pageSize", pageSize);
      let sortOption = newFilterDto.getData("sortOption");
      newFilterDto.setData("sortOption", sortOption);
      setGitCustodianData(newDataObject);
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm" message="Loading Git Custodian"/>);
  }

  const getTitleActionBar = () => {
    return(
      <EditGitCustodianFiltersIcon
        gitCustodianFilterModel={gitCustodianFilterModel}
        setGitCustodianFilterModel={setGitCustodianFilterModel}
        loadData={loadData}
        className={"mr-2"}
      />
    );
  };

  if (isSiteAdministrator !== true) {
    return (
      <AccessDeniedContainer
        navigationTabContainer={<InsightsSubNavigationBar currentTab={"gitCustodian"}/>}
      />
    );
  }

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"gitCustodian"}/>}
      pageDescription={'Custodian for repositories. This Dashboard provides visibility to exposed secrets, tokens, passwords, key files, and sensitive data.'}
      breadcrumbDestination={"insightsGitCustodian"}
      helpComponent={<GitCustodianLookUpHelpDocumentation/>}
      titleActionBar={getTitleActionBar()}
    >
      {isLoading ? <LoadingDialog size="sm" message="Loading Git Custodian Report"/> :
        <GitCustodianDetails
          gitCustodianData={gitCustodianData}
          gitCustodianFilterModel={gitCustodianFilterModel}
          setGitCustodianFilterModel={setGitCustodianFilterModel}
          loadData={loadData}
        />
      }
    </ScreenContainer>
  );

}

export default GitCustodian;