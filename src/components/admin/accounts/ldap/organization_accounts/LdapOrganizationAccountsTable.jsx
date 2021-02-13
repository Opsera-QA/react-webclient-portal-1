import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {ldapOrganizationAccountMetaData} from "components/admin/accounts/ldap/organization_accounts/ldap-organization-account-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import CustomTable from "components/common/table/CustomTable";
import NewLdapOrganizationAccountModal
  from "components/admin/accounts/ldap/organization_accounts/NewLdapOrganizationAccountModal";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faSitemap} from "@fortawesome/pro-light-svg-icons";

function LdapOrganizationAccountsTable({ldapOrganizationAccounts, ldapOrganizationData, authorizedActions, isLoading, loadData }) {
  const [showCreateOrganizationAccountModal, setShowCreateOrganizationAccountModal] = useState(false);
  let fields = ldapOrganizationAccountMetaData.fields;
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

  const onRowSelect = (selectedRow) => {
    history.push(`/admin/organization-accounts/${selectedRow.original.orgDomain}/details/`);
  };

  const createOrganizationAccount = () => {
    setShowCreateOrganizationAccountModal(true);
  };

  const getOrganizationAccountsTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        columns={columns}
        isLoading={isLoading}
        data={ldapOrganizationAccounts}
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        addRecordFunction={authorizedActions?.includes("create_organization_account") ? createOrganizationAccount : null}
        isLoading={isLoading}
        body={getOrganizationAccountsTable()}
        titleIcon={faSitemap}
        title={"Organization Accounts"}
        type={"Organization Account"}
      />
      <NewLdapOrganizationAccountModal
        ldapOrganizationData={ldapOrganizationData}
        authorizedActions={authorizedActions}
        showModal={showCreateOrganizationAccountModal}
        loadData={loadData}
        setShowModal={setShowCreateOrganizationAccountModal}
      />
    </div>
  );
}

LdapOrganizationAccountsTable.propTypes = {
  ldapOrganizationAccounts: PropTypes.array,
  ldapOrganizationData: PropTypes.object,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default LdapOrganizationAccountsTable;
