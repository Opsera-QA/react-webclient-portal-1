import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {faBug} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ClientSidePaginationMakeupTable from "components/common/table/makeup/ClientSidePaginationMakeupTable";

// TODO: Refactor further.
function TwistlockSecurityReportTable({ twistlockSecurityReportVulnerabilities }) {
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

  // TODO: Create Metadata, use fields instead.
  const columns = useMemo(() =>  [
    {
      Header: "Vulnerability",
      accessor: "vulnerability",
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
      Header: "CVSS",
      accessor: "cvss",
      Cell: function getValue(row)  {
        return row ?
          <div className="console-text-invert-modal">{row.value}</div> :
          "N/A";
      }
    },
    {
      Header: "Risk Factors",
      accessor: "risk_factors",
      Cell: function getValue(row)  {
        return row ?
          <div className="console-text-invert-modal">{row.value.join(", ")}</div> :
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
