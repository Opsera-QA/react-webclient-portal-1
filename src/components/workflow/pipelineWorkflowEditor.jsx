import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SourceRepositoryConfig from "./forms/sourceRepository";
import ToolConfigurationSelect from "./forms/toolConfigurationSelect";
 


const PipelineWorkflowEditor = ({ editItem, data, parentCallback }) => {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);

  async function postData(param) {
    console.log("SAVING: ", param);
    console.log("Data: ", data);
    console.log("editItem: ", editItem);
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${data._id}/update`;   
    try {
      await axiosApiService(accessToken).post(apiUrl, param);
      setLoading(false);    
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  
  const handleCloseClick = (param) => {
    parentCallback(param);
  };

  const callbackFunctionTools = (param) => {
    //save actions here, then call parentCallback to refresh scope
    // Follow example in callbackFunctionSource, updating individual propertes in the existing data object
    console.log("param", param);
    parentCallback(param);  
  };

  const callbackFunctionSource = async (item) => {
    data.workflow.source.name = item.name;
    data.workflow.source.repository = item.repository;
    data.workflow.source.branch = item.branch;
    await postData(data);
    parentCallback(data);  
  };

  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        {loading ? <LoadingDialog size="sm" /> :
          <>
            <Row className="mb-2">
              <Col sm={10}><h5>
                {editItem.type === "source" ? "Source Repository Configuration" : "Tool Configuration"}</h5></Col>
              <Col sm={2} className="text-right">
                <FontAwesomeIcon 
                  icon={faTimes} 
                  className="mr-1"
                  style={{ cursor:"pointer" }}
                  onClick={() => { handleCloseClick(); }} />
              </Col>
            </Row>
            
            {editItem.type === "source" ? 
              <SourceRepositoryConfig data={data} parentCallback={callbackFunctionSource} /> : 
              <ToolConfigurationSelect data={data} parentCallback={callbackFunctionTools} />  } 
              

            <div className="text-muted"><small>{JSON.stringify(data)}</small></div>
            <div className="text-muted"><small>{JSON.stringify(editItem)}</small></div>
 
          </>}
      </>
    );
  }
};


PipelineWorkflowEditor.propTypes = {
  editItem: PropTypes.object,
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default PipelineWorkflowEditor;