import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TagEditorPanel from "./TagEditorPanel";

function TagDetailPanel({ tagData, setTagData, canDelete }) {
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
                  <a className={"nav-link " + (tabSelection === "editor" ? "active" : "")} onClick={handleTabClick("editor")} href="#">Tag Editor</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block">
              {tagData && <TagDetailsView tabSelection={tabSelection} setTagData={setTagData} tagData={tagData} canDelete={canDelete} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function TagDetailsView({ tabSelection, setTagData, tagData, canDelete }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [tabSelection, tagData]);

  if (tabSelection) {
    switch (tabSelection) {
    case "editor":
      return <TagEditorPanel setTagData={setTagData} tagData={tagData} canDelete={canDelete} />;
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


