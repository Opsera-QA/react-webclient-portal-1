import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RegisteredUserEditorPanel from "./RegisteredUserEditorPanel";

function RegisteredUserDetailsPanel({ userData, setUserData, canDelete }) {
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
                  <a className={"nav-link " + (tabSelection === "editor" ? "active" : "")} onClick={handleTabClick("editor")} href="#">Settings</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block">
             {Object.values(userData).length > 0 && <RegisteredUserEditorPanel setUserData={setUserData} userData={userData} canDelete={canDelete} /> } 
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

RegisteredUserDetailsPanel.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  canDelete: PropTypes.bool
};

export default RegisteredUserDetailsPanel;


