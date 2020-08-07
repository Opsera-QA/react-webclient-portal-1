import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";
import {useHistory} from "react-router-dom";
import {getTableTextColumn} from "../../common/table/table-column-helpers";
import ldapOrganizationsFormFields from "./ldap-organizations-form-fields";

function LdapOrganizationsTable({data, view}) {
  const history = useHistory();
  const [fields, setFields] = useState({...ldapOrganizationsFormFields});

  const columns = useMemo(
    () => [
      getTableTextColumn(fields["name"]),
      getTableTextColumn(fields["description"]),
      getTableTextColumn(fields["orgName"]),
      getTableTextColumn(fields["orgOwnerEmail"]),
    ],
    []
  );

  const onRowSelect = (selectedRow, type) => {
    let itemId = selectedRow && selectedRow.values && selectedRow.values.name; //I'm not sure what a "ID" is for an entry in LDAP, so I'm choosing NAME for now, but please review that and set this to the unique ID value for the selected entry.

    console.log(selectedRow.values);
    history.push(`/accounts/organizations/details/${itemId}`);
  };

  return (
    <>
      <div className="table-content-block">
        <CustomTable tableStyleName="custom-table-2" onRowSelect={onRowSelect} data={data} columns={columns} />
      </div>
    </>
  );
}

LdapOrganizationsTable.propTypes = {
  data: PropTypes.array,
  view: PropTypes.string,
};

export default LdapOrganizationsTable;