import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faFileArchive, faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import VanityTable from "components/common/table/VanityTable";

function RemoteApplicationTelemetryTable({ data, loadData, isLoading, remoteApplicationPaginationModel, setRemoteApplicationPaginationModel, remoteApplicationMetadata, isMounted }) {
  const history = useHistory();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(remoteApplicationMetadata);
  }, [JSON.stringify(remoteApplicationMetadata)]);

  const loadColumnMetadata = (newActivityMetadata) => {
    if (isMounted?.current === true && newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields, "firstName")),
          getTableTextColumn(getField(fields, "lastName")),
          getTableTextColumn(getField(fields, "companyName")),
          getTableTextColumn(getField(fields, "email")),
          getTableTextColumn(getField(fields, "currentAppVersion")),
          getTableTextColumn(getField(fields, "totalRepositoryScanned")),
          getTableDateColumn(getField(fields, "createdAt")),

        ]
      );
    }
  };

  const onRowSelect = (rowData, row) => {
    history.push(`/admin/remote-applications/details/${row?._id}`);
  };

  const getRemoteApplicationTable = () => {
    return (
      <VanityTable
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        data={data}
        tableHeight={"800px"}
        columns={columns}
        loadData={loadData}
        paginationModel={remoteApplicationPaginationModel}
        setPaginationModel={setRemoteApplicationPaginationModel}
        noDataMessage={"No Remote Application records have been created yet"}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      supportSearch={true}
      isLoading={isLoading}
      body={getRemoteApplicationTable()}
      titleIcon={faFileArchive}
      title={"Remote Application Telemetry Records"}
      className={"px-2 pb-2"}
      filterDto={remoteApplicationPaginationModel}
      setFilterDto={setRemoteApplicationPaginationModel}
    />
  );
}

RemoteApplicationTelemetryTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  remoteApplicationPaginationModel: PropTypes.object,
  setRemoteApplicationPaginationModel: PropTypes.func,
  remoteApplicationMetadata: PropTypes.object,
  isMounted: PropTypes.object
};

export default RemoteApplicationTelemetryTable;
