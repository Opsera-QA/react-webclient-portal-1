import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToolTypeEditorPanel from "./ToolTypeEditorPanel";

function ToolTypeDetailPanel({ toolTypeData, setToolTypeData }) {
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
              {toolTypeData && <ToolTypeDetailsView tabSelection={tabSelection} setToolTypeData={setToolTypeData} toolTypeData={toolTypeData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function ToolTypeDetailsView({ tabSelection, setToolTypeData, toolTypeData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [tabSelection]);
  if (tabSelection) {
    switch (tabSelection) {
    case "settings":
      return <ToolTypeEditorPanel setToolTypeData={setToolTypeData} toolTypeData={toolTypeData} />;
    default:
      return null;
    }
  }
}

ToolTypeDetailPanel.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
};

export default ToolTypeDetailPanel;


