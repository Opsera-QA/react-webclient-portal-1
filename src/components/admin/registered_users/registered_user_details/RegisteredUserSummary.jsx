import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import TextField from "components/common/form_fields/text-field";
import DateField from "components/common/form_fields/date-field";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

import "components/inventory/tools/tools.css";

function RegisteredUserSummary({ userData } ) {
  return (
    <>
      { Object.keys(userData).length > 0  && <>
        <div className="scroll-y pt-3 px-3">
          <div className="mb-3 flat-top-content-block p-3">
            <Row>
              <Col md={4}>
                <TextField label="User ID" value={userData._id} />
              </Col>
              <Col md={4}>
                <DateField label="Created" value={userData.createdAt} />
              </Col>
              <Col md={4}>
                {userData.enabledTools.map((data) => { return <Button className="mr-2" variant="primary" size="sm">{capitalizeFirstLetter(data)}</Button> })}
              </Col>
              <Col md={4}>
                <TextField label="Data Usage" value={userData.dataUsage ? "Active" : "Disabled"} />
              </Col>
              <Col md={4}>
                <TextField label="Active" value={userData.active ? "Active" : "Disabled"} />
              </Col>
              <Col md={4}>
                <TextField label="Hits Index" value={userData.hitsIndex.toString()} />
              </Col>  
              <Col md={4}>
                <TextField label="Allow Data" value={userData.allowData ? "Active" : "Disabled"} />
              </Col>    
              <Col md={4}>
                <TextField label="Server Url" value={userData.analyticsServerUrl} />
              </Col> 
              <Col md={4}>
                <TextField label="Workflow Infrastructure" value={userData.workflowType.Infrastructure ? "Active" : "Disabled"} />
              </Col>    
              <Col md={4}>
                <TextField label="Workflow Pipeline" value={userData.workflowType.Pipeline ? "Active" : "Disabled"} />
              </Col> 
              <Col md={12}>
                <TextField label="Persona" value={userData.defaultPersona} />
              </Col>
            </Row>
          </div>
        </div>
      </>}
    </>
  );
}

RegisteredUserSummary.propTypes = {};

export default RegisteredUserSummary;





