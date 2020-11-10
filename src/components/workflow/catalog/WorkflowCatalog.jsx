import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext"; //New AuthContext State
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import InfoDialog from "../../common/status_notifications/info";
import ModalActivityLogs from "../../common/modal/modalActivityLogs";
import PipelineActions from "../pipeline-actions";
import "../workflows.css";
import WorkflowCatalogItem from "./WorkflowCatalogItem";
import { getLoadingErrorDialog } from "../../common/toasts/toasts";
import FreeTrialPipelineWizard from "../wizards/deploy/freetrialPipelineWizard";


function WorkflowCatalog() {
  const contextType = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pipelineId, setPipelineId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  // pipeline id : 5fa0617f79630d55f08bc6dd

  const callbackFunction = (item) => {
    setModalMessage(item);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
    setShowFreeTrialModal(false); // for testing its true - edit this to false while pushing
    setPipelineId(""); // for testing its set a value - set this to empty while pushing
    setTemplateId("");
    setShowModal(false);
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();

    const apiUrl = "/pipelines/workflows";
    try {
      const result = await axiosApiService(accessToken).get(apiUrl);
      setData(result.data ? result.data : []);
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const openFreeTrialWizard = (pipelineId, templateId, templateType) => {
    if(!pipelineId){
      setTemplateId("");
      setShowFreeTrialModal(false);
      return;
    }
    setPipelineId(pipelineId);
    setTemplateId(templateId);
    setShowFreeTrialModal(true);
  }

  const handleClose = async() => {
    // TODO: Delete the pipeline here : Needs to be tested
    const { getAccessToken } = contextType;
    setShowFreeTrialModal(false);
    await PipelineActions.delete(pipelineId, getAccessToken);
    setPipelineId("");
    setTemplateId("");
  }

  if (loading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <>
      <div className="px-2 max-content-width" style={{ minWidth: "505px" }}>
        <div className="my-2 p-1">
          <div>Choose a pipeline template below to add to your pipelines library.</div>
        </div>
        {showToast && toast}
        {data !== undefined && data.length > 0 ?
          <Row>
            {data.map((item, idx) => (
              <Col xl={6} md={12} key={idx} className="p-2">
                <WorkflowCatalogItem item={item} parentCallback={callbackFunction} openFreeTrialWizard={openFreeTrialWizard}/>
              </Col>))}
          </Row>
          :
          <InfoDialog message="No Catalog Items Found"/>}
      </div>

      <ModalActivityLogs header="Template Details" size="lg" jsonData={modalMessage} show={showModal}
                         setParentVisibility={setShowModal}/>
      
      {showFreeTrialModal &&
        <FreeTrialPipelineWizard  
          pipelineId={pipelineId}
          templateId={templateId}
          pipelineOrientation={""}
          autoRun={false}
          handleClose={handleClose} 
        />
      }
      
    </>
  );
}

WorkflowCatalog.propTypes = {
  data: PropTypes.array,
};

export default WorkflowCatalog;
