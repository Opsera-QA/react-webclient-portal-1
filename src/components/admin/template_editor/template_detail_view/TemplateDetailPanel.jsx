import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TemplateEditorPanel from "./TemplateEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";

function TemplateDetailPanel({ templateData, setTemplateData }) {
  const [activeTab, setTabSelection] = useState("settings");

  const handleTabClick = (activeTab) => e => {
    console.log(activeTab);
    e.preventDefault();
    setTabSelection(activeTab);
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col>
            <CustomTabContainer>
              <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Settings"} />
            </CustomTabContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block detail-view-detail-panel">
              {templateData && <TemplateDetailsView activeTab={activeTab} setTemplateData={setTemplateData} templateData={templateData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function TemplateDetailsView({ activeTab, setTemplateData, templateData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
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


