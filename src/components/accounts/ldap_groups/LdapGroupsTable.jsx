import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function LdapGroupsTable({ data, domain }) {
  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Sync Group",
        accessor: "externalSyncGroup",
      },
      {
        Header: "Members",
        accessor: "members",
        Cell: (props) => {
          return props.value.length;
        }
      },
      {
        Header: "Sync",
        accessor: "isSync",
        Cell: (props) => {
          return props.value ?  <FontAwesomeIcon icon={faCheckCircle} className="green ml-3" /> :  <FontAwesomeIcon icon={faTimesCircle} className="red ml-3" />;
        },
      },

    ],
    []
  );
  
  const onRowSelect = (rowData, type) => {
    console.log(rowData);
    history.push(`/accounts/groups/${domain}/${rowData.original.name}`);
  };

  const rowStyling = (row) => {
    return "";
    // return !row["values"].active ? " inactive-row" : "";
  };

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
  };

  return (
    <>
      <CustomTable onRowSelect={onRowSelect} data={data} rowStyling={rowStyling} columns={columns} initialState={initialState} />
    </>
  );
}

LdapGroupsTable.propTypes = {
  data: PropTypes.array,
  domain: PropTypes.string
};

export default LdapGroupsTable;