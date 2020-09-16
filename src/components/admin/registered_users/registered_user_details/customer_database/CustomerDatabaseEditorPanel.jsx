import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoadingDialog from "../../../../common/status_notifications/loading";
import SaveButton from "../../../../common/buttons/SaveButton";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import Model from "../../../../../core/data_model/model";

function CustomerDatabaseEditorPanel({ customerDatabaseData, setCustomerDatabaseData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [customerDatabaseDataDto, setCustomerDatabaseDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setCustomerDatabaseDataDto(customerDatabaseData);
    setIsLoading(false);
  };
  const updateProfile = async () => {
    if(setCustomerDatabaseDataDto.isModelValid2()) {
      try {
        // TODO: Update with proper API call
        const response = {};
          // await RegisteredUserActions.updateAnalyticsProfile(customerDatabaseDataDto, getAccessToken);
        let newDto = new Model(response.data, customerDatabaseDataDto.metaData, false);
        toastContext.showUpdateSuccessResultDialog(customerDatabaseDataDto.getType());
        setCustomerDatabaseDataDto(newDto);
        setCustomerDatabaseData(newDto);
      }
      catch (err) {
        console.log(err.message);
      }
    }
    else {
      toastContext.showFormValidationErrorDialog();
    }
  };

  if (isLoading) {
    return <LoadingDialog size={"sm"} />
  }

  return (
    <>
      <div className="text-center p-5 text-muted">Customer Database management is not currently available.</div>
      <Row>
        <Col>
          {/*<DtoTextInput fieldName="dataUsage" setDataObject={setCustomerDatabaseDataDto} dataObject={customerDatabaseDataDto}/>*/}
        </Col>
      </Row>
      <Row>
        {/*<div className="ml-auto px-3">*/}
        {/*  <SaveButton updateRecord={updateProfile} createRecord={updateProfile} recordDto={customerDatabaseDataDto}/>*/}
        {/*</div>*/}
      </Row>
    </>
  );
}

CustomerDatabaseEditorPanel.propTypes = {
  customerDatabaseData: PropTypes.object,
  setCustomerDatabaseData: PropTypes.func,
};

export default CustomerDatabaseEditorPanel;


