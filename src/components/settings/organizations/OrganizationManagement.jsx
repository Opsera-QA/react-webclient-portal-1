import React, {useState, useEffect, useRef} from "react";
import OrganizationsTable from "components/settings/organizations/OrganizationsTable";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import Model from "core/data_model/model";
import organizationFilterMetadata from "components/settings/organizations/organization-filter-metadata";
import OrganizationsSubNavigationBar from "components/settings/organizations/OrganizationsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useOrganizationActions from "hooks/settings/insights/organizations/useOrganizationActions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import OrganizationRoleHelper from "@opsera/know-your-role/roles/settings/organizations/organizationRole.helper";

function OrganizationManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);
  const isMounted = useRef(false);
  const [organizationFilterModel, setOrganizationFilterModel] = useState(new Model({...organizationFilterMetadata.newObjectFields}, organizationFilterMetadata, false));
  const {
    accessRoleData,
    toastContext,
    userData,
  } = useComponentStateReference();
  const organizationActions = useOrganizationActions();

  useEffect(() => {
    isMounted.current = true;

    loadData(organizationFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterModel = organizationFilterModel) => {
    try {
      setIsLoading(true);

      if (OrganizationRoleHelper.canGetOrganizationList(userData) === true) {
        await getOrganizations(filterModel);
      }
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

  const getOrganizations = async (filterModel = organizationFilterModel) => {
    const response = await organizationActions.getOrganizations(filterModel);
    const organizationList = DataParsingHelper.parseNestedArray(response, "data.data");

    if (isMounted?.current === true && organizationList) {
      setOrganizations(organizationList);
      filterModel.setData("totalCount", response?.data?.count);
      filterModel.setData("activeFilters", filterModel.getActiveFilters());
      setOrganizationFilterModel({...filterModel});
    }
  };

  if (OrganizationRoleHelper.canGetOrganizationList(userData) !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"organizationManagement"}
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