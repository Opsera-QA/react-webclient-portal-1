import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";
import { format } from "date-fns";

function PlatformToolsTable({ data, rowInfo }) {
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
        Header: "Tool",
        accessor: "name",
      },
      {
        Header: "Port",
        accessor: "port",
        class: "cell-center"
      },
      {
        Header: "Version",
        accessor: "versionNumber",
      },
      {
        Header: "Status",
        accessor: "toolStatus"
      },      
      {
        Header: "Install Date",
        accessor: "installationDate",
        Cell: (props) => {
          return format(new Date(props.value), "yyyy-MM-dd");
        },
        class: "cell-center"
      },
      {
        Header: "URL",
        accessor: "toolURL",
      },
      {
        Header: "DNS",
        accessor: "dnsName",
        class: "cell-center"
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
      >
      </CustomTable>
    </>
  );
}

PlatformToolsTable.propTypes = {
  data: PropTypes.array,
  rowInfo: PropTypes.func
};

export default PlatformToolsTable;