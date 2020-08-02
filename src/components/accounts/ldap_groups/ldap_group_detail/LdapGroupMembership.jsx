import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";

function LdapGroupMembership({ membership, organization }) {

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
      <CustomTable data={membership} rowStyling={rowStyling} columns={columns} initialState={initialState} />
    </>
  );
}

LdapGroupMembership.propTypes = {
  membership: PropTypes.array,
  organization: PropTypes.object
};

export default LdapGroupMembership;