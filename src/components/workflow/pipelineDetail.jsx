import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
//import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import "./workflows.css";

//TODO: How do I get the ID value for the pipeline lookup?
function PipelineDetail() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // let history = useHistory();
  // const handleClick = param => e => {
  //   e.preventDefault();
  //   history.push(`/${param}`);
  // };

  useEffect(() => {    
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();

    const apiCall = new ApiService("/pipelines", {}, accessToken);
    apiCall.get()
      .then(function (result) {
        console.log(result);
        setData(result.data);
        setLoading(false);        
      })
      .catch(function (error) {
        setLoading(false);
        setErrors(error);
        console.log(`Error Reported: ${error}`);
      });
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
                  <ItemSummaryDetail data={data} /> 
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
  console.log(data);

  return (
    <>
      {data.length > 0 ? 
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{data.project}</Card.Subtitle>
            <Card.Text>
              {data.description}
            </Card.Text>
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

ItemSummaryDetail.propTypes = {
  data: PropTypes.array
};

PipelineWorkflow.propTypes = {
  data: PropTypes.array
};

PipelineActivity.propTypes = {
  data: PropTypes.array
};

export default PipelineDetail;