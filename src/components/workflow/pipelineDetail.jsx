import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
//import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiServiceMultiGet } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import Moment from "react-moment";
import "./workflows.css";

//TODO: How do I get the ID value for the pipeline lookup?
function PipelineDetail({ id }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {    
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrls = [ `/pipelines/${id}`, `/pipelines/${id}/activity` ];   
    try {
      const [pipeline, activity] = await axiosApiServiceMultiGet(accessToken, apiUrls);
      setData({
        pipeline: pipeline && pipeline.data[0],
        activity: activity && activity.data
      });
      setLoading(false);  
      console.log("pipeline", pipeline);      
      console.log("activity", activity);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  
  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        {loading ? <LoadingDialog size="sm" /> :
          <>
            <div className="mt-3 max-content-width">
              {data.length == 0 ?
                <InfoDialog message="No Pipeline details found.  Please ensure you have access to view the requested pipeline." /> : 
                <>
                
                  <ItemSummaryDetail data={data.pipeline} /> 
                  <PipelineWorkflow data={data} /> 
                  <PipelineActivity data={data} /> 
                </>
              }
                
            </div>
          </>
        }
      </>
    );
  }
}


const ItemSummaryDetail = (props) => {
  const { data } = props;
  return (
    <>
      {data !== undefined ? 
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{data.project}</Card.Subtitle>
            <Card.Text>
              {data.description}
              
            </Card.Text>
            <Row className="mt-2">
              <Col lg className="py-1"><span className="text-muted mr-1">ID:</span> {data._id}</Col>
              <Col lg className="py-1"><span className="text-muted mr-1">Owner:</span> {data.owner}</Col>                
            </Row>
            <Row>
              <Col lg className="py-1"><span className="text-muted mr-1">Organization:</span> {data.organizationName}</Col>
              <Col lg className="py-1"><span className="text-muted mr-1">Created On:</span>  <Moment format="MMM Do YYYY, h:mm:ss a" date={data.createdAt} /></Col>
            </Row>
            <Row>
              <Col className="py-1"><span className="text-muted mr-1">Tags:</span> 
                {data.tags.map((item, idx) => (<span key={idx}>{item}, </span>))}</Col>
            </Row>
            <Row>
              <Col md className="py-1"><span className="text-muted mr-1">Source:</span> <span className="upper-case-first">{data.workflow.source.name}</span></Col>
              <Col md className="py-1"><span className="text-muted mr-1">Repository:</span> {data.workflow.source.repository}</Col>
              <Col md className="py-1"><span className="text-muted mr-1">Branch:</span> {data.workflow.source.branch}</Col>
            </Row>
            <Row>
              <Col className="py-1"><span className="text-muted mr-1">Tools:</span> 
                {data.workflow.plan.map((item, idx) => (<span key={idx} className="upper-case-first mr-1">{item.tool.name}, </span>))}</Col>
            </Row>
          </Card.Body>
        </Card> : null}

    </>
    
  );
};



const PipelineWorkflow = (props) => {
  const { data } = props;
  console.log(data);

  return (
    <>
      {data.length > 0 ? 
        <>
          <div>Pipeline UI workflow display here</div>
        </>
        : null}

    </>
    
  );
};


const PipelineActivity = (props) => {
  const { data } = props;
  console.log(data);

  return (
    <>
      {data.length > 0 ? 
        <>
          <div>Pipeline activity/status details ehre</div>
        </>
        : null}

    </>
    
  );
};

PipelineDetail.propTypes = {
  id: PropTypes.string
};

ItemSummaryDetail.propTypes = {
  data: PropTypes.object
};

PipelineWorkflow.propTypes = {
  data: PropTypes.object
};

PipelineActivity.propTypes = {
  data: PropTypes.object
};

export default PipelineDetail;