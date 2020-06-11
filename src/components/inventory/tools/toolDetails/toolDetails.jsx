import React, { useContext, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { useParams } from "react-router-dom";

import ToolSummary from "./toolDetailsSummary";
import ToolConfiguration from "./toolDetailsConfiguration";
import ToolLogs from "./toolDetailsLogs";

function ToolDetails(props) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolData, setToolData] = useState({});
  const handleClose = () => props.closeModal(false);
  let { id } = useParams();
  const toolId = id || props.toolId;
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {    
    setToolData({});
    getToolRegistryList();   
  }, [toolId]);

  const getToolRegistryList = async () => {
    try {
      const accessToken = await getAccessToken();
      let apiUrl =  "/registry/" + toolId;
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      
      
      setToolData(response.data[0]);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Modal size="lg" show={props.showModal} onHide={handleClose} className="tool-details-modal">       
        {Object.keys(toolData).length > 0 && (<Modal.Header closeButton>
          <Modal.Title>{toolData.name}</Modal.Title>
        </Modal.Header>)}
        <Modal.Body>

          {Object.keys(toolData).length == 0 && (<h3 className="text-center" style={{ padding: "20%"  }}>Loading ....</h3>)}

          {Object.keys(toolData).length > 0 && (
            <>
              <Button variant={activeTab === "summary" ? "primary" : "link"} onClick={() => setActiveTab("summary")}>Summary</Button>              
              <Button variant={activeTab === "configuration" ? "primary" : "link"} onClick={() => setActiveTab("configuration")}>Configuration</Button>
              <Button variant={activeTab === "logs" ? "primary" : "link"} onClick={() => setActiveTab("logs")}>Logs</Button>

              {activeTab === "summary" ? <ToolSummary toolData={toolData} toolId={toolId} /> : null}


              {activeTab === "configuration" ? <ToolConfiguration toolData={toolData} toolId={toolId} /> : null}
              {activeTab === "logs" ? <ToolLogs toolData={toolData} toolId={toolId} /> : null}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

ToolDetails.propTypes = {
  showModal: PropTypes.bool,
  type: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  toolId: PropTypes.string
};


export default ToolDetails;
