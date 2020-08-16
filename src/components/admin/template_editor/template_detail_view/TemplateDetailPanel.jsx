import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TemplateEditorPanel from "./TemplateEditorPanel";

function TemplateDetailPanel({ templateData, setTemplateData }) {
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
              {templateData && <TemplateDetailsView tabSelection={tabSelection} setTemplateData={setTemplateData} templateData={templateData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function TemplateDetailsView({ tabSelection, setTemplateData, templateData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [tabSelection]);
  if (tabSelection) {
    switch (tabSelection) {
    case "settings":
      return <TemplateEditorPanel setTemplateData={setTemplateData} templateData={templateData} />;
    default:
      return null;
    }
  }
}

TemplateDetailPanel.propTypes = {
  templateData: PropTypes.object,
  setTemplateData: PropTypes.func,
  orgDomain: PropTypes.string
};

export default TemplateDetailPanel;


