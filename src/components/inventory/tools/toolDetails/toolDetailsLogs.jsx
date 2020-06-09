import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { useParams } from "react-router-dom";

import "components/inventory/tools/tools.css";

function ToolLogs(props) {
  const toolId = props.toolId;
  const toolData = props.toolData;

  return (
    <>
      <p>Logs tab</p>
    </>
  );
}

ToolLogs.propTypes = {

};


export default ToolLogs;
