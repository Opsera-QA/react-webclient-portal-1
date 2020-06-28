import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import { Row, Col } from "react-bootstrap";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import PipelineWorkflow from "./pipelineWorkflow";
import PipelineWorkflowEditor from "./pipelineWorkflowItemEditor";
import "./workflows.css";

function PipelineWorkflowView({ id }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [editItem, setEditItem] = useState(false);
  const [role, setRole] = useState("");
  
  useEffect(() => {    
    console.log("refreshing root");
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();        
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, []);

  async function fetchData() {
    const { getAccessToken, getUserSsoUsersRecord } = contextType;
    const accessToken = await getAccessToken();
    const ssoUsersRecord = await getUserSsoUsersRecord();
    const apiUrl = `/pipelines/${id}`;         
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl);      
      setData(pipeline && pipeline.data[0]);
      setPipelineAttributes(pipeline && pipeline.data[0], ssoUsersRecord._id);
      
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  }


  const setPipelineAttributes = (pipeline, ssoUsersId) => {
    if (typeof(pipeline.roles) !== "undefined") {
      let userRoleObject = pipeline.roles.findIndex(x => x.user === ssoUsersId); 
      
      console.log("userRoleObject", userRoleObject);
      if (userRoleObject >= 0) {
        setRole(pipeline.roles[userRoleObject].role);
      } else {
        setRole("");
      }
    }    
  };

  //no param will just refresh the pipeline data object, passing param tells the UI to open the edit screen for that object
  const fetchPlan = async (param) => {
    setEditItem(false);
    await fetchData();
    if (param) {
      setEditItem(param);   
    } 
  };

  const closeEditorPanel = () => {
    setEditItem(false);    
  };
  
  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
          
        <div className="mt-1 workflow-view">
          {typeof(data) !== "undefined" ?
            <Row>
              <Col>
                <PipelineWorkflow data={data} editItemId={editItem.step_id} fetchPlan={fetchPlan} role={role} /></Col>
              <Col md="auto"></Col>
              {editItem ?
                <Col xs lg="4" className="workflow-editor-panel p-3">
                  <PipelineWorkflowEditor editItem={editItem} data={data} closeEditorPanel={closeEditorPanel} fetchPlan={fetchPlan} /></Col>: null}
            </Row> : null}

          {data.length == 0 ?
            <InfoDialog message="No Pipeline details found.  Please ensure you have access to view the requested pipeline." /> : null }
          
                
        </div> 
      </>
    );
  }
}


PipelineWorkflowView.propTypes = {
  id: PropTypes.string
};

export default PipelineWorkflowView;