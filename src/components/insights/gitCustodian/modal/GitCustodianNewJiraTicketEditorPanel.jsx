import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { Col, Row } from "react-bootstrap";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import IssuesSelectionView from "./IssuesSelectionView";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import DashboardTypeSelectInput
  from "components/common/list_of_values_input/insights/dashboards/types/DashboardTypeSelectInput";
import DashboardAccessSelectInput
  from "components/common/list_of_values_input/insights/dashboards/DashboardAccessSelectInput";
import DashboardPersonaSelectInput
  from "components/common/list_of_values_input/insights/dashboards/DashboardPersonaSelectInput";
import {dashboardAttributesMetadata} from "components/insights/dashboards/dashboard-metadata";
import axios from "axios";
import {
  dashboardTypeConstants
} from "../../../common/list_of_values_input/insights/dashboards/types/dashboardType.constants";
import SelectInputBase from "../../../common/inputs/select/SelectInputBase";

function GitCustodianNewJiraTicketEditorPanel({ dashboardData, setDashboardData, handleClose }) {
  const { getAccessToken, isSassUser } = useContext(AuthContext);
  const [dashboardDataDto, setDashboardDataDto] = useState(undefined);
  const [dashboardAttributesDataDto, setDashboardAttributesDataDto] = useState(new Model({...dashboardAttributesMetadata.newObjectFields}, dashboardAttributesMetadata, false));
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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
    setIsLoading(true);
    setDashboardDataDto(dashboardData);
    setDashboardAttributesDataDto(new Model(dashboardData.getData("attributes"), dashboardAttributesMetadata, false));
    setIsLoading(false);
  };

  const createNewJiraTicket = async () => {
    const attributes = dashboardAttributesDataDto ? dashboardAttributesDataDto.getPersistData() : {};
    dashboardDataDto.setData("attributes", attributes);
    return await dashboardsActions.createDashboardV2(getAccessToken, cancelTokenSource, dashboardDataDto);
  };

  if (dashboardData == null || dashboardDataDto == null) {
    return null;
  }

  return (
    <EditorPanelContainer
      isLoading={isLoading}
      recordDto={dashboardDataDto}
      handleClose={handleClose}
      setRecordDto={setDashboardDataDto}
      createRecord={createNewJiraTicket}
      addAnotherOption={false}
    >
      <div className={"px-2"}>
        <Row>
          <Col md={12}>
            <SelectInputBase
              fieldName={'tool'}
              dataObject={dashboardDataDto}
              setDataObject={setDashboardDataDto}
              selectOptions={dashboardTypeConstants.DASHBOARD_TYPE_SELECT_OPTIONS}
              valueField={"value"}
              textField={"text"}
              disabled={false}
            />
          </Col>
          <Col md={12}>
            <SelectInputBase
              fieldName={'projectName'}
              dataObject={dashboardDataDto}
              setDataObject={setDashboardDataDto}
              selectOptions={dashboardTypeConstants.DASHBOARD_TYPE_SELECT_OPTIONS}
              valueField={"value"}
              textField={"text"}
              disabled={true}
            />
          </Col>
          <Col md={12}>
            <SelectInputBase
              fieldName={'issueType'}
              dataObject={dashboardDataDto}
              setDataObject={setDashboardDataDto}
              selectOptions={dashboardTypeConstants.DASHBOARD_TYPE_SELECT_OPTIONS}
              valueField={"value"}
              textField={"text"}
              disabled={true}
            />
          </Col>
          <Col lg={12}>
            <IssuesSelectionView
              dataObject={dashboardDataDto}
              setDataObject={setDashboardDataDto}
            />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

GitCustodianNewJiraTicketEditorPanel.propTypes = {
  dashboardData: PropTypes.object,
  setDashboardData: PropTypes.func,
  handleClose: PropTypes.func
};

export default GitCustodianNewJiraTicketEditorPanel;


