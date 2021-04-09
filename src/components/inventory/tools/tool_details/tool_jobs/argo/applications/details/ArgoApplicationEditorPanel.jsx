import React, { useEffect, useContext, useState } from "react";
import { Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import Loading from "../../../../../../../common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DtoSelectInput from "../../../../../../../common/input/dto_input/dto-select-input";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import argoActions from "../../argo-actions";
import Modal from "components/common/modal/modal";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ArgoClusterSelectInput from "./inputs/ArgoClusterSelectInput";
import ArgoProjectsSelectInput from "./inputs/ArgoProjectsSelectInput";

function ArgoApplicationEditorPanel({ argoApplicationData, toolData, appID, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoApplicationDataDto, setArgoApplicationDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    if(argoApplicationData) {
      loadData();
    }
  }, [argoApplicationData]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setArgoApplicationDataDto(argoApplicationData);     
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createApplication = async () => {
    return await argoActions.createArgoApplication(argoApplicationDataDto, getAccessToken);
  };

  const updateApplication = async () => {
    return await argoActions.updateArgoApplication(argoApplicationDataDto, getAccessToken, appID);
  };

  const deleteApplication = async () => {
    await argoActions.deleteArgoApplication(toolData._id, getAccessToken, appID);
    handleClose();
  };

  const handleProjectChange = (fieldName, value) => {
    let newDataObject = argoApplicationDataDto;
    newDataObject.setData("projectName", value.name);
    newDataObject.setData("toolId", toolData._id);
    newDataObject.setData("namespace", value.namespace);
    setArgoApplicationDataDto({ ...newDataObject });
  };

  if (isLoading || argoApplicationDataDto == null) {
    return <Loading size="sm" />;
  }

  return (
    <>
      <div className="scroll-y full-height">
        <Row>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setArgoApplicationDataDto}
              dataObject={argoApplicationDataDto}
              fieldName={"applicationName"}
            />
          </Col>
          <Col lg={12}>
            <ArgoProjectsSelectInput
              setDataFunction={handleProjectChange}
              argoToolId={toolData._id}
              setDataObject={setArgoApplicationDataDto}
              dataObject={argoApplicationDataDto}
              fieldName={"projectName"}
            />
          </Col>
          <Col lg={12}>
            <ArgoClusterSelectInput
              fieldName={"cluster"}
              argoToolId={toolData._id}
              dataObject={argoApplicationDataDto}
              setDataObject={setArgoApplicationDataDto}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={argoApplicationDataDto}
              fieldName={"gitPath"}
              setDataObject={setArgoApplicationDataDto}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={argoApplicationDataDto}
              fieldName={"gitUrl"}
              setDataObject={setArgoApplicationDataDto}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={argoApplicationDataDto}
              fieldName={"branchName"}
              setDataObject={setArgoApplicationDataDto}
            />
          </Col>
          <Col lg={12}>
            <ActivityToggleInput
              setDataObject={setArgoApplicationDataDto}
              fieldName={"active"}
              dataObject={argoApplicationDataDto}
            />
          </Col>
        </Row>
        <Row>
          {appID && (
            <div className="mr-auto mt-3 px-3">
              <Button variant="outline-primary" size="sm" onClick={() => setShowDeleteModal(true)}>
                <FontAwesomeIcon icon={faTrash} className="danger-red" /> Delete Application
              </Button>
              <br />
            </div>
          )}
          <div className="ml-auto mt-3 px-3">
            <SaveButtonBase
              updateRecord={appID ? updateApplication : createApplication}
              setRecordDto={setArgoApplicationDataDto}
              setData={setArgoApplicationDataDto}
              createRecord={createApplication}
              recordDto={argoApplicationDataDto}
              handleClose={handleClose}
            />
          </div>
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
    </>
  );
}

ArgoApplicationEditorPanel.propTypes = {
  argoApplicationData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  appID: PropTypes.string,
  handleClose: PropTypes.func
};

export default ArgoApplicationEditorPanel;
