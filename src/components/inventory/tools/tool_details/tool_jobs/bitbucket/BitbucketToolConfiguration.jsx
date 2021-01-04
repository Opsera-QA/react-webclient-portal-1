import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import bitbucketConnectionMetadata from "./bitbucket-connection-metadata";
import Col from "react-bootstrap/Col";
import BitbucketTwoFactorToggle from "./BitbucketTwoFactorToggle";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";

function BitbucketToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [bitbucketConfigurationDto, setBitbucketConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let bitbucketConfigurationData = modelHelpers.getToolConfigurationModel(toolData["configuration"], bitbucketConnectionMetadata);

    if (bitbucketConfigurationData.getData("twoFactorAuthentication") === true) {
      bitbucketConfigurationData.setMetaDataFields(bitbucketConnectionMetadata.fieldsAlt);
    }

    setBitbucketConfigurationDto(bitbucketConfigurationData);
  };

  const saveBitbucketToolConfiguration = async () => {
    let newConfiguration = bitbucketConfigurationDto.getPersistData();
    const accountPasswordVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
    newConfiguration.accountPassword = await toolsActions.saveKeyPasswordToVault(bitbucketConfigurationDto, "accountPassword", newConfiguration.accountPassword, accountPasswordVaultKey, getAccessToken);
    const secretPrivateVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-secretPrivateKey`;
    newConfiguration.secretPrivateKey = await toolsActions.saveKeyPasswordToVault(bitbucketConfigurationDto, "secretPrivateKey", newConfiguration.secretPrivateKey, secretPrivateVaultKey, getAccessToken);
    const secretAccessTokenVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-secretAccessTokenKey`;
    newConfiguration.secretAccessTokenKey = await toolsActions.saveKeyPasswordToVault(bitbucketConfigurationDto,"secretAccessTokenKey", newConfiguration.secretAccessTokenKey, secretAccessTokenVaultKey, getAccessToken);
    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  const getDynamicFields = () => {
    if (bitbucketConfigurationDto.getData("twoFactorAuthentication") === true) {
      return (
        <div>
          <VaultTextInput type={"password"} dataObject={bitbucketConfigurationDto} setDataObject={setBitbucketConfigurationDto} fieldName={"secretPrivateKey"}/>
          <VaultTextInput type={"password"} dataObject={bitbucketConfigurationDto} setDataObject={setBitbucketConfigurationDto} fieldName={"secretAccessTokenKey"}/>
        </div>
      );
    }
      return (<VaultTextInput type={"password"} dataObject={bitbucketConfigurationDto} setDataObject={setBitbucketConfigurationDto} fieldName={"accountPassword"} />);
  };

  if (bitbucketConfigurationDto == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={bitbucketConfigurationDto}
      persistRecord={saveBitbucketToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Bitbucket"}
    >
      <Col sm={12}>
        <TextInputBase dataObject={bitbucketConfigurationDto} setDataObject={setBitbucketConfigurationDto} fieldName={"url"}/>
      </Col>
      <Col sm={12}>
        <TextInputBase dataObject={bitbucketConfigurationDto} setDataObject={setBitbucketConfigurationDto} fieldName={"accountUsername"}/>
      </Col>
      <Col sm={12}>
        <BitbucketTwoFactorToggle dataObject={bitbucketConfigurationDto} setDataObject={setBitbucketConfigurationDto} fieldName={"twoFactorAuthentication"}/>
      </Col>
      <Col sm={12}>
        {getDynamicFields()}
      </Col>
    </ToolConfigurationEditorPanelContainer>
  );
}

BitbucketToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default BitbucketToolConfiguration;