import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {DialogToastContext} from "contexts/DialogToastContext";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import registeredUserToolsMetadata
  from "components/admin/registered_users/details/tools/registered-user-tools-form-fields";
import Model from "core/data_model/model";
import JsonField from "components/common/fields/json/JsonField";
import ErrorDialog from "components/common/status_notifications/error";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";

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
    return <DetailPanelLoadingDialog type={"Customer DB"} />;
  }

  const getJsonDisplayers = () => {
    if (customerDbJson != null) {
      return (
        <div>
          <Row>
            <Col md={12} lg={6}>
              <JsonField dataObject={customerDbJson} fieldName={"platformDbTools"}/>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={6}>
              <JsonField dataObject={customerDbJson} fieldName={"customerDbTools"}/>
            </Col>
          </Row>
        </div>
      );
    }
    else {
      return (<ErrorDialog error={"Could not pull Customer DB information"} />);
    }
  };


  // TODO: Create metadata and implement editor panel when necessary
  return (
    <DetailPanelContainer>
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


