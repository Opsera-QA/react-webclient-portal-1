import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";
import ErrorDialog from "components/common/status_notifications/error";
import Pagination from "components/common/pagination";
import "../workflows.css";
import PipelineItem from "./PipelineItem";
import PropTypes from "prop-types";
import pipelineActions from "../pipeline-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import PipelineWelcomeView from "./PipelineWelcomeView";

function PipelinesView({ currentTab, setActiveTab }) {
  const { getAccessToken } = useContext(AuthContext);
  const [errors, setErrors] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [sortOption, setSortOption] = useState({ name: "name", text: "Pipeline Name (a-z)", order: 1 });

  // Executed every time page number, page size, or sort option changes
  useEffect(() => {    
    fetchData();
  }, [currentPage, pageSize, sortOption, currentTab]);

  async function fetchData() {
    setLoading(true);

    try {
      const pipelinesResponse = await pipelineActions.getPipelines(currentPage, pageSize, sortOption, currentTab, getAccessToken);
      setData(pipelinesResponse.data);
    }
    catch (error)
    {
      setErrors(error);
      console.log(`Error Reported: ${error}`);
    }
    finally {
      setLoading(false)
    }
  }
  
  const gotoPage = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const sortPage = (pageNumber, sortOption) => {
    setCurrentPage(pageNumber);
    setSortOption(sortOption);
  };

  if (loading || data.response == null) {
    return (<LoadingDialog size="sm"/>);
  } else if (errors) {
    return (<ErrorDialog error={errors}/>);
  } else if (data && data.count === 0 && currentTab === "owner")  {
    return (<><PipelineWelcomeView setActiveTab={setActiveTab} /></>)
  } else {
    return (
      <>
        <div className="px-2 max-content-width" style={{minWidth:"505px"}}>
          { (data && data.count === 0) ?
            <div className="my-5"><InfoDialog message="No pipelines found" /></div>
            :
            <div className="mb-4">
              <Pagination total={data.count} currentPage={currentPage} pageSize={pageSize} location="top"
                          sortOption={sortOption}
                          onClick={(pageNumber, pageSize, sortOption) => sortPage(pageNumber, sortOption)}/>
              <Row>
                {data.response.map((item, idx) => (
                  <Col key={idx} xl={6} lg={10} md={12} className="p-2">
                    <PipelineItem item={item}/>
                  </Col>
                ))}
              </Row>
              <Pagination total={data.count} currentPage={currentPage} pageSize={pageSize}
                          onClick={(pageNumber, pageSize, sortOption) => gotoPage(pageNumber, pageSize)}/>
            </div>
          }
        </div>
      </>
    );
  }
}

PipelinesView.propTypes = {
  currentTab: PropTypes.string,
  setActiveTab: PropTypes.func
}

export default PipelinesView;
