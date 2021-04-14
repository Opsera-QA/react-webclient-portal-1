import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup, ButtonToolbar, Col, Row } from "react-bootstrap";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import VaultTextAreaInput from "components/common/inputs/text/VaultTextAreaInput";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScmWorkspaceInput
  from "components/inventory/tools/tool_details/tool_jobs/common/accounts/inputs/ScmWorkspaceInput";
import ScmRepositoryInput
  from "components/inventory/tools/tool_details/tool_jobs/common/accounts/inputs/ScmRepositoryInput";
import ScmAccountReviewerInput
  from "components/inventory/tools/tool_details/tool_jobs/common/accounts/inputs/ScmAccountReviewerInput";
import ScmAccountTypeInput
  from "components/inventory/tools/tool_details/tool_jobs/common/accounts/inputs/ScmAccountTypeInput";
import ScmTwoFactorToggle
  from "components/inventory/tools/tool_details/tool_jobs/common/accounts/inputs/ScmTwoFactorToggle";
import axios from "axios";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import DeleteModal from "components/common/modal/DeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

function ScmAccountsEditorPanel({toolData, scmAccountData, handleClose}) {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [scmAccountDataDto, setScmAccountDataDto] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    if(!scmAccountData.isNew()){
      setViewMode(true);
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    if (isMounted?.current === true) {
      setScmAccountDataDto(scmAccountData);
    }
  };

  const saveAccount = async () => {
    let scmData = scmAccountDataDto.getPersistData();
    let newToolData = {...toolData};
    const accountVaultKey = `${scmData.toolId}-${scmData.reviewerId}-secret`;
    scmData.accountPassword = await toolsActions.saveKeyPasswordToVault(scmAccountDataDto, "accountPassword", scmData.accountPassword, accountVaultKey, getAccessToken, scmAccountDataDto.getData("toolId"));
    const secretPrivateVaultKey = `${scmData.toolId}-${scmData.reviewerId}-secretPrivateKey`;
    scmData.secretPrivateKey = await toolsActions.saveKeyPasswordToVault(scmAccountDataDto, "secretPrivateKey", scmData.secretPrivateKey, secretPrivateVaultKey, getAccessToken, scmAccountDataDto.getData("toolId"));
    const secretAccessTokenVaultKey = `${scmData.toolId}-${scmData.reviewerId}-secretAccessTokenKey`;
    scmData.secretAccessTokenKey = await toolsActions.saveKeyPasswordToVault(scmAccountDataDto, "secretAccessTokenKey", scmData.secretAccessTokenKey, secretAccessTokenVaultKey, getAccessToken, scmAccountDataDto.getData("toolId"));

    let accounts = newToolData.getData("accounts");
    accounts = accounts.filter(acc => !(acc.reviewerId === scmData.reviewerId && acc.repository === scmData.repository));
    newToolData.setData("accounts", [...accounts, scmData]);
    await toolsActions.updateTool(newToolData, getAccessToken);
    handleClose();
  };

  const editAccount = () => {
    setViewMode(false);
  };

  const deleteAccount = async () => {
    let scmData = scmAccountDataDto.getPersistData();
    let newToolData = {...toolData};
    let accounts = newToolData.getData("accounts");
    accounts = accounts.filter(acc => !(acc.reviewerId === scmData.reviewerId && acc.repository === scmData.repository));
    newToolData.setData("accounts", [...accounts]);

    try {
      await toolsActions.updateTool(newToolData, getAccessToken);
      toastContext.showDeleteSuccessResultDialog("Account");
    } catch (error) {
      toastContext.showDeleteFailureResultDialog(error);
    }
    setShowDeleteModal(false);
    handleClose();
  };

  const getDynamicFields = () => {
    if (scmAccountDataDto && scmAccountDataDto.getData("twoFactorAuthentication") === true) {
      return (
        <div>
          <VaultTextAreaInput 
            type={"password"} 
            dataObject={scmAccountDataDto} 
            setDataObject={setScmAccountDataDto}
            fieldName={"secretPrivateKey"}
            disabled={viewMode}
          />
          <VaultTextInput 
            type={"password"} 
            dataObject={scmAccountDataDto} 
            setDataObject={setScmAccountDataDto}
            fieldName={"secretAccessTokenKey"}
            disabled={viewMode}
          />
        </div>
      );
    }
    return (
      <VaultTextInput 
        type={"password"} 
        dataObject={scmAccountDataDto} 
        setDataObject={setScmAccountDataDto}
        fieldName={"accountPassword"}
        disabled={viewMode}
      />
    );
  };  

  if (scmAccountDataDto == null) {
    return null;
  }

  return (
    <>
      {viewMode && <ButtonToolbar className="justify-content-between my-2 ml-2 mr-2"> 
        <ButtonGroup>
          <Button size="sm" className="mr-2" variant="primary" onClick={() => {
            editAccount();
          }}>
            <FontAwesomeIcon icon={faPen} fixedWidth style={{ cursor: "pointer" }}/> Edit Job
          </Button>
        </ButtonGroup>       
        <ButtonGroup>
          <Button size="sm" className="pull-right mr-2" variant="danger" onClick={() => {
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} fixedWidth style={{ cursor: "pointer" }}/> Delete Account
          </Button>
        </ButtonGroup>
      </ButtonToolbar> }
      <EditorPanelContainer
        handleClose={handleClose}
        recordDto={scmAccountDataDto}
        updateRecord={saveAccount}
        createRecord={saveAccount}      
        addAnotherOption={false}
        viewMode={viewMode}
      >
        <Row>
          <Col lg={12}>
            <ScmWorkspaceInput
              dataObject={scmAccountDataDto}
              setDataObject={setScmAccountDataDto}
              disabled={viewMode || !scmAccountDataDto.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ScmRepositoryInput
              dataObject={scmAccountDataDto}
              setDataObject={setScmAccountDataDto}
              disabled={viewMode || !scmAccountDataDto.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ScmAccountReviewerInput
              dataObject={scmAccountDataDto}
              setDataObject={setScmAccountDataDto}
              disabled={viewMode || !scmAccountDataDto.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ScmAccountTypeInput
              dataObject={scmAccountDataDto}
              setDataObject={setScmAccountDataDto}
              disabled={viewMode || !scmAccountDataDto.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ScmTwoFactorToggle
              dataObject={scmAccountDataDto}
              setDataObject={setScmAccountDataDto}
              fieldName={"twoFactorAuthentication"}
              disabled={viewMode}
            />
          </Col>
          <Col lg={12}>
            {getDynamicFields()}
          </Col>
        </Row>
        <DeleteModal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          dataObject={scmAccountDataDto}
          handleDelete={deleteAccount}
        />
      </EditorPanelContainer>
    </>    
  );
}

ScmAccountsEditorPanel.propTypes = {
  toolData: PropTypes.object,
  scmAccountData: PropTypes.object,
  handleClose: PropTypes.func,  
};

export default ScmAccountsEditorPanel;