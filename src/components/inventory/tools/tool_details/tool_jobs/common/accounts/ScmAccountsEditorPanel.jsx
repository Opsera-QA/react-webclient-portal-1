import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScmWorkspaceInput from "./inputs/ScmWorkspaceInput";
import ScmRepositoryInput from "./inputs/ScmRepositoryInput";
import ScmAccountReviewerInput from "./inputs/ScmAccountReviewerInput";
import ScmTwoFactorToggle from "./inputs/ScmTwoFactorToggle";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import VaultTextAreaInput from "components/common/inputs/text/VaultTextAreaInput";
import SaveButtonBase from "../../../../../../common/buttons/saving/SaveButtonBase";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";

function ScmAccountsEditorPanel({toolData, scmAccountDataDto, setScmAccountDataDto, handleClose}) {  

    const { getAccessToken } = useContext(AuthContext);    
    
    const createAccount = async () => {

        let scmData = scmAccountDataDto.getPersistData();
        let newToolData = {...toolData};
        
        const accountVaultKey = `${scmData.toolId}-${scmData.reviewerId}-secret`;        
        scmData.accountPassword = await toolsActions.saveKeyPasswordToVault(scmAccountDataDto, "accountPassword", scmData.accountPassword, accountVaultKey, getAccessToken, scmAccountDataDto.getData("toolId"));
        const secretPrivateVaultKey = `${scmData.toolId}-${scmData.reviewerId}-secretPrivateKey`;        
        scmData.secretPrivateKey = await toolsActions.saveKeyPasswordToVault(scmAccountDataDto, "secretPrivateKey", scmData.secretPrivateKey, secretPrivateVaultKey, getAccessToken, scmAccountDataDto.getData("toolId"));
        const secretAccessTokenVaultKey = `${scmData.toolId}-${scmData.reviewerId}-secretAccessTokenKey`;        
        scmData.secretAccessTokenKey = await toolsActions.saveKeyPasswordToVault(scmAccountDataDto,"secretAccessTokenKey", scmData.secretAccessTokenKey, secretAccessTokenVaultKey, getAccessToken, scmAccountDataDto.getData("toolId"));        

        const accounts = newToolData.getData("accounts");
        newToolData.setData("accounts", [...accounts, scmData]);
        
        return await toolsActions.updateTool(newToolData, getAccessToken);
        
    };

    const getDynamicFields = () => {
        if (scmAccountDataDto && scmAccountDataDto.getData("twoFactorAuthentication") === true) {
          return (
            <div>
              <VaultTextAreaInput type={"password"} dataObject={scmAccountDataDto} setDataObject={setScmAccountDataDto} fieldName={"secretPrivateKey"}/>
              <VaultTextInput type={"password"} dataObject={scmAccountDataDto} setDataObject={setScmAccountDataDto} fieldName={"secretAccessTokenKey"}/>
            </div>
          );
        }
          return (<VaultTextInput type={"password"} dataObject={scmAccountDataDto} setDataObject={setScmAccountDataDto} fieldName={"accountPassword"} />);
    };

    return (
      <>
        <div className="scroll-y full-height">
          <Row>
            <Col lg={12}>
                <ScmWorkspaceInput dataObject={scmAccountDataDto} setDataObject={setScmAccountDataDto} toolData={toolData} />
            </Col>
            <Col lg={12}>
                <ScmRepositoryInput dataObject={scmAccountDataDto} setDataObject={setScmAccountDataDto} toolData={toolData} />
            </Col>
            <Col lg={12}>
                <ScmAccountReviewerInput dataObject={scmAccountDataDto} setDataObject={setScmAccountDataDto} toolData={toolData} />
            </Col>
            <Col lg={12}>
                <ScmTwoFactorToggle dataObject={scmAccountDataDto} setDataObject={setScmAccountDataDto} fieldName={"twoFactorAuthentication"}/>
            </Col>
            <Col lg={12}>
                {getDynamicFields()}
            </Col>
          </Row>
          <Row>
          {/* {credentialId && (
            <div className="mr-auto mt-3 px-3">
              <Button variant="outline-primary" size="sm" onClick={() => setShowDeleteModal(true)}>
                <FontAwesomeIcon icon={faTrash} className="danger-red" /> Delete Account
              </Button>
              <br />
            </div>
          )} */}
            <div className="ml-auto mt-3 px-3">
              <SaveButtonBase
                updateRecord={createAccount}
                setRecordDto={setScmAccountDataDto}
                setData={setScmAccountDataDto}
                createRecord={createAccount}
                recordDto={scmAccountDataDto}
                handleClose={handleClose}
                showSuccessToasts={false}
              />
            </div>
          </Row>
        </div>
      </>
    );
}

ScmAccountsEditorPanel.propTypes = {
    toolData: PropTypes.object,    
    scmAccountDataDto: PropTypes.object,
    setScmAccountDataDto: PropTypes.func,
    handleClose: PropTypes.func,
};

export default ScmAccountsEditorPanel;