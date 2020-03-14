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
  
  
  useEffect(() => {    
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${id}`;   
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl);
      setData(pipeline && pipeline.data[0]);
      setLoading(false);    
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  const callbackFunctionDetail = (item) => {
    console.log("item: ", item);
    setEditItem(item);    
  };

  const callbackFunctionEditor = () => {
    setEditItem();    
  };
  
  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        {loading ? <LoadingDialog size="sm" /> :
          <>
            <div className="mt-3">
              {data.length == 0 ?
                <InfoDialog message="No Pipeline details found.  Please ensure you have access to view the requested pipeline." /> : 
                <>
                  
                  {data !== undefined ?
                    <Row>
                      <Col>
                        <PipelineWorkflowDetail data={data} parentCallback={callbackFunctionDetail} /></Col>
                      <Col md="auto"></Col>
                      {editItem !== undefined ?
                        <Col xs lg="4" className="workflow-editor-panel p-3">
                          <PipelineWorkflowEditor data={editItem} parentCallback={callbackFunctionEditor} /></Col>: null}
                    </Row>
                    
                    : null}
                  
                </>
              }
                
            </div>
          </>
        }
      </>
    );
  }
}


PipelineWorkflow.propTypes = {
  id: PropTypes.string
};

export default PipelineWorkflow;