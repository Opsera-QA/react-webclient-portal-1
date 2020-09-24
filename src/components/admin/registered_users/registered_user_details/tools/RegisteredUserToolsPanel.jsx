import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import RegisteredUserActions from "../../registered-user-actions";
import DtoJsonField from "../../../../common/form_fields/dto_form_fields/dto-json-field";
import Model from "../../../../../core/data_model/model";
import registeredUserToolsMetadata from "./registered-user-tools-form-fields";
import DetailPanelLoadingDialog from "../../../../common/loading/DetailPanelLoadingDialog";
import Button from "react-bootstrap/Button";
import ErrorDialog from "../../../../common/status_notifications/error";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

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
  }

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
            deployElkStack()
          }}>Deploy ELK Stack Now</Button>
          {isDeployingElk &&
          <span className="ml-2"><FontAwesomeIcon icon={faSpinner} spin className="mr-2 mt-1"/>Currently deploying ELK stack. Check back later for tools.</span>}
        </div>
      );
    }
  }

  // const

  const getJsonDisplayers = () => {
    if (registeredUserToolsDto != null) {
      return (
        <div>
          {getDeployElkButton()}
          <Row>
            <Col md={12} lg={6}>
              <DtoJsonField dataObject={registeredUserToolsDto} fieldName={"platformDbTools"}/>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={6}>
              <DtoJsonField dataObject={registeredUserToolsDto} fieldName={"customerDbTools"}/>
            </Col>
          </Row>
        </div>
      );
    }
    else {
      return (<ErrorDialog error={"Could not pull Customer Tools information"} />);
    }
  }

  if (isLoading) {
    return <DetailPanelLoadingDialog type={"Registered User Tools"} />;
  }

  return (
    <div className="scroll-y full-height p-3">
      {getJsonDisplayers()}
    </div>
  );
}

RegisteredUserToolsPanel.propTypes = {
  userData: PropTypes.object,
  isDeployingElk: PropTypes.bool,
  setIsDeployingElk: PropTypes.func
};

export default RegisteredUserToolsPanel;


