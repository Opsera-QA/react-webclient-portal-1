import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import NewLdapOrganizationModal from "components/admin/accounts/ldap/organizations/NewLdapOrganizationModal";
import {ldapOrganizationMetaData} from "components/admin/accounts/ldap/organizations/ldap-organizations-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";

function LdapOrganizationsTable({data, isLoading, loadData, authorizedActions}) {
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] = useState(false);
  const fields = ldapOrganizationMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgName"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgOwnerEmail"})),
    ],
    []
  );

  const onRowSelect = (selectedRow, type) => {
    history.push(`/admin/organizations/details/${selectedRow.original.name}`);
  };

  const createOrganization = () => {
    setShowCreateOrganizationModal(true);
  };

  return (
    <div>
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        tableTitle={"Organizations"}
        type={"Organization"}
        data={data}
        loadData={loadData}
        createNewRecord={createOrganization}
        columns={columns}
      />
      <NewLdapOrganizationModal
        showModal={showCreateOrganizationModal}
        loadData={loadData}
        authorizedActions={authorizedActions}
        setShowModal={setShowCreateOrganizationModal}
      />
    </div>
  );
}

LdapOrganizationsTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapOrganizationsTable;