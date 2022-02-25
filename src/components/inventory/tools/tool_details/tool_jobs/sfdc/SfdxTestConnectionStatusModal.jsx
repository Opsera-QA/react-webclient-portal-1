import React, {useEffect, useState, useContext} from "react";
import {Button, Modal, Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import {AuthContext} from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faCircle, faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import toolsActions from "components/inventory/tools/tools-actions";
import Moment from "moment";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function SfdxTestConnectionStatusModal({setShowModal, showModal, toolData, jenkinsBuildNumber, setJenkinsBuildNumber, jenkinsJobName, setJenkinsJobName, setLoading}) {

  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [testResponse, setTestResponse] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  Moment.locale("en");
  
  let timerIds = [];

  useEffect(() => {
    console.log('SfdxTestConnectionStatusModal created');
    return function cleanup() {
      console.log('SfdxTestConnectionStatusModal destroyed');
    };
  });

  useEffect(() => {
    if(showModal && jenkinsBuildNumber){      
      toolLogPolling(jenkinsBuildNumber);      
    }else {
      console.log(timerIds);
      timerIds.forEach(timerId => clearTimeout(timerId));
    }
  }, [showModal,jenkinsBuildNumber]);

  const handleModalClose = () => {
    setJenkinsBuildNumber("");
    setLoading(false);
    setShowModal(false);
  };

  const toolLogPolling = async (jenkinsBuildNumber, count = 1) => {
    setModalLoading(true);
    try {
      const tool_logs = await toolsActions.getToolConnectionLog(getAccessToken, toolData);
      const testRes = tool_logs?.data?.data.filter(rec => rec.action === 'test_configuration' && rec.run_count?.toString() === jenkinsBuildNumber && rec.job_name === jenkinsJobName?.toLowerCase());

      if(testRes.length !== 1 && count < 5 ){
        await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
        count++;
        return await toolLogPolling(jenkinsBuildNumber, count);
      }else{        
        setTestResponse(testRes);
        setModalLoading(false);
      }      
    } catch (err) {
      setModalLoading(false);
      toastContext.showErrorDialog(err.message);
    }    
  };

  return (
    <>
      <Modal show={showModal} onHide={handleModalClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>SFDX Connection Check</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
                {modalLoading ? <DetailPanelLoadingDialog type={"Connection Results"} /> : testResponse.length > 0 ? (                    
                 <SummaryPanelContainer>
                    <Row>
                      <Col lg={12}>
                        <label className="mb-0 mr-2 text-muted"><span>Message:</span></label>
                        <span>{testResponse[0].message}</span>
                      </Col>
                      <Col lg={12}>
                        <label className="mb-0 mr-2 text-muted"><span>Validated At:</span></label>
                        <span>{Moment(testResponse[0].createdAt).format("MMMM Do YYYY, h:mm:ss a")}</span>
                      </Col>
                      <Col lg={12}>
                        <label className="mb-0 mr-2 text-muted"><span>Status:</span></label>
                        <span>{testResponse[0].status === "success" ? <FontAwesomeIcon icon={faCheckCircle} className="cell-icon green fa-md" /> : <FontAwesomeIcon icon={faCheckCircle} className="cell-icon red fa-md" /> } {testResponse[0].status}</span>
                      </Col>
                    </Row>
                  </SummaryPanelContainer>
                ) : (
                  <SummaryPanelContainer>
                    <Row>
                      <Col lg={12} className={"mb-2"}>
                        <span>We are unable to fetch the status of the test connection. Please try again.</span>
                      </Col>
                      <Col lg={12}>
                        <Button variant="primary" onClick={() => toolLogPolling(jenkinsBuildNumber)}>
                          <FontAwesomeIcon icon={faRepeat} className={`mr-2`} fixedWidth /> Try again
                        </Button>
                      </Col>                      
                    </Row>
                  </SummaryPanelContainer>
                ) }
            </div>
            <div className="text-muted small m-2">Note: The connectivity check may take some time to get the results, you can also check results on logs tab.</div>
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
  jenkinsBuildNumber: PropTypes.string,
  setJenkinsBuildNumber: PropTypes.func,
  jenkinsJobName: PropTypes.string,
  setJenkinsJobName: PropTypes.func,
  setLoading: PropTypes.func,
};

export default SfdxTestConnectionStatusModal;


