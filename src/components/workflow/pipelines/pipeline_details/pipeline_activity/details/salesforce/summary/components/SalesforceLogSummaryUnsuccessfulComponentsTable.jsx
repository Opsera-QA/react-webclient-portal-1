import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import salesforceSummaryLogComponentMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/metadata/components/salesforceSummaryLogComponent.metadata";
import {
  getTableBooleanIconColumn,
  getSalesforceSumamryTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";

function SalesforceLogSummaryUnsuccessfulComponentsTable({ hasSuccessfulComponents, unsuccessfulComponents }) {
  const fields = salesforceSummaryLogComponentMetadata?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "componentType")),
      getTableTextColumn(getField(fields, "fullName")),
      getTableTextColumn(getField(fields, "fileName")),
      getTableTextColumn(getField(fields, "problem")),
      getTableTextColumn(getField(fields, "lineNumber")),
      getTableTextColumn(getField(fields, "columnNumber")),
      getTableBooleanIconColumn(getField(fields, "success"), undefined, 75),
      getSalesforceSumamryTableBooleanIconColumn(getField(fields, "warning"), undefined, 75),
      getSalesforceSumamryTableBooleanIconColumn(getField(fields, "created"), undefined, 75),
      getSalesforceSumamryTableBooleanIconColumn(getField(fields, "changed"), undefined, 75),
      getSalesforceSumamryTableBooleanIconColumn(getField(fields, "deleted"), undefined, 75),
      getTableTextColumn(getField(fields, "problemType")),
    ],
    []
  );

  const getComponentResultsTable = () => {
    return (
      <VanityTable
        data={unsuccessfulComponents}
        columns={columns}
        tableHeight={hasSuccessfulComponents === true ? "28.2vh" : "59.5vh"}
      />
    );
  };

  if (!Array.isArray(unsuccessfulComponents) || unsuccessfulComponents.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
        There were no unsuccessful components with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`${unsuccessfulComponents.length} Unsuccessful Components`}
      className={"mt-2"}
    />
  );
}

SalesforceLogSummaryUnsuccessfulComponentsTable.propTypes = {
  unsuccessfulComponents: PropTypes.array,
  hasSuccessfulComponents: PropTypes.bool,
};

export default SalesforceLogSummaryUnsuccessfulComponentsTable;