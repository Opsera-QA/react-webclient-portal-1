import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "../../../common/table";

function LdapOrganizationAccountsTable({data, onClick}) {
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
  };

  const rowStyling = (row) => {
    return "";
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Organization Domain",
        accessor: "orgDomain"
      }
    ],
    []
  );


  const onRowSelect = (selectedRow) => {
    //first output the entire selected row value to see what you have
    console.log(selectedRow);
    let itemId = selectedRow && selectedRow.values && selectedRow.values.name; //I'm not sure what a "ID" is for an entry in LDAP, so I'm choosing NAME for now, but please review that and set this to the unique ID value for the selected entry.

    console.log(selectedRow.values);
    onClick(itemId);
  };


  return (
    <>
      {data &&
      <div className="table-content-block">
        <CustomTable
          columns={columns}
          data={data}
          onRowSelect={onRowSelect}
          rowStyling={rowStyling}
          initialState={initialState}
          tableStyleName="custom-table-2"
        />
      </div>
      }
    </>
  );
}

LdapOrganizationAccountsTable.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func
};

export default LdapOrganizationAccountsTable;
