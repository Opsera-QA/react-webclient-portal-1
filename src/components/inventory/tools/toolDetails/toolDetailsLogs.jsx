import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { useParams } from "react-router-dom";

import "components/inventory/tools/tools.css";

function ToolLogs(props) {
  const { toolId, toolData } = props;
  

  return (
    <>
      <div className="text-center p-5 text-muted">Logs data coming soon</div>
    </>
  );
}

ToolLogs.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object
};


export default ToolLogs;
