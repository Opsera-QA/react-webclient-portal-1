import React, {useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import salesforceSummaryLogUnitTestResultMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/metadata/salesforceSummaryLogUnitTestResult.metadata";
import {
  getColumnHeader, getColumnId,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";

export const getApexClassUrlColumnDefinition = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    sortable: false,
    class: className ? className : undefined,
    tooltipTemplate: function (value, row) {
      const url = `${row?.apexClass?.attributes?.url}`;
      return `<div class="custom-tooltip"><span>${url}</span></div>`;
    },
    template: (text, row) => {
      return row?.apexClass?.attributes?.url;
    },
  };
};

function SalesforceLogSummaryTestResultsTableBase({ hasSuccessAndFailureTests, testResults, title, icon,  }) {
  const fields = salesforceSummaryLogUnitTestResultMetadata?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "methodName")),
      getTableDateTimeColumn(getField(fields, "testTimestamp")),
      // getTableTextColumn(getField(fields, "apexClass.attributes.type")),
      getApexClassUrlColumnDefinition(getField(fields, "apexClass.attributes.url")),
    ],
    []
  );

  const getTestResultsTable = () => {
    return (
      <VanityTable
        data={testResults}
        columns={columns}
        tableHeight={hasSuccessAndFailureTests === true ? "28.2vh" : "59.5vh"}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      body={getTestResultsTable()}
      titleIcon={icon}
      title={title}
      className={"mt-3"}
    />
  );
}

SalesforceLogSummaryTestResultsTableBase.propTypes = {
  testResults: PropTypes.array,
  hasSuccessAndFailureTests: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.object,
};

export default SalesforceLogSummaryTestResultsTableBase;