import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link, useParams } from "react-router-dom";
import accountsActions from "components/accounts/accounts-actions.js";

function LdapGroupManage({ groupData, organization }) {
  const { name } = useParams();
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [ isAdminCheck, setAdminStatus] = useState(false);

  useEffect(() => {  
  }, []);

  return (
    <div> 
      <div className="mb-3 pt-2">
        <Row>
          <Col xs={6}>
            <p>Not Members</p>
          </Col>
          <Col xs={6}>
            <p>Members</p>
            <ul className="list-group my-1">
              {Object.keys(groupData.members).map((member, i) => { 
                return <li className="list-group-item">{member}</li>;
              })}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}


export default LdapGroupManage;