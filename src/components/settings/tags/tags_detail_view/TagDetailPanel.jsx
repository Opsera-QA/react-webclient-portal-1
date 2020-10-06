import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TagEditorPanel from "./TagEditorPanel";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";
import CustomTab from "../../../common/tabs/CustomTab";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";

function TagDetailPanel({ tagData, setTagData }) {
  const [activeTab, setTabSelection] = useState("settings");

  const handleTabClick = (activeTab) => e => {
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
            <div className="content-block-collapse">
              {tagData && <TagDetailsView activeTab={activeTab} setTagData={setTagData} tagData={tagData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function TagDetailsView({ activeTab, setTagData, tagData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab, tagData]);

  if (activeTab) {
    switch (activeTab) {
    case "settings":
      return <TagEditorPanel setTagData={setTagData} tagData={tagData} />;
    default:
      return null;
    }
  }
}

TagDetailPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
  canDelete: PropTypes.bool
};

export default TagDetailPanel;


