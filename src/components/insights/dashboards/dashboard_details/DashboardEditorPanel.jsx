import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { Button, Col, Row } from "react-bootstrap";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DashboardTypeSelectInput
  from "components/common/list_of_values_input/insights/dashboards/DashboardTypeSelectInput";
import DashboardAccessSelectInput
  from "components/common/list_of_values_input/insights/dashboards/DashboardAccessSelectInput";
import DashboardPersonaSelectInput
  from "components/common/list_of_values_input/insights/dashboards/DashboardPersonaSelectInput";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import ObjectJsonModal from "components/common/modal/ObjectJsonModal";
import {dashboardAttributesMetadata} from "components/insights/dashboards/dashboard-metadata";
function DashboardEditorPanel({ dashboardData, setDashboardData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [dashboardDataDto, setDashboardDataDto] = useState({});
  const [dashboardAttributesDataDto, setDashboardAttributesDataDto] = useState(new Model({...dashboardAttributesMetadata.newObjectFields}, dashboardAttributesMetadata, false));
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setDashboardDataDto(dashboardData);
    setDashboardAttributesDataDto(new Model(dashboardData.getData("attributes"), dashboardAttributesMetadata, false));
    setIsLoading(false);
  };

  const createDashboard = async () => {
    const attributes = dashboardAttributesDataDto ? dashboardAttributesDataDto.getPersistData() : {};
    dashboardDataDto.setData("attributes", attributes);
    return await dashboardsActions.create(dashboardDataDto, getAccessToken);
  };

  const updateDashboard = async () => {
    const attributes = dashboardAttributesDataDto ? dashboardAttributesDataDto.getPersistData() : {};
    dashboardDataDto.setData("attributes", attributes);
    return await dashboardsActions.update(dashboardDataDto, getAccessToken);
  };

  return (
    <EditorPanelContainer
      isLoading={isLoading}
      recordDto={dashboardDataDto}
      handleClose={handleClose}
      setRecordDto={setDashboardDataDto}
      createRecord={createDashboard}
      updateRecord={updateDashboard}
      addAnotherOption={false}
      lenient={true}
    >
      <div className="mx-2">
        <Row>
          <Col md={6}>
            <TextInputBase fieldName={"name"} setDataObject={setDashboardDataDto} dataObject={dashboardDataDto}/>
          </Col>
          <Col md={6}>
            <DashboardTypeSelectInput dataObject={dashboardDataDto} setDataObject={setDashboardDataDto}/>
          </Col>
          <Col md={6}>
            <DashboardPersonaSelectInput dataObject={dashboardAttributesDataDto} setDataObject={setDashboardAttributesDataDto}/>
          </Col>
          <Col md={6}>
            <DashboardAccessSelectInput dataObject={dashboardDataDto} setDataObject={setDashboardDataDto} disabled={["public"]}/>
          </Col>
          <Col md={12}>
            <TextInputBase fieldName={"description"} setDataObject={setDashboardDataDto} dataObject={dashboardDataDto}/>
          </Col>
          <Col md={3}>
            <ActivityToggleInput fieldName={"active"} setDataObject={setDashboardDataDto} dataObject={dashboardDataDto}/>
          </Col>
        </Row>
      </div>
      <ObjectJsonModal header={`Viewing ${dashboardData.getData("name")} Details`} size="lg" show={showModal} jsonData={dashboardData.data} setParentVisibility={setShowModal}/>
    </EditorPanelContainer>
  );
}

DashboardEditorPanel.propTypes = {
  dashboardData: PropTypes.object,
  setDashboardData: PropTypes.func,
  handleClose: PropTypes.func
};

export default DashboardEditorPanel;


