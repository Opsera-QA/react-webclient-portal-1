import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext"; //New AuthContext State
import { axiosApiServiceMultiGet } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ModalActivityLogs from "../../common/modal/modalActivityLogs";
import PipelineActions from "../pipeline-actions";
import "../workflows.css";
import WorkflowCatalogItem from "./WorkflowCatalogItem";
import FreeTrialPipelineWizard from "../wizards/deploy/freetrialPipelineWizard";
import { DialogToastContext } from "../../../contexts/DialogToastContext";


function WorkflowCatalog() {
  const contextType = useContext(AuthContext);
  const { setAccessRoles, getAccessToken, getUserRecord } = contextType;
  const toastContext = useContext(DialogToastContext);
  const [data, setData] = useState([]);
  const [inUseIds, setInUseIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pipelineId, setPipelineId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [accessRoleData, setAccessRoleData] = useState(null);

  const callbackFunction = (item) => {
    setModalMessage(item);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData().catch(error => {
      throw error;
    });

    setShowFreeTrialModal(false); // for testing its true - edit this to false while pushing
    setPipelineId(""); // for testing its set a value - set this to empty while pushing
    setTemplateId("");
    setShowModal(false);
  }, []);


  async function fetchData() {
    setLoading(true);
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    setAccessRoleData(userRoleAccess);

    const accessToken = await getAccessToken();
    const apiUrls = ["/pipelines/workflows", "/pipelines/workflows/inuse-templates"];

    try {
      const result = await axiosApiServiceMultiGet(accessToken, apiUrls);

      console.log(result[1].data)

      setData(result[0].data ? result[0].data : []);

      setInUseIds(result[1].data ? result[1].data : []);

    } catch (error) {
      toastContext.showErrorDialog(error);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const openFreeTrialWizard = (pipelineId, templateId, templateType) => {
    if (!pipelineId) {
      setTemplateId("");
      setShowFreeTrialModal(false);
      return;
    }
    setPipelineId(pipelineId);
    setTemplateId(templateId);
    setShowFreeTrialModal(true);
  };

  const handleClose = async () => {
    setShowFreeTrialModal(false);
    await PipelineActions.delete(pipelineId, getAccessToken);
    setPipelineId("");
    setTemplateId("");
  };

  if (loading) {
    return (<LoadingDialog size="md" message="Loading pipeline template catalog"/>);
  }

  return (
    <>
      <div className="px-2 max-content-width" style={{ minWidth: "505px" }}>
        <div className="my-2 p-1">
          <div>To get started with Opsera Pipelines, choose a pipeline template below that best matches your needs and
            click the &quot;Create Pipeline&quot; button in order to build the workflow for your new pipeline.
          </div>
        </div>

        {data !== undefined && data.length > 0 ?
          <Row className="px-2">
            {data.map((item, idx) => (
              <Col xl={6} md={12} key={idx} className="p-2">
                <WorkflowCatalogItem
                  item={item}
                  parentCallback={callbackFunction}
                  openFreeTrialWizard={openFreeTrialWizard}
                  accessRoleData={accessRoleData}
                  activeTemplates={inUseIds}
                />
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
