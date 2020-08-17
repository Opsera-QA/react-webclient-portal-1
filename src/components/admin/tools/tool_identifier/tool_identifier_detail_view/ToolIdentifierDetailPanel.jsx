import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToolIdentifierEditorPanel from "./ToolIdentifierEditorPanel";

function ToolIdentifierDetailPanel({ toolIdentifierData, setToolIdentifierData }) {
  const [tabSelection, setTabSelection] = useState("settings");

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
                  <a className={"nav-link " + (tabSelection === "settings" ? "active" : "")} onClick={handleTabClick("settings")} href="#">Settings</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block detail-view-detail-panel">
              {toolIdentifierData && <ToolTypeDetailsView tabSelection={tabSelection} setToolIdentifierData={setToolIdentifierData} toolIdentifierData={toolIdentifierData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function ToolTypeDetailsView({ tabSelection, setToolIdentifierData, toolIdentifierData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [tabSelection]);
  if (tabSelection) {
    switch (tabSelection) {
    case "settings":
      return <ToolIdentifierEditorPanel setToolIdentifierData={setToolIdentifierData} toolIdentifierData={toolIdentifierData} />;
    default:
      return null;
    }
  }
}

ToolIdentifierDetailPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setToolIdentifierData: PropTypes.func,
};

export default ToolIdentifierDetailPanel;


