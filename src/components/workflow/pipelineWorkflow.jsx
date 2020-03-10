import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import "./workflows.css";


function PipelineWorkflow({ id }) {
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
                
                  
                  <PipelineWorkflowDetail data={data} /> 
                  
                </>
              }
                
            </div>
          </>
        }
      </>
    );
  }
}


// const ItemSummaryDetail = (props) => {
//   const { data } = props;
//   return (
//     <>
//       {data !== undefined ? 
//         <Card className="mb-3">
//           <Card.Body>
//             <Card.Title>{data.name}</Card.Title>
//             <Card.Subtitle className="mb-2 text-muted">{data.project}</Card.Subtitle>
//             <Card.Text>
//               {data.description}
              
//             </Card.Text>
//             <Row className="mt-2">
//               <Col lg className="py-1"><span className="text-muted mr-1">ID:</span> {data._id}</Col>
//               <Col lg className="py-1"><span className="text-muted mr-1">Owner:</span> {data.owner}</Col>                
//             </Row>
//             <Row>
//               <Col lg className="py-1"><span className="text-muted mr-1">Organization:</span> {data.organizationName}</Col>
//               <Col lg className="py-1"><span className="text-muted mr-1">Created On:</span>  <Moment format="MMM Do YYYY, h:mm:ss a" date={data.createdAt} /></Col>
//             </Row>
//             <Row>
//               <Col className="py-1"><span className="text-muted mr-1">Tags:</span> 
//                 {data.tags.map((item, idx) => (<span key={idx}>{item}, </span>))}</Col>
//             </Row>
//             <Row>
//               <Col md className="py-1"><span className="text-muted mr-1">Source:</span> <span className="upper-case-first">{data.workflow.source.name}</span></Col>
//               <Col md className="py-1"><span className="text-muted mr-1">Repository:</span> {data.workflow.source.repository}</Col>
//               <Col md className="py-1"><span className="text-muted mr-1">Branch:</span> {data.workflow.source.branch}</Col>
//             </Row>
//             <Row>
//               <Col className="py-1"><span className="text-muted mr-1">Tools:</span> 
//                 {data.workflow.plan.map((item, idx) => (<span key={idx} className="upper-case-first mr-1">{item.tool.name}, </span>))}</Col>
//             </Row>
//           </Card.Body>
//         </Card> : null}

//     </>
    
//   );
// };



const PipelineWorkflowDetail = (props) => {
  const { data } = props;
  console.log(data);

  return (
    <>
      {data !== undefined ?
        <>
          <div>Pipeline UI workflow display here</div>
        </>
        : null}

    </>
    
  );
};


PipelineWorkflow.propTypes = {
  id: PropTypes.string
};

PipelineWorkflowDetail.propTypes = {
  data: PropTypes.object
};

// ItemSummaryDetail.propTypes = {
//   data: PropTypes.object
// };



export default PipelineWorkflow;