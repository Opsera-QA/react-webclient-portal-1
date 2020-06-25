import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, OverlayTrigger, Card, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../../contexts/AuthContext"; 
import { ApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import Pagination from "components/common/pagination";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faSearch, faFlag, faPlay, faClock, faIdBadge, faTimesCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import PipelineHelpers from "./pipelineHelpers";
import { Spinner } from "react-bootstrap";
import "./workflows.css";


function MyPipelines() {
  const contextType = useContext(AuthContext);
  const [errors, setErrors] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [sortOption, setSortOption] = useState({ name: "name", text: "Pipeline Name (a-z)", order: 1 });
  
  // Executed every time page number, page size, or sort option changes
  useEffect(() => {    
    fetchData();
  }, [currentPage, pageSize, sortOption]);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();

    const apiCall = new ApiService(`/pipelines?page=${currentPage}&size=${pageSize}&sort=${sortOption.name}&order=${sortOption.order}`, {}, accessToken);
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
  
  const gotoPage = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const sortPage = (pageNumber, sortOption) => {
    setCurrentPage(pageNumber);
    setSortOption(sortOption);
  };
  
  if (loading) {
    return (
      <div className="row" style={{ height:"250px" }}>
        <div className="col-sm-12 my-auto text-center">
          <Spinner as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true" /> 
        </div>
      </div>);
  } else {
    return (
      <>        
        {errors && <ErrorDialog error={errors} />}
        
        <div className="mt-3 max-content-width">
          { data && data.count === 0 ? 
            <WelcomeView />
            :
            <>
              {data && data.count && data.response && 
              <>
                <div className="mb-4">
                  <Pagination total={data.count} currentPage={currentPage} pageSize={pageSize} location="top" sortOption={sortOption} onClick={(pageNumber, pageSize, sortOption) => sortPage(pageNumber, sortOption)} />
                  <ItemSummaries data={data.response} />  
                  <Pagination total={data.count} currentPage={currentPage} pageSize={pageSize} onClick={(pageNumber, pageSize, sortOption) => gotoPage(pageNumber, pageSize)} />
                </div>
              </>
              }
            </>  
          }          
        </div>        
      </>
    );
  }
}


const WelcomeView = () => {

  return (
    <div className="pl-2 mt-5">      
      <div className="h5 mb-3 mt-4">Welcome to OpsERA Pipelines!</div>
      
              
      <div className="row mx-n2 mt-1 pl-2">
        <div className="col-md-1 px-2 landing-content-module">
          <img alt="OpsERA"
            src="/img/pipeline.png"
            style={{ width:"auto", height:"150px" }}
            className="d-inline-block align-top ml-2"
          />
        </div>
        <div className="col-md-6 px-2 text-muted pt-5">
        OpsERA's Advanced Orchestration Technology combined with our robust tools experience will enable you to build and manage various continuous integration 
        and delivery as well as unique policy based pipelines saving you time and resources!
        </div>
        <div className="col-md px-2 text-muted"></div>
      </div>

      <div className="row mx-n2 mt-4" style={{ maxWidth:"620px" }}>
        <div className="col-md px-2 landing-content-module">
          <div className="text-muted mb-3">
             At this time you do not have any pipelines configured.  Please visit the Catalog in order to add a workflow template to your pipeline.</div>
          <LinkContainer to={"/workflow/catalog"}>
            <Button variant="success" className="px-2">
              <FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/>Get Started!</Button>
          </LinkContainer>
        </div>
      </div>
    </div> 
  );
};





const ItemSummaries = (props) => {
  const { data } = props;
  let history = useHistory();
  
  const handleDetailsClick = param => e => {
    e.preventDefault();
    history.push(`/workflow/${param}`);
  };
  
  return (
    <>
      <Row>
        {data !== undefined ? data.map((item, idx) => (
          <Col md={6} lg={6} xl={4} key={idx} className="p-2">
            <Card style={{ height:"100%"  }}>
              <Card.Body>
                <Card.Title>
                  { PipelineHelpers.getPendingApprovalStep(item) && 
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Approval Required" })} >
                    <FontAwesomeIcon icon={faFlag} className="red mr-1" />
                  </OverlayTrigger> }

                  { PipelineHelpers.getPipelineStatus(item) === "failed" && 
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "An error has occurred in this pipeline.  See activity logs for details." })} >
                    <FontAwesomeIcon icon={faTimesCircle} className="red mr-1" />
                  </OverlayTrigger> }

                  { PipelineHelpers.getPipelineStatus(item) === "running" && 
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "A pipeline operation is currently in progress." })} >
                    <FontAwesomeIcon icon={faSpinner} spin className="green mr-1" />
                  </OverlayTrigger> }

                  {item.name}</Card.Title>
                <Card.Text className="mb-2">{item.description}</Card.Text>
              
                <Row className="mt-2">
                  <Col lg className="text-muted">
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faTags} size="sm" fixedWidth className="mr-1"/>  
                  Tags: {item.tags.map((item, idx) => (<span key={idx}>{item} </span>))}</small>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col lg className="text-muted">
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faIdBadge} size="sm" fixedWidth className="mr-1"/>  
                      ID: {item._id}</small>
                  </Col>
                </Row>
                { item.workflow.schedule !== undefined && item.workflow.schedule.start_date !== null && 
                <Row className="mt-1">
                  <Col lg className="">
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faClock} size="sm" fixedWidth className="mr-1"/> Scheduled for  &nbsp;
                      {format(new Date(item.workflow.schedule.start_date), "yyyy-MM-dd', 'hh:mm a")}</small>
                  </Col>
                </Row> }

              </Card.Body>
              <Card.Footer style={{ backgroundColor: "#fff" }}>
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight m-auto">
                    <Button variant="primary" size="sm" className="mr-2 btn-block" onClick={handleDetailsClick(item._id)}>
                      <FontAwesomeIcon icon={faSearch} className="mr-1"/> View </Button>
                  </div>                                    
                  <div className="p-2 bd-highlight align-items-end mt-auto">
                    <small className="text-muted">Updated {format(new Date(item.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</small><br/>
                    <small className="text-muted">Created {format(new Date(item.createdAt), "yyyy-MM-dd', 'hh:mm a")}</small>
                  </div>                  
                </div>              
              </Card.Footer>
            </Card>
          </Col>)) : null}
      </Row>



      {/* 
      
              </Col>
              { item.workflow.last_step.hasOwnProperty("failed") ? 
                <Col className="failure-text">Last Failure on: {format(new Date(item.workflow.last_step.failed.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</Col> : null }
              
              { item.workflow.last_step.hasOwnProperty("success") ? 
                <Col className="green">Last Successful on : {format(new Date(item.workflow.last_step.success.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</Col> : null }
            </Row> : null }

       */}

    </>
    
  );
};


function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

ItemSummaries.propTypes = {
  data: PropTypes.array
};

export default MyPipelines;
