import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { Col, Row } from "react-bootstrap";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DashboardTypeSelectInput from "components/common/list_of_values_input/insights/dashboards/types/DashboardTypeSelectInput";
import DashboardPersonaSelectInput from "components/common/list_of_values_input/insights/dashboards/DashboardPersonaSelectInput";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import { dashboardAttributesMetadata } from "components/insights/dashboards/dashboard-metadata";
import TagManager from "components/common/inputs/tags/TagManager";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import useComponentStateReference from "hooks/useComponentStateReference";

function DashboardEditorPanel({
  dashboardData,
  setDashboardData,
  handleClose,
}) {
  const [dashboardDataDto, setDashboardDataDto] = useState(undefined);
  const [dashboardAttributesDataDto, setDashboardAttributesDataDto] = useState(
    new Model(
      { ...dashboardAttributesMetadata.newObjectFields },
      dashboardAttributesMetadata,
      false,
    ),
  );
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessToken, isSaasUser, isMounted, cancelTokenSource } =
    useComponentStateReference();

  useEffect(() => {
    setIsLoading(true);
    setDashboardDataDto(dashboardData?.clone());
    setDashboardAttributesDataDto(
      new Model(
        dashboardData.getData("attributes"),
        dashboardAttributesMetadata,
        false,
      ),
    );
    setIsLoading(false);
  }, []);

  const createDashboard = async () => {
    const attributes = dashboardAttributesDataDto
      ? dashboardAttributesDataDto.getPersistData()
      : {};
    dashboardDataDto.setData("attributes", attributes);
    return await dashboardsActions.createDashboardV2(
      getAccessToken,
      cancelTokenSource,
      dashboardDataDto,
    );
  };

  const updateDashboard = async () => {
    const attributes = dashboardAttributesDataDto
      ? dashboardAttributesDataDto.getPersistData()
      : {};
    dashboardDataDto.setData("attributes", attributes);
    return await dashboardsActions.updateDashboardV2(
      getAccessToken,
      cancelTokenSource,
      dashboardDataDto,
    );
  };

  const getActivityToggleInput = () => {
    if (dashboardDataDto?.isNew() === false) {
      return (
        <Col md={6}>
          <ActivityToggleInput
            fieldName={"active"}
            setDataObject={setDashboardDataDto}
            dataObject={dashboardDataDto}
          />
        </Col>
      );
    }
  };

  const getRolesInput = () => {
    if (isSaasUser === false) {
      return (
        <Col md={12}>
          <div
            className={"bg-white"}
            style={{ borderRadius: "6px" }}
          >
            <div>
              <RoleAccessInput
                setModel={setDashboardDataDto}
                model={dashboardDataDto}
                disabled={dashboardData?.canEditAccessRoles() !== true}
              />
            </div>
          </div>
        </Col>
      );
    }
  };

  if (
    dashboardData == null ||
    dashboardDataDto == null ||
    (dashboardData?.isNew() !== true && dashboardData?.canUpdate() !== true)
  ) {
    return null;
  }

  return (
    <EditorPanelContainer
      isLoading={isLoading}
      recordDto={dashboardDataDto}
      handleClose={handleClose}
      setRecordDto={setDashboardDataDto}
      createRecord={createDashboard}
      updateRecord={updateDashboard}
      addAnotherOption={false}
    >
      <div className={"px-2"}>
        <Row>
          <Col md={6}>
            <TextInputBase
              fieldName={"name"}
              setDataObject={setDashboardDataDto}
              dataObject={dashboardDataDto}
            />
          </Col>
          <Col md={6}>
            <DashboardTypeSelectInput
              dataObject={dashboardDataDto}
              setDataObject={setDashboardDataDto}
            />
          </Col>
          {/*<Col md={6}>*/}
          {/*  <DashboardAccessSelectInput dataObject={dashboardDataDto} setDataObject={setDashboardDataDto} disabled={["public"]}/>*/}
          {/*</Col>*/}
          {getRolesInput()}
          <Col md={12}>
            <TextInputBase
              fieldName={"description"}
              setDataObject={setDashboardDataDto}
              dataObject={dashboardDataDto}
            />
          </Col>
          {/* <Col md={6}>
            <TagManager type={"dashboard"} setDataObject={setDashboardDataDto} dataObject={dashboardDataDto}/>
          </Col> */}
          {getActivityToggleInput()}
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

DashboardEditorPanel.propTypes = {
  dashboardData: PropTypes.object,
  setDashboardData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default DashboardEditorPanel;
