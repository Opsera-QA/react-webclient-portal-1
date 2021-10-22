import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import OrganizationsTable from "components/settings/organizations/OrganizationsTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import axios from "axios";
import organizationActions from "components/settings/organizations/organization-actions";
import Model from "core/data_model/model";
import organizationFilterMetadata from "components/settings/organizations/organization-filter-metadata";
import OrganizationsSubNavigationBar from "components/settings/organizations/OrganizationsSubNavigationBar";

function OrganizationManagement() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const {getUserRecord, setAccessRoles, getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [organizationFilterModel, setOrganizationFilterModel] = useState(new Model({...organizationFilterMetadata.newObjectFields}, organizationFilterMetadata, false));

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(organizationFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterModel = organizationFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterModel, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getOrganizations = async (filterModel = organizationFilterModel, cancelSource = cancelTokenSource) => {
    let response = await organizationActions.getOrganizationsV2(getAccessToken, cancelSource, filterModel);
    const organizationList = response?.data?.data;

    if (isMounted?.current === true && organizationList) {
      setOrganizations(organizationList);
      let newFilterModel = filterModel;
      newFilterModel.setData("totalCount", response?.data?.count);
      newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
      setOrganizationFilterModel({...newFilterModel});
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.POWER_USERS_AND_SASS, userRoleAccess)) {
        await getOrganizations(cancelSource);
      }
    }
  };

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      breadcrumbDestination={"organizationManagement"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      navigationTabContainer={<OrganizationsSubNavigationBar activeTab={"organizations"} />}
    >
      <OrganizationsTable
        isLoading={isLoading}
        loadData={loadData}
        organizations={organizations}
        isMounted={isMounted}
        organizationFilterModel={organizationFilterModel}
        setOrganizationFilterModel={setOrganizationFilterModel}
      />
    </ScreenContainer>
  );
}


export default OrganizationManagement;