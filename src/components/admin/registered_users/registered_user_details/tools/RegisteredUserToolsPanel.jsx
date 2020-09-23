import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoadingDialog from "../../../../common/status_notifications/loading";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import RegisteredUserActions from "../../registered-user-actions";
import DtoJsonField from "../../../../common/form_fields/dto_form_fields/dto-json-field";
import Model from "../../../../../core/data_model/model";
import registeredUserToolsMetadata from "./registered-user-tools-form-fields";
import DetailPanelLoadingDialog from "../../../../common/loading/DetailPanelLoadingDialog";

function RegisteredUserToolsPanel({ registeredUserId }) {
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
    const response = await RegisteredUserActions.getRegisteredUserTools(registeredUserId, getAccessToken);
    // console.log("JSON RESPONSE: " + JSON.stringify(response));
    setRegisteredUserToolsDto(new Model({...response.data}, registeredUserToolsMetadata, false));
  };

  if (isLoading) {
    return <DetailPanelLoadingDialog type={"Registered User Tools"} />;
  }

  return (
    <div className="scroll-y full-height p-3">
      <Row>
        <Col md={12} lg={6}>
          <DtoJsonField dataObject={registeredUserToolsDto} fieldName={"platformDbTools"} />
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={6}>
          <DtoJsonField dataObject={registeredUserToolsDto} fieldName={"customerDbTools"} />
        </Col>
      </Row>
    </div>
  );
}

RegisteredUserToolsPanel.propTypes = {
  registeredUserId: PropTypes.string,
};

export default RegisteredUserToolsPanel;


