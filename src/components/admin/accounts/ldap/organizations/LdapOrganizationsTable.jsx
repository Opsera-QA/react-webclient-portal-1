import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import CreateLdapOrganizationOverlay from "components/admin/accounts/ldap/organizations/CreateLdapOrganizationOverlay";
import {ldapOrganizationMetaData} from "components/admin/accounts/ldap/organizations/ldap-organizations-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {faSitemap} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {DialogToastContext} from "contexts/DialogToastContext";

function LdapOrganizationsTable({organizations, isLoading, loadData, isMounted}) {
  const toastContext = useContext(DialogToastContext);
  const fields = ldapOrganizationMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
      getTableTextColumn(getField(fields, "orgName")),
      getTableTextColumn(getField(fields, "orgOwnerEmail")),
    ],
    []
  );

  const getOrganizationsTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={organizations}
        loadData={loadData}
        columns={columns}
      />
    );
  };

  const onRowSelect = (selectedRow) => {
    history.push(`/admin/organizations/details/${selectedRow.original.name}`);
  };

  const createOrganization = () => {
    toastContext.showOverlayPanel(
      <CreateLdapOrganizationOverlay
        isMounted={isMounted}
        loadData={loadData}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        addRecordFunction={createOrganization}
        isLoading={isLoading}
        body={getOrganizationsTable()}
        titleIcon={faSitemap}
        title={"Organizations"}
        type={"Organization"}
      />
    </div>
  );
}

LdapOrganizationsTable.propTypes = {
  organizations: PropTypes.array,
  isMounted: PropTypes.object,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapOrganizationsTable;