import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {ldapOrganizationAccountMetaData} from "components/admin/accounts/ldap/organization_accounts/ldap-organization-account-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import CustomTable from "components/common/table/CustomTable";
import CreateLdapOrganizationAccountOverlay
  from "components/admin/accounts/ldap/organization_accounts/CreateLdapOrganizationAccountOverlay";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faSitemap} from "@fortawesome/pro-light-svg-icons";

function LdapOrganizationAccountsTable({ldapOrganizationAccounts, ldapOrganizationData, isLoading, loadData, className }) {
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
        columns={columns}
        isLoading={isLoading}
        data={ldapOrganizationAccounts}
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <div className={className}>
      <FilterContainer
        loadData={loadData}
        addRecordFunction={createOrganizationAccount}
        isLoading={isLoading}
        body={getOrganizationAccountsTable()}
        titleIcon={faSitemap}
        title={"Organization Accounts"}
        type={"Organization Account"}
      />
      <CreateLdapOrganizationAccountOverlay
        ldapOrganizationData={ldapOrganizationData}
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
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default LdapOrganizationAccountsTable;
