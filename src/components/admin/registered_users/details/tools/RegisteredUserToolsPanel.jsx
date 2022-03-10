import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import registeredUserToolsMetadata from "./registered-user-tools-form-fields";
import Button from "react-bootstrap/Button";
import Model from "core/data_model/model";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import JsonField from "components/common/fields/json/JsonField";
import ErrorDialog from "components/common/status_notifications/error";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import IconBase from "components/common/icons/IconBase";

function RegisteredUserToolsPanel({ userData, isDeployingElk, setIsDeployingElk }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [registeredUserToolsDto, setRegisteredUserToolsDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getUserTools();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getUserTools = async () => {
    const response = await RegisteredUserActions.getRegisteredUserTools(userData["_id"], getAccessToken);
    // console.log("JSON RESPONSE: " + JSON.stringify(response));
    if (response != null && response.data != null) {
      setRegisteredUserToolsDto(new Model({...response.data}, registeredUserToolsMetadata, false));
    }
  };

  const deployElkStack = async () => {
    try {
      setIsDeployingElk(true);
      const response = await RegisteredUserActions.deployElkStack(userData["_id"], getAccessToken);
      let statusCode = response.status;
      if (statusCode === 200) {
        toastContext.showSuccessDialog("Successfully Began ELK Stack Deployment");
      }
      else {
        toastContext.showErrorDialog("Something went wrong deploying ELK stack. View browser logs for more details");
        console.error(response);
        setIsDeployingElk(false);
      }
    } catch (error) {
      toastContext.showErrorDialog(error.message);
      setIsDeployingElk(false);
    }
  };

  const getDeployElkButton = () => {
    let showElkButton = true;
    let platformDbTools = registeredUserToolsDto.getData("platformDbTools");

    if (platformDbTools.length > 0) {
      platformDbTools.map((tool, index) => {
        if (tool["name"] === "MongoDB" || tool["name"] === "Vault") {
          showElkButton = false;
        }
      });
    }

    if (showElkButton) {
      return (
        <div>
          <div className="mb-2">No tools are associated with this user account!</div>
          <Button variant="secondary" disabled={isDeployingElk} size="sm" onClick={() => {
            deployElkStack();
          }}>Deploy ELK Stack Now</Button>
          {isDeployingElk &&
          <span className="ml-2"><IconBase isLoading={true} className={"mr-2 mt-1"}/>Currently deploying ELK stack. Check back later for tools.</span>}
        </div>
      );
    }
  };

  const getJsonDisplayers = () => {
    if (registeredUserToolsDto != null) {
      return (
        <div>
          {getDeployElkButton()}
          <Row>
            <Col md={12} lg={6}>
              <JsonField dataObject={registeredUserToolsDto} fieldName={"platformDbTools"}/>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={6}>
              <JsonField dataObject={registeredUserToolsDto} fieldName={"customerDbTools"}/>
            </Col>
          </Row>
        </div>
      );
    }
    else {
      return (<ErrorDialog error={"Could not pull Customer Tools information"} />);
    }
  };

  if (isLoading) {
    return <DetailPanelLoadingDialog type={"Registered User Tools"} />;
  }

  return (
    <DetailPanelContainer>
      {getJsonDisplayers()}
    </DetailPanelContainer>
  );
}

RegisteredUserToolsPanel.propTypes = {
  userData: PropTypes.object,
  isDeployingElk: PropTypes.bool,
  setIsDeployingElk: PropTypes.func
};

export default RegisteredUserToolsPanel;


