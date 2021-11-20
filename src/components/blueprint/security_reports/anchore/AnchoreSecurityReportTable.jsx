import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faBug} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";

// TODO: Refactor further.
function AnchoreSecurityReportTable({ anchoreSecurityVulnerabilities }) {
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

  // TODO: Create Metadata, use fields instead.
  const columns = useMemo(() => [
    {
      Header: "Vulnerability",
      accessor: "vulnerability",
      class: "cell-center no-wrap-inline",
    },
    {
      Header: "Package Name",
      accessor: "package_name",
    },
    {
      Header: "Severity",
      accessor: "severity",
    },
    {
      Header: "CVSS Base",
      accessor: "cvss_base",
      Cell: function getValue(row)  {
        return row ?
          <div className="console-text-invert-modal">{row.value}</div> :
          "N/A";
      }
    },
    {
      Header: "CVSS Exploitability",
      accessor: "cvss_exploitability_score",
      Cell: function getValue(row)  {
        return row ?
          <div className="console-text-invert-modal">{row.value}</div> :
          "N/A";
      }
    },
    {
      Header: "CVSS Impact",
      accessor: "cvss_impact_score",
      Cell: function getValue(row) {
        return row ?
          <div className="console-text-invert-modal">{row.value}</div> :
          "N/A";
      }
    },
    {
      Header: "Vulnerability URL",
      accessor: "url",
      Cell: function getValue(row) {
        return row ?
          <a href={row.value} target="_blank" rel="noreferrer" className="text-muted console-text-invert-modal">{row.value}</a> :
          "N/A";
      },
    }
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
