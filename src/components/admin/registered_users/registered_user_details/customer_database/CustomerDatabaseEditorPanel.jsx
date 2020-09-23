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
      setCustomerDbJson(new Model(response.data, registeredUserToolsMetadata, false));
  };

  // const updateProfile = async () => {
  //   if(setCustomerDatabaseDataDto.isModelValid2()) {
  //     try {
  //       // TODO: Update with proper API call
  //       const response = {};
  //         // await RegisteredUserActions.updateAnalyticsProfile(customerDatabaseDataDto, getAccessToken);
  //       let newDto = new Model(response.data, customerDatabaseDataDto.metaData, false);
  //       toastContext.showUpdateSuccessResultDialog(customerDatabaseDataDto.getType());
  //       setCustomerDatabaseDataDto(newDto);
  //       setCustomerDatabaseData(newDto);
  //     }
  //     catch (err) {
  //       console.log(err.message);
  //     }
  //   }
  //   else {
  //     toastContext.showFormValidationErrorDialog();
  //   }
  // };

  if (isLoading) {
    return <DetailPanelLoadingDialog type={"Customer DB"} />
  }

  // TODO: Create metadata and implement editor panel when necessary
  return (
    <>
      {/*<div className="text-center p-5 text-muted">Customer Database management is not currently available.</div>*/}
      <div className="scroll-y full-height p-3">
        <Row>
          <Col md={12} lg={6}>
            <DtoJsonField dataObject={customerDbJson} fieldName={"platformDbTools"} />
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={6}>
            <DtoJsonField dataObject={customerDbJson} fieldName={"customerDbTools"} />
          </Col>
        </Row>
      </div>
    </>
  );
}

CustomerDatabaseEditorPanel.propTypes = {
  customerDatabaseData: PropTypes.object,
  setCustomerDatabaseData: PropTypes.func,
  userId: PropTypes.string
};

export default CustomerDatabaseEditorPanel;


