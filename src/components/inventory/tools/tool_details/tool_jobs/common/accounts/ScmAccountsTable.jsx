import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { getTableTextColumn, getTableBooleanIconColumn } from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import scmCreateAccountMetadata from "./scm-create-account-metadata";

function ScmAccountsTable({ data, selectedRow, isLoading }) {

  let fields = scmCreateAccountMetadata.fields;

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "reviewerName",
        desc: false
      }
    ]
  };

  const columns = useMemo(
    () => [      
      getTableTextColumn(getField(fields, "reviewerName")),
      getTableTextColumn(getField(fields, "repository")),
      getTableTextColumn(getField(fields, "accountType")),
      getTableBooleanIconColumn(getField(fields, "accountPassword"))      
    ],
    []
  );

  return (
    <CustomTable
      columns={columns}
      data={data}
      initialState={initialState}
      onRowSelect={selectedRow}
      isLoading={isLoading}
    />
  );
}

ScmAccountsTable.propTypes = {
  data: PropTypes.array,
  rowInfo: PropTypes.func,
  selectedRow: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ScmAccountsTable;