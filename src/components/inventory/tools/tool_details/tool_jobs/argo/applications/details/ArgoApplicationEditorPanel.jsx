import React, {useEffect, useContext, useState, useRef} from "react";
import { Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import argoActions from "../../argo-actions";
import Modal from "components/common/modal/modal";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ArgoClusterSelectInput from "./inputs/ArgoClusterSelectInput";
import ArgoProjectsSelectInput from "./inputs/ArgoProjectsSelectInput";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";

function ArgoApplicationEditorPanel({ argoApplicationData, toolData, applicationId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoApplicationModel, setArgoApplicationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if(argoApplicationData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [argoApplicationData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      setArgoApplicationModel(argoApplicationData);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createApplication = async () => {
    return await argoActions.createArgoApplicationV2(getAccessToken, cancelTokenSource, toolData?._id, argoApplicationModel);
  };

  const updateApplication = async () => {
    return await argoActions.updateArgoApplicationV2(getAccessToken, cancelTokenSource, toolData?._id, applicationId, argoApplicationModel);
  };

  const deleteApplication = async () => {
    await argoActions.deleteArgoApplicationV2(getAccessToken, cancelTokenSource, toolData?._id, applicationId);
    handleClose();
  };

  const getDeleteButton = () => {
    // TODO: Switch to isNew check
    if (applicationId) {
      return (
        <div className="mr-auto mt-3 px-3">
          <Button variant="outline-primary" size="sm" onClick={() => setShowDeleteModal(true)}>
            <FontAwesomeIcon icon={faTrash} className="danger-red"/> Delete Application
          </Button>
        </div>
      );
    }
  };

  if (isLoading || argoApplicationModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={argoApplicationModel}
      createRecord={createApplication}
      updateRecord={updateApplication}
      setRecordDto={setArgoApplicationModel}
      isLoading={isLoading}
      extraButtons={getDeleteButton()}
      handleClose={handleClose}
    >
      <div className="scroll-y">
        <Row>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setArgoApplicationModel}
              dataObject={argoApplicationModel}
              fieldName={"applicationName"}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ArgoProjectsSelectInput
              argoToolId={toolData._id}
              setDataObject={setArgoApplicationModel}
              dataObject={argoApplicationModel}
              fieldName={"projectName"}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ArgoClusterSelectInput
              fieldName={"cluster"}
              argoToolId={toolData._id}
              dataObject={argoApplicationModel}
              setDataObject={setArgoApplicationModel}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={argoApplicationModel}
              fieldName={"gitPath"}
              setDataObject={setArgoApplicationModel}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={argoApplicationModel}
              fieldName={"gitUrl"}
              setDataObject={setArgoApplicationModel}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={argoApplicationModel}
              fieldName={"branchName"}
              setDataObject={setArgoApplicationModel}
              disabled={!argoApplicationData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ActivityToggleInput
              setDataObject={setArgoApplicationModel}
              fieldName={"active"}
              dataObject={argoApplicationModel}
            />
          </Col>
        </Row>
      </div>
      {showDeleteModal ? (
        <Modal
          header="Confirm Application Delete"
          message="Warning! Application cannot be recovered once this Application is deleted. Do you still want to proceed?"
          button="Confirm"
          handleCancelModal={() => setShowDeleteModal(false)}
          handleConfirmModal={() => deleteApplication()}
        />
      ) : null}
    </EditorPanelContainer>
  );
}

ArgoApplicationEditorPanel.propTypes = {
  argoApplicationData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  applicationId: PropTypes.string,
  handleClose: PropTypes.func
};

export default ArgoApplicationEditorPanel;
