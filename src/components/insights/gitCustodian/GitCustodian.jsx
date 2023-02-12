import React, {useEffect, useState, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
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
import {GitCustodianFilterMetadata} from "components/insights/gitCustodian/table/gitCustodianFilter.metadata";
import useComponentStateReference from "../../../hooks/useComponentStateReference";
import AccessDeniedContainer from "../../common/panels/detail_view_container/AccessDeniedContainer";
import GitCustodianRoleHelper from "@opsera/know-your-role/roles/compliance/git_custodian/gitCustodianRole.helper";

function GitCustodian() {
  const [isLoading, setIsLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const [gitCustodianData, setGitCustodianData] = useState(undefined);
  const [gitCustodianFilterModel, setGitCustodianFilterModel] = useState(new Model({...GitCustodianFilterMetadata.newObjectFields}, GitCustodianFilterMetadata, false));
  const {
    accessRoleData,
    userData,
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (newDataObject = gitCustodianFilterModel) => {
    try {
      setIsLoading(true);
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

  const getTitleActionBar = () => {
    return (
      <EditGitCustodianFiltersIcon
        gitCustodianFilterModel={gitCustodianFilterModel}
        setGitCustodianFilterModel={setGitCustodianFilterModel}
        loadData={loadData}
        className={"mr-2"}
      />
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <LoadingDialog
          size={"sm"}
          message={"Loading Git Custodian Report"}
        />
      );
    }

    return (
      <GitCustodianDetails
        gitCustodianData={gitCustodianData}
        gitCustodianFilterModel={gitCustodianFilterModel}
        setGitCustodianFilterModel={setGitCustodianFilterModel}
        loadData={loadData}
      />
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm" message="Loading Git Custodian" />);
  }


  if (GitCustodianRoleHelper.canViewGitCustodian(userData) !== true) {
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
      {getBody()}
    </ScreenContainer>
  );

}

export default GitCustodian;
