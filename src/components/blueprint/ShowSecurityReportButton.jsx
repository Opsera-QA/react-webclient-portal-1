import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCode} from "@fortawesome/free-solid-svg-icons";
import ModalTable from "components/blueprint/modalTable";

// TODO: This needs to be refactored, I just isolated the code and will clean it up after I know I didn't break anything
function ShowSecurityReportButton({logData}) {
  const [showTable, setShowTable] = useState(false);

  // TODO: Create Metadata, use fields instead.
  const columns = [
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
  ];

  // TODO: Show overlay panel instead
  const tableViewer = () => {
    setShowTable(true);
  };

  if (!logData?.anchore) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline-dark "
        className="ml-2"
        size="sm"
        onClick={() => {tableViewer();}}
      >
        <FontAwesomeIcon icon={faFileCode} fixedWidth className={"mr-1"}  />
        Security Report
      </Button>
      <ModalTable
        header="Anchore Security Report"
        column_data={columns}
        size="lg"
        jsonData={logData?.anchore}
        stats={logData.stats}
        show={showTable}
        setParentVisibility={setShowTable}
      />
    </>
  );
}

ShowSecurityReportButton.propTypes = {
  logData: PropTypes.object,
};

export default ShowSecurityReportButton;