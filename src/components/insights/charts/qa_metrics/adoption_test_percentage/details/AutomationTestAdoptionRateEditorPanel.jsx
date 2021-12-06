import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToolClassificationSelectInput from "components/common/list_of_values_input/inventory/ToolClassificationSelectInput";
import RegistryToolIdentifierSelectInput from "components/inventory/tools/tool_details/input/RegistryToolIdentifierSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TagManager from "components/common/inputs/tags/TagManager";
import axios from "axios";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import ResetButton from "components/common/buttons/reset/ResetButton";
import Model from "core/data_model/model";
import kpiConfigurationMetadata from "components/insights/marketplace/charts/kpi-configuration-metadata";
import ResetMetricConfirmationPanel
  from "components/insights/marketplace/dashboards/metrics/reset/ResetMetricConfirmationPanel";

function AutomationTestAdoptionRateEditorPanel({ kpiConfiguration, setKpiConfiguration, index, dashboardData, setKpis, closePanelFunction }) {
  const { getAccessToken, isSassUser } = useContext(AuthContext);
  const [kpiSettings, setKpiSettings] = useState(undefined);
  const [toolDataDto, setToolDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [showResetConfirmationPanel, setShowResetConfirmationPanel] = useState(false);
  
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
  }, [kpiConfiguration]);

  const loadData = async () => {
    setIsLoading(true);
    setKpiSettings(new Model(kpiConfiguration, kpiConfigurationMetadata, false));
    setIsLoading(false);
  };

  const deleteKpi = async () => {
    dashboardData?.getData("configuration").splice(index, 1);
    setKpis(dashboardData?.getData("configuration"));
    await dashboardsActions.updateDashboardV2(getAccessToken, cancelTokenSource, dashboardData);

    if (closePanelFunction) {
      closePanelFunction();
    }
  };

  const getExtraButtons = () => {
    return (
      <div className={"d-flex"}>
        <DeleteButtonWithInlineConfirmation
          dataObject={kpiSettings}
          deleteRecord={deleteKpi}
        />
        <ResetButton
          className={"ml-2"}
          model={kpiSettings}
          resetFunction={() => setShowResetConfirmationPanel(true)}
        />
      </div>
    );
  };

  // TODO: Should we make a MetricEditorPanelContainer that has the ResetMetricConfirmationPanel and delete confirmation panel inside it?
  const getEditorPanel = () => {
    return (
      <VanityEditorPanelContainer
        model={toolDataDto}
        setModel={setToolDataDto}
        isLoading={isLoading}
        showBooleanToggle={true}
        handleClose={closePanelFunction}
        className={"mx-3 mb-2"}
        extraButtons={getExtraButtons()}
      >
        <Row>
          <Col lg={6}>
            <TextInputBase setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"name"}/>
          </Col>
          <Col lg={6}>
            <RegistryToolIdentifierSelectInput
              dataObject={toolDataDto}
              setDataObject={setToolDataDto}
            />
          </Col>
          <Col lg={6}>
            <TextInputBase setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"costCenter"}/>
          </Col>
          <Col lg={6}>
            <TagManager type={"tool"} setDataObject={setToolDataDto} dataObject={toolDataDto}/>
          </Col>
          <Col lg={6}>
            <ToolClassificationSelectInput setDataObject={setToolDataDto} dataObject={toolDataDto}/>
          </Col>
          <Col lg={12} className="mb-2">
            <TextInputBase setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"description"}/>
          </Col>
        </Row>
      </VanityEditorPanelContainer>
    );
  }

  const getBody = () => {
    // TODO: Implement
    // if (showDeleteConfirmationPanel === true) {
    //   return (
    //
    //   );
    // }

    if (showResetConfirmationPanel === true) {
      return (
        <div className={"m-2"}>
          <ResetMetricConfirmationPanel
            kpiConfigurationModel={kpiSettings}
            dashboardModel={dashboardData}
            className={"ml-2"}
            identifier={kpiSettings?.getData("kpi_identifier")}
            index={index}
            closePanelFunction={closePanelFunction}
            setKpiConfiguration={setKpiConfiguration}
          />
        </div>
      );
    }

    return (getEditorPanel());
  };



  return (getBody());
}

AutomationTestAdoptionRateEditorPanel.propTypes = {
  dashboardData: PropTypes.object,
  setKpis: PropTypes.func,
  closePanelFunction: PropTypes.func,
  kpiConfiguration: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
};

export default AutomationTestAdoptionRateEditorPanel;
