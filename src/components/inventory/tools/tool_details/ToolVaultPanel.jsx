import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import VaultSelectInput from "./input/VaultSelectInput";
import { Col, Row } from "react-bootstrap";
import toolsActions from "../tools-actions";
import { AuthContext } from "../../../../contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import WarningDialog from "../../../common/status_notifications/WarningDialog";
import ErrorDialog from "../../../common/status_notifications/error";
import PersistAndCloseButtonContainer from "../../../common/buttons/saving/containers/PersistAndCloseButtonContainer";
// import RequiredFieldsMessage from "../../../common/fields/editor/RequiredFieldsMessage";

function ToolVaultPanel({ toolData, isLoading }) {
  const { getAccessToken } = useContext(AuthContext);
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);

  useEffect(() => {
    setTemporaryDataObject(
      new Model(
        { ...toolData?.getPersistData() },
        toolData?.getMetaData(),
        false
      )
    );
  }, []);

  const saveData = async () => {
    toolData.setData("vault", temporaryDataObject.getData("vault"));
    let newDataObject = { ...toolData };
    const response = await toolsActions.updateTool(
      newDataObject,
      getAccessToken
    );
    setTemporaryDataObject({ ...newDataObject });
    return response;
  };

  const getWarningDialogs = () => {
    if (
      (toolData.getData("vault") && toolData.getData("vault").length > 0) ||
      (temporaryDataObject?.getData("vault") &&
        temporaryDataObject?.getData("vault").length > 0)
    ) {
      return (
        <div className={"px-3"}>
          <WarningDialog
            warningMessage={
              "A non-Opsera provided Hashicorp Vault is in use for this tool. Any operations that require this tool require access to this vault.  If the vault is down, then any Opsera operations will fail as a result. Opsera cannot manage or control the uptime of this tool."
            }
            alignment={"toolRegistryWarning"}
          />
        </div>
      );
    }
  };

  const getErrorDialogs = () => {
    if (temporaryDataObject?.changeMap.has("vault")) {
      return (
        <div className={"py-1"}>
          <ErrorDialog
            error={
              "Changing the Vault Instance does not migrate data between vault instances. In order to successfully change the vault in use please re-save the step configuration with the required information to ensure the tokens/passwords being updated in the vault."
            }
            align="stepConfigurationTop"
          />
        </div>
      );
    }
  };

  const getPersistButtonContainer = () => {
    if (temporaryDataObject) {
      return (
        <PersistAndCloseButtonContainer
          createRecord={saveData}
          updateRecord={saveData}
          setRecordDto={setTemporaryDataObject}
          recordDto={temporaryDataObject}
        />
      );
    }
  };

  const getVaultPanel = () => {
    if (temporaryDataObject == null) {
      return null;
    }
    return (
      <>
        <Row>
          <Col lg={12}>
            <VaultSelectInput
              dataObject={temporaryDataObject}
              setDataObject={setTemporaryDataObject}
              fieldName={"vault"}
            />
          </Col>
        </Row>
        <div>{getPersistButtonContainer()}</div>
        {/* <div>
          <RequiredFieldsMessage />
        </div> */}
      </>
    );
  };

  return (
    <>
      <div className="text-muted p-3">
        <div className="h6">Vault Management</div>
        <div className="mb-3">
          Opsera secures tokens, passwords and other sensitive information in a
          Hashicorp Vault Instance. By default Opsera uses the vault instance
          that is spun up for the the specific organization but users have the
          option to choose whether to store information in the default Opsera
          provided vault or configure their own Hashicorp vault instance in Tool
          Registry. This setting only applies to this tool. All other tools use
          the Opsera provided default vault unless specified by the user.
        </div>
        {getWarningDialogs()}
        {getErrorDialogs()}
        {getVaultPanel()}
      </div>
    </>
  );
}

ToolVaultPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  setToolData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolVaultPanel;
