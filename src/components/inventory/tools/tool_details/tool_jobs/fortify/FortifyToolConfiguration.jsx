import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import toolsActions from "components/inventory/tools/tools-actions";
import { AuthContext } from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import axios from "axios";
import FortifyMetadata from "./fortify-tool-metadata";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import FortifyScanToolSelectInput from "./inputs/FortifyScanToolSelectInput";
import FortifyPortalSelectInput from "./inputs/FortifyPortalSelectInput";

const FortifyToolConfiguration = ({ toolData }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [fortifyConfigurationModel, setFortifyConfigurationModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setFortifyConfigurationModel(modelHelpers.parseObjectIntoModel(toolData?.getData("configuration"), FortifyMetadata));
  };

  const saveFortifyToolConfiguration = async () => {
    const newConfiguration = fortifyConfigurationModel.getPersistData();
    switch (fortifyConfigurationModel?.getData("scanToolType")) {
      case "Fortify On Demand":
        newConfiguration.accessKey = await toolsActions.saveThreePartToolPasswordToVaultV3(
          getAccessToken,
          cancelTokenSource,
          toolData?.getMongoDbId(),
          toolData.getData("tool_identifier"),
          "accessKey",
          newConfiguration?.accessKey
        );
        newConfiguration.secretKey = await toolsActions.saveThreePartToolPasswordToVaultV3(
          getAccessToken,
          cancelTokenSource,
          toolData?.getMongoDbId(),
          toolData.getData("tool_identifier"),
          "secretKey",
          newConfiguration?.secretKey
        );
        newConfiguration.token = {};
        newConfiguration.password = {};
        break;
      case "Fortify On-Prem ScanCentral":
        newConfiguration.token = await toolsActions.saveThreePartToolPasswordToVaultV3(
          getAccessToken,
          cancelTokenSource,
          toolData?.getMongoDbId(),
          toolData.getData("tool_identifier"),
          "token",
          newConfiguration?.token
        );
        newConfiguration.password = await toolsActions.saveThreePartToolPasswordToVaultV3(
          getAccessToken,
          cancelTokenSource,
          toolData?.getMongoDbId(),
          toolData.getData("tool_identifier"),
          "password",
          newConfiguration?.password
        );
        newConfiguration.accessKey = {};
        newConfiguration.secretKey = {};
        break;
      default:
        break;
    }    
    return await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData, newConfiguration);
  };

  const getFortifyOnDemandFields = () => {
    return (
      <>
        <FortifyPortalSelectInput 
          model={fortifyConfigurationModel}
          setModel={setFortifyConfigurationModel}
        />
        <TextInputBase
          dataObject={fortifyConfigurationModel}
          setDataObject={setFortifyConfigurationModel}
          fieldName={"tenantCode"}
        />
        <VaultTextInput
          dataObject={fortifyConfigurationModel}
          setDataObject={setFortifyConfigurationModel}
          fieldName={"accessKey"}
        />
        <VaultTextInput
          dataObject={fortifyConfigurationModel}
          setDataObject={setFortifyConfigurationModel}
          fieldName={"secretKey"}
        />
      </>
    );
  };

  const getFortifyOnPremFields = () => {
    return (
      <>
        <TextInputBase
          dataObject={fortifyConfigurationModel}
          setDataObject={setFortifyConfigurationModel}
          fieldName={"fortifyScanCenterControllerUrl"}
        />
        <VaultTextInput
          dataObject={fortifyConfigurationModel}
          setDataObject={setFortifyConfigurationModel}
          fieldName={"token"}
        />
        <TextInputBase
          dataObject={fortifyConfigurationModel}
          setDataObject={setFortifyConfigurationModel}
          fieldName={"fortifySscUrl"}
        />
        <TextInputBase
          dataObject={fortifyConfigurationModel}
          setDataObject={setFortifyConfigurationModel}
          fieldName={"userName"}
        />
        <VaultTextInput
          dataObject={fortifyConfigurationModel}
          setDataObject={setFortifyConfigurationModel}
          fieldName={"password"}
        />
      </>
    );
  };

  const getDynamicFields = () => {
    if (fortifyConfigurationModel?.getData("scanToolType") == null || fortifyConfigurationModel?.getData("scanToolType") === "") {
      return null;
    }

    switch (fortifyConfigurationModel?.getData("scanToolType")) {
      case "Fortify On Demand":
        return (<>{getFortifyOnDemandFields()}</>);
      case "Fortify On-Prem ScanCentral":
        return (<>{getFortifyOnPremFields()}</>);
      default:
        return null;
    }

  };

  if (fortifyConfigurationModel == null) {
    return null;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={fortifyConfigurationModel}
      setModel={setFortifyConfigurationModel}
      persistRecord={saveFortifyToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConstants.TOOL_IDENTIFIERS.FORTIFY}
    >
      <Row>
        <Col sm={12}>
          <FortifyScanToolSelectInput 
            model={fortifyConfigurationModel}
            setModel={setFortifyConfigurationModel}
          />
          {getDynamicFields()}          
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
};

FortifyToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default FortifyToolConfiguration;
