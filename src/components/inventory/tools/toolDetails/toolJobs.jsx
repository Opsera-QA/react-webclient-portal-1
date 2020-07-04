import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";

function ToolJobs(props) {
  const { toolId, toolData, accessToken } = props;
  

  return (
    <>
      <div className="text-center p-5 text-muted mt-5">Tool jobs: create / manage coming soon</div>
    </>
  );
}

ToolJobs.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object,
  accessToken: PropTypes.string
};


export default ToolJobs;
