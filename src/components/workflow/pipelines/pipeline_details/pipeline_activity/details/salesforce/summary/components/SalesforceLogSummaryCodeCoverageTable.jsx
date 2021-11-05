import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import salesforceSummaryLogCodeCoverageWarningMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/metadata/salesforceSummaryLogCodeCoverageWarning.metadata";
  import {
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import IconBase from "components/common/icons/IconBase";

function SalesforceLogSummaryCodeCoverageTable({ hasCodeCoverageComponents, codeCoverageComponents }) {
  const fields = salesforceSummaryLogCodeCoverageWarningMetadata?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "id")),
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "message")),
    ],
    []
  );

  const getComponentResultsTable = () => {
    return (
      <VanityTable
        data={codeCoverageComponents}
        columns={columns}
        tableHeight={hasCodeCoverageComponents === true ? "28.2vh" : "59.5vh"}
      />
    );
  };

  if (!Array.isArray(codeCoverageComponents) || codeCoverageComponents.length === 0) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
        There were no code coverage failed components with this execution.
      </div>
    );
  }

  return (
    <FilterContainer
      showBorder={false}
      body={getComponentResultsTable()}
      titleIcon={faExclamationCircle}
      title={`${codeCoverageComponents.length} Code Coverage Errors`}
      className={"mt-2"}
    />
  );
}

SalesforceLogSummaryCodeCoverageTable.propTypes = {
  codeCoverageComponents: PropTypes.array,
  hasCodeCoverageComponents: PropTypes.bool,
};

export default SalesforceLogSummaryCodeCoverageTable;