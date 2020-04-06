import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import { Row, Col } from "react-bootstrap";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import PipelineWorkflowDetail from "./pipelineWorkflowDetail";
import PipelineWorkflowEditor from "./pipelineWorkflowEditor";
import "./workflows.css";



function PipelineWorkflow({ id }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState();
  const [ssoUserId, setSsoUserId] = useState("");
  const [reload, setReload] = useState(true);
  const [role, setRole] = useState("");
  
  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
        setReload(false);
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
  }, [setData, reload]);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken, getUserSsoUsersRecord } = contextType;
    const accessToken = await getAccessToken();
    const ssoUsersRecord = await getUserSsoUsersRecord();
    const apiUrl = `/pipelines/${id}`;   
    setSsoUserId(ssoUsersRecord._id.toString());
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl);      
      setData(pipeline && pipeline.data[0]);
      setPipelineAttributes(pipeline && pipeline.data[0], ssoUsersRecord._id);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  const setPipelineAttributes = (pipeline, ssoUsersId) => {
    if (typeof(pipeline.roles) !== "undefined") {
      let adminRoleIndex = pipeline.roles.findIndex(x => x.role === "administrator"); 
      if (pipeline.roles[adminRoleIndex].user === ssoUsersId) {
        setRole(pipeline.roles[adminRoleIndex].role);
      }
    }
    
  };

  const callbackFunctionDetail = async (param) => {
    if (param) {
      setEditItem(param);   
    } else {
      setReload(true);
      await fetchData();      
    }    
  };

  const callbackFunctionEditor = () => {
    setEditItem();    
  };
  
  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        {loading ? <LoadingDialog size="lg" /> : null }
          
        <div className="mt-3">
          {typeof(data) !== "undefined" ?
            <Row>
              <Col>
                <PipelineWorkflowDetail data={data} parentCallback={callbackFunctionDetail} role={role} /></Col>
              <Col md="auto"></Col>
              {editItem !== undefined ?
                <Col xs lg="4" className="workflow-editor-panel p-3">
                  <PipelineWorkflowEditor editItem={editItem} data={data} parentCallback={callbackFunctionEditor} /></Col>: null}
            </Row> : null}

          {data.length == 0 ?
            <InfoDialog message="No Pipeline details found.  Please ensure you have access to view the requested pipeline." /> : null }
          
                
        </div> 
      </>
    );
  }
}


PipelineWorkflow.propTypes = {
  id: PropTypes.string
};

export default PipelineWorkflow;