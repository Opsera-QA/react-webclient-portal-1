import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { Col, Row } from "react-bootstrap";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import IssuesSelectionView from "./IssuesSelectionView";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {dashboardAttributesMetadata} from "components/insights/dashboards/dashboard-metadata";
import GitCustodianTableMetaData from "../table/gitCustodianTableMetaData";
import axios from "axios";
import {
  dashboardTypeConstants
} from "../../../common/list_of_values_input/insights/dashboards/types/dashboardType.constants";
import SelectInputBase from "../../../common/inputs/select/SelectInputBase";
import TextAreaInput from "../../../common/inputs/text/TextAreaInput";
import chartsActions from "../../charts/charts-actions";

function GitCustodianNewJiraTicketEditorPanel({ dashboardData, setDashboardData, handleClose }) {
  const { getAccessToken, isSassUser } = useContext(AuthContext);
  const [dashboardDataDto, setDashboardDataDto] = useState(undefined);
  const [dashboardAttributesDataDto, setDashboardAttributesDataDto] = useState(new Model({...GitCustodianTableMetaData.newObjectFields}, GitCustodianTableMetaData, false));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [issuesData, setIssuesData] = useState([]);

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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
    setIsLoading(true);
    setDashboardDataDto(dashboardData);
    setDashboardAttributesDataDto(new Model(dashboardData.getData("attributes"), dashboardAttributesMetadata, false));
    const dataResponse = await chartsActions.getGitCustodianChartsData(
      getAccessToken,
      cancelSource,
      dashboardDataDto
    );
    const dataResponse1 = dataResponse?.data?.data?.data?.[0];
    if(dataResponse1) {
      setIssuesData(dataResponse1);
    }
  } catch (error) {
    if (isMounted?.current === true) {
      console.error(error);
      setError(error);
    }
  } finally {
    if (isMounted?.current === true) {
      setIsLoading(false);
    }
  }
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
            <TextAreaInput
              fieldName={"description"}
              dataObject={dashboardDataDto}
              setDataObject={setDashboardDataDto}
            />
          </Col>
          <Col md={12}>
            <TextAreaInput
              fieldName={"summary"}
              dataObject={dashboardDataDto}
              setDataObject={setDashboardDataDto}
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


