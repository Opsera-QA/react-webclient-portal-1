import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faBug} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";
import {
  getCustomTableAccessor,
  getCustomTableHeader, getExternalLinkIconColumnDefinition,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import twistlockSecurityReportMetadata
  from "components/blueprint/security_reports/twistlock/twistlockSecurityReport.metadata";
import RiskFactorDisplayer from "components/blueprint/security_reports/twistlock/RiskFactorDisplayer";

export const getRiskFactorColumnDefinition = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const riskFactors = row?.value;

      return (
        <RiskFactorDisplayer
          riskFactors={riskFactors}
        />
      );
    },
    class: className ? className : "no-wrap-inline"
  };
};

function TwistlockSecurityReportTable({ twistlockSecurityReportVulnerabilities }) {
  const fields = twistlockSecurityReportMetadata?.fields;

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "severity",
        desc: true,
      },
      {
        id: "cvss",
        desc: true,
      }
    ],
  };

  const columns = useMemo(() =>  [
    getTableTextColumn(getField(fields, "vulnerability")),
    getTableTextColumn(getField(fields, "package_name")),
    getTableTextColumn(getField(fields, "severity")),
    getTableTextColumn(getField(fields, "cvss"), "console-text-invert-modal"),
    getRiskFactorColumnDefinition(getField(fields, "risk_factors")),
    getExternalLinkIconColumnDefinition(getField(fields, "url"), "Open Vulnerability Details in New Window"),
  ], []);

  const getTwistlockSecurityReportTable = () => {
    return (
      <ClientSidePaginationMakeupTable
        columns={columns}
        data={twistlockSecurityReportVulnerabilities}
        initialState={initialState}
      />
    );
  };

  return (
    <FilterContainer
      className={"my-2"}
      showBorder={false}
      body={getTwistlockSecurityReportTable()}
      titleIcon={faBug}
      title={"Twistlock Vulnerabilities"}
    />
  );
}

TwistlockSecurityReportTable.propTypes = {
  twistlockSecurityReportVulnerabilities: PropTypes.array,
};

export default TwistlockSecurityReportTable;
