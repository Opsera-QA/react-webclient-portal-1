import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import Model from "core/data_model/model";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import ErrorDialog from "components/common/status_notifications/error";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import toolsActions from "components/inventory/tools/tools-actions";
import VaultSelectInput from "components/common/list_of_values_input/tools/vault/VaultToolSelectInput";

function ToolVaultPanel({ toolData, isLoading }) {
  const { getAccessToken } = useContext(AuthContext);
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);

  useEffect(() => {
    setTemporaryDataObject(new Model({ ...toolData?.getPersistData() }, toolData?.getMetaData(), false));
  }, []);

  const saveData = async () => {
    toolData.setData("vault", temporaryDataObject.getData("vault"));
    let newDataObject = { ...toolData };
    const response = await toolsActions.updateTool(newDataObject, getAccessToken);
    setTemporaryDataObject({...newDataObject});
    return response;
  };

  const getWarningDialogs = () => {
    if (toolData?.getData("vault")?.length > 0 || temporaryDataObject?.getData("vault")?.length > 0) {
      return (
        <div className={"mx-3 my-2"}>
          <WarningDialog
            warningMessage={`
                A non-Opsera provided Hashicorp Vault is in use for this tool. 
                Any operations that require this tool require access to this vault. 
                If the vault is down, then any Opsera operations will fail as a result. 
                Opsera cannot manage or control the uptime of this tool.
           `}
            alignment={"toolRegistryWarning"}
          />
        </div>
      );
    }
  };

  const getErrorDialogs = () => {
    if (temporaryDataObject?.isChanged("vault")) {
      return (
        <div className={"my-2"}>
          <ErrorDialog
            error={`
              Changing the Vault Instance does not migrate data between vault instances. 
              In order to successfully change the vault in use, please reenter the connection details 
              with the required information and save again to ensure the tokens/passwords exist in the new vault. 
              If you proceed, the tool will be broken until the connection information is reentered and saved after a vault change.
            `}
            align="stepConfigurationTop"
          />
        </div>
      );
    }
  };

  if (temporaryDataObject == null) {
    return (<></>);
  }

  return (
    <EditorPanelContainer
      createRecord={saveData}
      updateRecord={saveData}
      showRequiredFieldsMessage={false}
      recordDto={temporaryDataObject}
      setRecordDto={setTemporaryDataObject}
      className={"px-3"}
    >
      <div className="text-muted p-3">
        <div className="h6">Vault Management</div>
        <div className={"mb-2"}>
          Opsera secures tokens, passwords, and other sensitive information in a Hashicorp Vault Instance.
          By default, Opsera uses the vault instance that is spun up for the the specific organization.
          Users have the option to choose whether to store information in the default Opsera provided vault
          or configure their own Hashicorp vault instance in the Tool Registry.
          This setting only applies to this tool.
          All other tools will use the Opsera provided default vault unless specified by the user.
        </div>
        <Row>
          <Col lg={12}>
            <VaultSelectInput
              model={temporaryDataObject}
              setModel={setTemporaryDataObject}
            />
          </Col>
        </Row>
        {getWarningDialogs()}
        {getErrorDialogs()}
      </div>
    </EditorPanelContainer>
  );
}

ToolVaultPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  setToolData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolVaultPanel;

