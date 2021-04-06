import React, {useEffect, useState, useContext} from "react";
import {Button, Modal, Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import { axiosApiService } from "api/apiService";
import {AuthContext} from "contexts/AuthContext";
<<<<<<< HEAD
import { DialogToastContext } from "contexts/DialogToastContext";

function SfdxTestConnectionStatusModal({setShowModal, showModal, toolData, jenkinsBuildNumber, setJenkinsBuildNumber}) {

  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
=======

function SfdxTestConnectionStatusModal({setShowModal, showModal, toolData}) {

  const { getAccessToken } = useContext(AuthContext);
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)
  const [testResponse, setTestResponse] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  let timerIds = [];

  useEffect(() => {
    console.log('SfdxTestConnectionStatusModal created');
    return function cleanup() {
      console.log('SfdxTestConnectionStatusModal destroyed');
    };
  });

  useEffect(() => {
<<<<<<< HEAD
    if(showModal && jenkinsBuildNumber){      
      toolLogPolling(jenkinsBuildNumber);      
=======
    if(showModal){      
      toolLogPolling();      
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)
    }else {
      console.log(timerIds);
      timerIds.forEach(timerId => clearTimeout(timerId));
    }
<<<<<<< HEAD
  }, [showModal,jenkinsBuildNumber]);

  const handleModalClose = () => {
    setJenkinsBuildNumber("");
    setShowModal(false);
  };

  const toolLogPolling = async (jenkinsBuildNumber, count = 1) => { 
    // console.log(jenkinsBuildNumber);   
=======
  }, [showModal]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const toolLogPolling = async (count = 1) => {    
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)
    setModalLoading(true);
    try {
      const accessToken = await getAccessToken();
      const apiUrl = `/registry/log/${toolData.getData("_id")}?page=1&size=50`;
      const tool_logs = await axiosApiService(accessToken).get(apiUrl, {});

<<<<<<< HEAD
      const testRes = tool_logs.data.data.filter(rec => rec.action === 'test_configuration' && rec.run_count == jenkinsBuildNumber);
=======
      const testRes = tool_logs.data.data.filter(rec => rec.action === 'test_configuration' && rec.run_count == 59);
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)

      if(testRes.length !== 1 && count < 5 ){
        await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
        count++;
<<<<<<< HEAD
        return await toolLogPolling(jenkinsBuildNumber, count);
=======
        return await toolLogPolling(count);
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)
      }else{        
        setTestResponse(testRes);
        setModalLoading(false);
      }      
    } catch (err) {
      setModalLoading(false);
<<<<<<< HEAD
      toastContext.showErrorDialog(err.message);
=======
      console.log(err.message);
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)
    }    
  };

  return (
    <>
      <Modal show={showModal} onHide={handleModalClose} backdrop="static">
        <Modal.Header closeButton>
<<<<<<< HEAD
          <Modal.Title>SFDX Connection Check</Modal.Title>
=======
          <Modal.Title>Test SFDX Connection</Modal.Title>
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
<<<<<<< HEAD
                {modalLoading ? <DetailPanelLoadingDialog type={"Connection Results"} /> : testResponse.length > 0 ? (                    
=======
                {modalLoading ? <DetailPanelLoadingDialog type={"Test Connection Results"} /> : testResponse.length > 0 ? (                    
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)
                    <Row>
                      <Col lg={12}>
                        <label className="mb-0 mr-2 text-muted"><span>Job Name:</span></label>
                        <span>{testResponse[0].job_name}</span>
                      </Col>
                      <Col lg={12}>
                        <label className="mb-0 mr-2 text-muted"><span>Created At:</span></label>
                        <span>{testResponse[0].createdAt}</span>
                      </Col>
                      <Col lg={12}>
                        <label className="mb-0 mr-2 text-muted"><span>Message:</span></label>
                        <span>{testResponse[0].message}</span>
                      </Col>
                      <Col lg={12}>
                        <label className="mb-0 mr-2 text-muted"><span>Status:</span></label>
                        <span>{testResponse[0].status}</span>
                      </Col>
                    </Row>
                ) : (
                  <>
                    <Row>
                      <Col lg={12} className={"mb-2"}>
                        <span>We are unable to fetch the status of the test connection. Please try again.</span>
                      </Col>
                      <Col lg={12}>
<<<<<<< HEAD
                        <Button variant="secondary" onClick={() => toolLogPolling(jenkinsBuildNumber)}>
=======
                        <Button variant="secondary" onClick={() => toolLogPolling()}>
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)
                            Refresh
                        </Button>
                      </Col>                      
                    </Row>
                  </>
                ) }
            </div>
<<<<<<< HEAD
            <div className="text-muted small m-2">Note: The connectivity check may take some time to get the results, you can also check results on logs tab.</div>
=======
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
                Close
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

SfdxTestConnectionStatusModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  toolData: PropTypes.object,
<<<<<<< HEAD
  jenkinsBuildNumber: PropTypes.string,
  setJenkinsBuildNumber: PropTypes.func,
=======
>>>>>>> e1f68f88 (sfdx test connection modal and polling changes)
};

export default SfdxTestConnectionStatusModal;


