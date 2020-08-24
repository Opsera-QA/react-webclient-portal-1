import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext"; //New AuthContext State
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import InfoDialog from "../../common/status_notifications/info";
import ModalActivityLogs from "../../common/modal/modalActivityLogs";

import "../workflows.css";
import WorkflowCatalogItem from "./WorkflowCatalogItem";


function WorkflowCatalog() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  
  const callbackFunction = (item) => {
    setModalMessage(item);
    setShowModal(true);
  };

  useEffect(() => {    
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();

    const apiUrl = "/pipelines/workflows";   
    try {
      const result = await axiosApiService(accessToken).get(apiUrl);
      setData(result.data ? result.data : []);
      setLoading(false);    
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  if (loading) {
    return (<LoadingDialog size="sm"/>);
  }
  else if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
          <>
            <div className="px-2 max-content-width" style={{minWidth:"505px"}}>
              <div className="my-2 p-1">
                <div>Listed below are workflow catalog options to choose from.  Each one contains specific tools and workflows for creating
              your new pipeline.</div>
                <div>After selecting a workflow to add to your pipeline, you will be able to customize it and add the proper tool configurations.</div>
              </div>
              
              {data !== undefined && data.length > 0 ?
                <Row>
                  {data.map((item, idx) => (
                    <Col xl={6} lg={10} md={12} key={idx} className="p-2">
                      <WorkflowCatalogItem item={item} parentCallback={callbackFunction} />
                    </Col>))}
                </Row>
                :
                <InfoDialog message="No Catalog Items Found" />}
            </div>

            <ModalActivityLogs header="Template Details" size="lg" jsonData={modalMessage} show={showModal} setParentVisibility={setShowModal} />
          </>
      </>
    );
  }
}

WorkflowCatalog.propTypes = {
  data: PropTypes.array
};

export default WorkflowCatalog;
