import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import Model from "../../../../../core/data_model/model";
import RegisteredUserActions from "../../registered-user-actions";
import DetailPanelLoadingDialog from "../../../../common/loading/DetailPanelLoadingDialog";
import registeredUserToolsMetadata from "../tools/registered-user-tools-form-fields";
import DtoJsonField from "../../../../common/form_fields/dto_form_fields/dto-json-field";
import ErrorDialog from "../../../../common/status_notifications/error";
import DetailPanelContainer from "../../../../common/panels/detail_panel_container/DetailPanelContainer";

function CustomerDatabaseEditorPanel({ customerDatabaseData, userId, setCustomerDatabaseData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [customerDbJson, setCustomerDbJson] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadCustomerDB();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadCustomerDB = async () => {
      const response = await RegisteredUserActions.getRegisteredUserDb(userId, getAccessToken);
      if (response != null && response.data != null) {
        setCustomerDbJson(new Model(response.data, registeredUserToolsMetadata, false));
      }
  };

  if (isLoading) {
    return <DetailPanelLoadingDialog type={"Customer DB"} />
  }

  const getJsonDisplayers = () => {
    if (customerDbJson != null) {
      return (
        <div>
          <Row>
            <Col md={12} lg={6}>
              <DtoJsonField dataObject={customerDbJson} fieldName={"platformDbTools"}/>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={6}>
              <DtoJsonField dataObject={customerDbJson} fieldName={"customerDbTools"}/>
            </Col>
          </Row>
        </div>
      );
    }
    else {
      return (<ErrorDialog error={"Could not pull Customer DB information"} />);
    }
  }


  // TODO: Create metadata and implement editor panel when necessary
  return (
    <DetailPanelContainer showRequiredFieldsMessage={false}>
      {getJsonDisplayers()}
    </DetailPanelContainer>
  );
}

CustomerDatabaseEditorPanel.propTypes = {
  customerDatabaseData: PropTypes.object,
  setCustomerDatabaseData: PropTypes.func,
  userId: PropTypes.string
};

export default CustomerDatabaseEditorPanel;


