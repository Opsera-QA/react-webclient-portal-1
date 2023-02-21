import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faSitemap} from "@fortawesome/pro-light-svg-icons";
import {
  ldapOrganizationAccountMetaData
} from "components/admin/accounts/ldap/organization_accounts/ldap-organization-account-metadata";
import {organizationSettingsHelper} from "components/admin/organization_settings/organizationSettings.helper";

export default function OrganizationSettingsTable(
  {
    data,
    loadData,
    isLoading,
  }) {
  const fields = ldapOrganizationAccountMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "orgOwner")),
      getTableTextColumn(getField(fields, "orgOwnerEmail")),
      getTableTextColumn(getField(fields, "accountName")),
      getTableTextColumn(getField(fields, "description")),
      getTableTextColumn(getField(fields, "orgDomain")),
    ],
    []
  );


  const onRowSelect = (rowData, organizationAccount) => {
    history.push(organizationSettingsHelper.getDetailViewLink(organizationAccount?.orgDomain, organizationAccount?.name));
  };

  const getOrganizationAccountsTable = () => {
    return (
      <CustomTable
        onRowSelect={onRowSelect}
        data={data}
        columns={columns}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getOrganizationAccountsTable()}
      titleIcon={faSitemap}
      title={"Organization Accounts"}
      type={"Organization Account"}
    />
  );
}

OrganizationSettingsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
