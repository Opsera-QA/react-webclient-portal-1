import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {getTableTextColumn} from "../../../../common/table/table-column-helpers";
import  {ldapOrganizationMetaData} from "./ldap-organizations-form-fields";

function LdapOrganizationsTable({data, isLoading}) {
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

  return (
    <>
      <div className="table-content-block">
        <CustomTable isLoading={isLoading} onRowSelect={onRowSelect} data={data} columns={columns} />
      </div>
    </>
  );
}

LdapOrganizationsTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default LdapOrganizationsTable;