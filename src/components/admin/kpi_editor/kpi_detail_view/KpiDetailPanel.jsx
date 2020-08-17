import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import KpiEditorPanel from "./KpiEditorPanel";

function KpiDetailPanel({ kpiData, setKpiData, canDelete }) {
  const [tabSelection, setTabSelection] = useState("editor");

  const handleTabClick = (tabSelection) => e => {
    console.log(tabSelection);
    e.preventDefault();
    setTabSelection(tabSelection);
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col>
            <div className="default-custom-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (tabSelection === "editor" ? "active" : "")} onClick={handleTabClick("editor")} href="#">KPI Editor</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block">
              {kpiData && <TagDetailsView tabSelection={tabSelection} setKpiData={setKpiData} kpiData={kpiData} canDelete={canDelete} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function TagDetailsView({ tabSelection, setKpiData, kpiData, canDelete }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [tabSelection, kpiData]);

  if (tabSelection) {
    switch (tabSelection) {
    case "editor":
      return <KpiEditorPanel setKpiData={setKpiData} kpiData={kpiData} canDelete={canDelete} />;
    default:
      return null;
    }
  }
}

KpiDetailPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
  canDelete: PropTypes.bool
};

export default KpiDetailPanel;


