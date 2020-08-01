import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LdapUserEditorPanel from "./LdapUserEditorPanel";

function LdapUserDetailPanel({ ldapUserData, setLdapUserData, canDelete }) {
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
            <div className="tabbed-content-block">
              {ldapUserData && <LdapDetailsView tabSelection={tabSelection} setLdapUserData={setLdapUserData} ldapUserData={ldapUserData} canDelete={canDelete} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapDetailsView({ tabSelection, setLdapUserData, ldapUserData, canDelete }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [tabSelection]);
  if (tabSelection) {
    switch (tabSelection) {
    case "settings":
      return <LdapUserEditorPanel setLdapUserData={setLdapUserData} ldapUserData={ldapUserData} canDelete={canDelete} />;
    default:
      return null;
    }
  }
}

LdapUserDetailPanel.propTypes = {
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  canDelete: PropTypes.bool
};

export default LdapUserDetailPanel;


