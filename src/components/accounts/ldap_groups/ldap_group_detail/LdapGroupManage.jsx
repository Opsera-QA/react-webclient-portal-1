import React, { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link, useParams } from "react-router-dom";
import accountsActions from "components/accounts/accounts-actions.js";

import "components/accounts/accounts.css";

function LdapGroupManage({ groupData, organization }) {
  const { name } = useParams();
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ nonMembers, setNonMembers ] = useState([]);
  const [ Members, setMembers ] = useState([]);

  useEffect(() => {
    console.log(organization.users);
    setNonMembers(organization.users);
    setMembers(groupData.members);
  }, []);

  const updateMembers = () => {};

  const updateCheckedCell = (event, row) => {
    event.stopPropagation();
    // let index = rowList.indexOf(row);
    //rowList[index][field] = event.target.checked;
  };

  return (
    <div>
      <div className="mb-3 pt-2">
        <Row>
          <Col xs={6}>
            <div className="members-block">
              <div className="members-title">
                <span>
                  <FontAwesomeIcon icon={faUser} fixedWidth className="mr-2" />
                  Not Members
                </span>
                <span>{organization.users.length} members</span>
              </div>
              <ul className="list-group my-1">
                {Object.keys(organization.users).map((member, i) => {
                  return (
                    <li key={i} className="list-group-item">
                      <Form.Check type="checkbox" checked={member.value} onChange={e => updateCheckedCell(e, member)} style={{ textAlign: "center", padding: 0, marginTop: "8px" }} />
                      <div>{organization.users[member].name}</div>
                      <div className="text-muted">{organization.users[member].emailAddress}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>
          <Col xs={6}>
            <div className="members-block">
              <div className="members-title">
                <span>
                  <FontAwesomeIcon icon={faUser} fixedWidth className="mr-2" />
                  Members
                </span>
                <span>{groupData.members.length} members</span>
              </div>
              <ul className="list-group my-1">
                {Object.keys(groupData.members).map((member, i) => {
                  return (
                    <li key={i} className="list-group-item">
                      <div>{organization.users[member].name}</div>
                      <div className="text-muted">{organization.users[member].emailAddress}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="text-right m-2">
              <Button size="sm" variant="primary" onClick={updateMembers}>
                <FontAwesomeIcon icon={faSave} fixedWidth /> Save
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LdapGroupManage;
