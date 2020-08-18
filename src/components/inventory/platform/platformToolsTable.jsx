import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";
import { format } from "date-fns";

function PlatformToolsTable({ data }) {

  // TODO: Pull from metadata
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
      <div className="table-content-block">
      <CustomTable 
        columns={columns} 
        data={data}
        tableStyleName="custom-table-2"
      />
      </div>
    </>
  );
}

PlatformToolsTable.propTypes = {
  data: PropTypes.array,
  rowInfo: PropTypes.func
};

export default PlatformToolsTable;