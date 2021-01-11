import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import dashboardsActions from "../dashboards-actions";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import Col from "react-bootstrap/Col";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import DashboardTypeSelectInput from "../../../common/list_of_values_input/insights/dashboards/DashboardTypeSelectInput";
import DashboardAccessSelectInput from "../../../common/list_of_values_input/insights/dashboards/DashboardAccessSelectInput";
import PersistButtonContainer from "components/common/buttons/saving/containers/PersistButtonContainer";

function DashboardEditorPanel({ dashboardData, setDashboardData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [dashboardDataDto, setDashboardDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setDashboardDataDto(dashboardData);
    setIsLoading(false);
  };

  const createDashboard = async () => {
    return await dashboardsActions.create(dashboardDataDto, getAccessToken);
  };

  const updateDashboard = async () => {
    return await dashboardsActions.update(dashboardDataDto, getAccessToken);
  };

  return (
    <EditorPanelContainer isLoading={isLoading}>
      <div className="mx-2">
        <Row>
          <Col md={6}>
            <DtoTextInput fieldName={"name"} setDataObject={setDashboardDataDto} dataObject={dashboardDataDto}/>
          </Col>
          <Col md={6}>
            <DashboardTypeSelectInput dataObject={dashboardDataDto} setDataObject={setDashboardDataDto}/>
          </Col>
          <Col md={12}>
            <DtoTextInput fieldName={"description"} setDataObject={setDashboardDataDto} dataObject={dashboardDataDto}/>
          </Col>
          <Col md={6}>
            <DashboardAccessSelectInput dataObject={dashboardDataDto} setDataObject={setDashboardDataDto} disabled={["public"]}/>
          </Col>
          <Col md={3}>
            <DtoToggleInput fieldName={"active"} setDataObject={setDashboardDataDto} dataObject={dashboardDataDto}/>
          </Col>
        </Row>
        <PersistButtonContainer
          recordDto={dashboardDataDto}
          handleClose={handleClose}
          setRecordDto={setDashboardDataDto}
          createRecord={createDashboard}
          updateRecord={updateDashboard}
          addAnotherOption={false}
        />
      </div>
    </EditorPanelContainer>
  );
}

DashboardEditorPanel.propTypes = {
  dashboardData: PropTypes.object,
  setDashboardData: PropTypes.func,
  handleClose: PropTypes.func
};

export default DashboardEditorPanel;


