import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import boomiReportMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/boomi/metadata/boomiReport.metadata";
import {
    getColumnHeader, getColumnId, getTableBooleanIconColumn, getTableDateColumn, getTableDateTimeColumn,
    getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";
import {format} from "date-fns";
import axios from "axios";

function BoomiLogSummaryTable({ boomiObj, jobType }) {
  const fields = boomiReportMetaData?.fields;

  const createPackageColumns = useMemo(() => [
      getTableTextColumn(getField(fields, "componentId")),
      getTableTextColumn(
          getField(fields, "packageVersion"),
          undefined,
          130,
      ),
      getTableTextColumn(getField(fields, "notes")),
      getTableTextColumn(getField(fields, "packageId")),
      getTableTextColumn(
          getField(fields, "componentVersion"),
          undefined,
          150,
      ),
      getTableTextColumn(getField(fields, "componentType"), undefined, 150),
      getTableTextColumn(getField(fields, "createdDate")),
      getTableTextColumn(getField(fields, "createdBy")),
      getTableBooleanIconColumn(
          getField(fields, "shareable"),
          undefined,
          80,
      ),
  ], []);

  const deployMigrateColumns = useMemo(() => [
      getTableTextColumn(getField(fields, "componentId")),
      getTableTextColumn(
          getField(fields, "packageVersion"),
          undefined,
          130,
      ),
      getTableTextColumn(getField(fields, "notes")),
      getTableTextColumn(getField(fields, "packageId")),
      getTableTextColumn(
          getField(fields, "componentVersion"),
          undefined,
          150,
      ),
      getTableTextColumn(getField(fields, "componentType"), undefined, 150),
      getTableTextColumn(getField(fields, "deployedDate")),
      getTableTextColumn(getField(fields, "deployedBy")),
      getTableTextColumn(getField(fields, "environmentName")),
  ], []);

  const getComponentResultsTable = () => {
    return (
      <VanityTable
        data={boomiObj}
        columns={jobType === "CREATE_PACKAGE_COMPONENT" ? createPackageColumns : deployMigrateColumns}
        tableHeight={"14.1vh"}
      />
    );
  };

  if (!Array.isArray(boomiObj) || boomiObj.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faExclamationCircle} />
        There were no packages identified with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faCheckCircle}
      title={`Successful Components`}
      className={"mt-2"}
    />
  );
}

BoomiLogSummaryTable.propTypes = {
  boomiObj: PropTypes.array,
  jobType: PropTypes.string
};

export default BoomiLogSummaryTable;