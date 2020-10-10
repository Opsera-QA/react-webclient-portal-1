import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToolIdentifierEditorPanel from "./ToolIdentifierEditorPanel";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";

function ToolIdentifierDetailPanel({ toolIdentifierData, setToolIdentifierData }) {
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
            <div className="shaded-panel detail-view-detail-panel">
              {toolIdentifierData && <ToolTypeDetailsView activeTab={activeTab} setToolIdentifierData={setToolIdentifierData} toolIdentifierData={toolIdentifierData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function ToolTypeDetailsView({ activeTab, setToolIdentifierData, toolIdentifierData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
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


