import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function JenkinsJobsTable({ data, selectedRow }) {

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
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
        Header: "Type",
        accessor: "type",
        Cell: (props) => {
          return props.value[0];
        },
      },     
      {
        Header: "Active",
        accessor: "active",
        Cell: (props) => {
          return props.value ?  <FontAwesomeIcon icon={faCheckCircle} className="green ml-3" /> :  <FontAwesomeIcon icon={faTimesCircle} className="red ml-3" />;
        },
      },   
    ],
    []
  );

  return (
    <>
      <CustomTable 
        columns={columns} 
        data={data}
        initialState={initialState}
        selectedRow={selectedRow}
      >
      </CustomTable>
    </>
  );
}

JenkinsJobsTable.propTypes = {
  data: PropTypes.array,
  rowInfo: PropTypes.func
};

export default JenkinsJobsTable;