import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faBug} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";
import {getExternalLinkIconColumnDefinition, getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import anchoreSecurityReportMetadata
  from "components/blueprint/security_reports/anchore/anchoreSecurityReport.metadata";

function AnchoreSecurityReportTable({ anchoreSecurityVulnerabilities }) {
  const fields = anchoreSecurityReportMetadata.fields;

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "severity",
        desc: true,
      },
      {
        id: "cvss_base",
        desc: true,
      },
      {
        id: "cvss_exploitability_score",
        desc: true,
      },
      {
        id: "cvss_impact_score",
        desc: true,
      },
    ],
  };

  const columns = useMemo(() => [
    getTableTextColumn(getField(fields, "vulnerability"), "no-wrap-inline"),
    getTableTextColumn(getField(fields, "package_name")),
    getTableTextColumn(getField(fields, "severity")),
    getTableTextColumn(getField(fields, "cvss_base"), "console-text-invert-modal"),
    getTableTextColumn(getField(fields, "cvss_exploitability_score"), "console-text-invert-modal"),
    getTableTextColumn(getField(fields, "cvss_impact_score"), "console-text-invert-modal"),
    getExternalLinkIconColumnDefinition(getField(fields, "url"), "Open Vulnerability Details in New Window"),
  ], []);

  const getAnchoreSecurityReportTable = () => {
    return (
      <ClientSidePaginationMakeupTable
        columns={columns}
        data={anchoreSecurityVulnerabilities}
        initialState={initialState}
      />
    );
  };

  return (
    <FilterContainer
      className={"my-2"}
      showBorder={false}
      body={getAnchoreSecurityReportTable()}
      titleIcon={faBug}
      title={"Anchore Vulnerabilities"}
    />
  );
}

AnchoreSecurityReportTable.propTypes = {
  anchoreSecurityVulnerabilities: PropTypes.array,
};

export default AnchoreSecurityReportTable;
