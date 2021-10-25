import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../contexts/DialogToastContext";
import LoadingDialog from "../../../../../../common/status_notifications/loading";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import JenkinsAccountServiceSelectInput from "./inputs/JenkinsAccountServiceSelectInput";
import JenkinsAccountToolSelectInput from "./inputs/JenkinsAccountToolSelectInput";
import TextInputBase from "../../../../../../common/inputs/text/TextInputBase";
import jenkinsAccountActions from "./jenkins-accounts-actions";
import DeleteModal from "../../../../../../common/modal/DeleteModal";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SaveButtonBase from "../../../../../../common/buttons/saving/SaveButtonBase";
import EditWarningModalToolRegistry from "../../../../../../common/modal/EditWarningModalToolRegistry";

function JenkinsAccountEditorPanel({ toolData, jenkinsAccountData, setJenkinsAccountData, handleClose, credentialId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const createJenkinsAccount = async () => {
    try {
      await jenkinsAccountActions.createJenkinsAccount(jenkinsAccountData, toolData, getAccessToken);
      toastContext.showCreateSuccessResultDialog("Account");
      handleClose();
    } catch (error) {
      toastContext.showCreateFailureResultDialog("Account", error);
    }
  };

  const updateApplicationCaller= async () => {
    setShowEditModal(true);
  };

  const updateJenkinsAccount = async () => {
    return await jenkinsAccountActions.createJenkinsAccount(jenkinsAccountData, toolData, getAccessToken);
  };

  const deleteJenkinsAccount = async () => {
    try {
      await jenkinsAccountActions.deleteJenkinsAccount(jenkinsAccountData, toolData, getAccessToken);
      toastContext.showDeleteSuccessResultDialog("Account");
      handleClose();
    } catch (error) {
      toastContext.showDeleteFailureResultDialog("Account", error);
    }
  };

  if (jenkinsAccountData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <>
      <div className="scroll-y full-height">
        <Row>
          <Col lg={12}>
            <JenkinsAccountServiceSelectInput
              dataObject={jenkinsAccountData}
              setDataObject={setJenkinsAccountData}
              disabled={
                (credentialId && jenkinsAccountData && !jenkinsAccountData.getData("credentialsId")) ||
                (!credentialId && jenkinsAccountData && jenkinsAccountData.getData("toolId"))
              }
            />
          </Col>
          <Col lg={12}>
            <JenkinsAccountToolSelectInput
              model={jenkinsAccountData}
              setModel={setJenkinsAccountData}
              disabled={
                (credentialId && jenkinsAccountData && !jenkinsAccountData.getData("credentialsId")) ||
                (!credentialId && jenkinsAccountData && jenkinsAccountData.getData("toolId"))
              }
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              fieldName={"credentialsId"}
              dataObject={jenkinsAccountData}
              setDataObject={setJenkinsAccountData}
              disabled={
                credentialId
                  ? true
                  : false
              }
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              fieldName={"credentialsDescription"}
              dataObject={jenkinsAccountData}
              setDataObject={setJenkinsAccountData}
              disabled={
                credentialId
                  ? true
                  : false
              }
            />
          </Col>
        </Row>
        <Row>
          {credentialId && (
            <div className="mr-auto mt-3 px-3">
              <Button variant="outline-primary" size="sm" onClick={() => setShowDeleteModal(true)}>
                <FontAwesomeIcon icon={faTrash} className="danger-red" /> Delete Account
              </Button>
              <br />
            </div>
          )}
          <div className="ml-auto mt-3 px-3">
            <SaveButtonBase
              updateRecord={credentialId ? updateApplicationCaller : createJenkinsAccount}
              setRecordDto={setJenkinsAccountData}
              setData={setJenkinsAccountData}
              createRecord={createJenkinsAccount}
              recordDto={jenkinsAccountData}
              handleClose={handleClose}
              showSuccessToasts={false}
            />
          </div>
        </Row>
      </div>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        dataObject={jenkinsAccountData}
        handleDelete={deleteJenkinsAccount}
      />
      <EditWarningModalToolRegistry
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        dataObject={jenkinsAccountData}
        handleEdit={updateJenkinsAccount}
        handleClose={handleClose}
      />
    </>
  );
}

JenkinsAccountEditorPanel.propTypes = {
  toolData: PropTypes.object,
  jenkinsAccountData: PropTypes.object,
  setJenkinsAccountData: PropTypes.func,
  handleClose: PropTypes.func,
  credentialId: PropTypes.string,
};

export default JenkinsAccountEditorPanel;
