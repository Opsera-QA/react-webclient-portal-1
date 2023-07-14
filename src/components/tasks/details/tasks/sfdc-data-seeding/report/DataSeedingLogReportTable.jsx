import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";
import {
  getCustomTableAccessor,
  getCustomTableHeader,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import { pluralize } from "components/common/helpers/string-helpers";
import CustomTable from "components/common/table/CustomTable";
import { dataSeedingObjectTableMetadata } from "./data-seeding-report-metadata";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DataSeedingFieldListTableView from "./DataSeedingFieldListTableView";
export const getListOfFields = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const listOfFields = row.value;
      if (!DataParsingHelper.parseArray(listOfFields, false, true)) {
        return "";
      }

      return <DataSeedingFieldListTableView listOfFields={listOfFields}/>;
    },
    class: className ? className : "no-wrap-inline",
  };
};

function DataSeedingLogReportTable({ summaryObject }) {
  const fields = dataSeedingObjectTableMetadata?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "objectName")),
      getTableTextColumn(getField(fields, "recordsProcessed")),
      getTableTextColumn(getField(fields, "recordsSuccessful")),
      getTableTextColumn(getField(fields, "recordsFailed")),
      getListOfFields(getField(fields, "fieldList")),
    ],
    [],
  );

  const getComponentResultsTable = () => {
    return (
      <CustomTable
        data={summaryObject}
        columns={columns}
        // onRowSelect={onRowSelect}
        // tableHeight={"28.2vh"}
      />
    );
  };

  if (!Array.isArray(summaryObject) || summaryObject.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase
          className={"mr-2"}
          icon={faCheckCircle}
        />
        There was no result generated with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`${pluralize(summaryObject?.length, "Object")} `}
      className={"mt-2"}
    />
  );
}

DataSeedingLogReportTable.propTypes = {
  summaryObject: PropTypes.array,
};

export default DataSeedingLogReportTable;
