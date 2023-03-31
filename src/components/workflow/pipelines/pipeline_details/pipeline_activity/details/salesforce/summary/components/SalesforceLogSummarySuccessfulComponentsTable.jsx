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

function SalesforceLogSummarySuccessfulComponentsTable({ hasFailureComponents, successfulComponents }) {
  const fields = salesforceSummaryLogComponentMetadata?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "componentType")),
      getTableTextColumn(getField(fields, "fullName")),
      getTableTextColumn(getField(fields, "fileName")),
      getTableTextColumn(getField(fields, "problem")),
      getTableBooleanIconColumn(getField(fields, "success"), undefined, 75),
      getSalesforceSumamryTableBooleanIconColumn(getField(fields, "warning"), undefined, 75),
      getSalesforceSumamryTableBooleanIconColumn(getField(fields, "created"), undefined, 75),
      getSalesforceSumamryTableBooleanIconColumn(getField(fields, "changed"), undefined, 75),
      getSalesforceSumamryTableBooleanIconColumn(getField(fields, "deleted"), undefined, 75),
    ],
    []
  );

  const getComponentResultsTable = () => {
    return (
      <VanityTable
        data={successfulComponents}
        columns={columns}
        tableHeight={hasFailureComponents === true ? "28.2vh" : "59.5vh"}
      />
    );
  };


  if (!Array.isArray(successfulComponents) || successfulComponents.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faExclamationCircle} />
        There were no successful components with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      body={getComponentResultsTable()}
      titleIcon={faCheckCircle}
      title={`${successfulComponents?.length} Successful Components`}
      className={"mt-2"}
    />
  );
}

SalesforceLogSummarySuccessfulComponentsTable.propTypes = {
  successfulComponents: PropTypes.array,
  hasFailureComponents: PropTypes.bool,
};

export default SalesforceLogSummarySuccessfulComponentsTable;