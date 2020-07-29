import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import accountsActions from "components/accounts/accounts-actions.js";

function LdapGroupMembership({ groupData, organization }) {
  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Region",
        accessor: "region",
      },
      {
        Header: "Email",
        accessor: "emailAddress",
      },
      {
        Header: "Department Name",
        accessor: "departmentName",
      },

    ],
    []
  );

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
      <CustomTable data={groupData.members} rowStyling={rowStyling} columns={columns} initialState={initialState} />
    </>
  );
}

LdapGroupMembership.propTypes = {
  groupData: PropTypes.object,
};

export default LdapGroupMembership;