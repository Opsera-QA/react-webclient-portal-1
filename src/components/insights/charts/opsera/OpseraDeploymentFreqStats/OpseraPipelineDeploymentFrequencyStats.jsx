import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Popover, OverlayTrigger } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Model from "../../../../../core/data_model/model";
import DeploymentFrequencyInsightsTableMetadata
  from "./deployment-frequency-actionable-metadata.js";
import ChartDetailsOverlay from "../../detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import OpseraDeploymentFrequencyHelpDocumentation
  from "../../../../common/help/documentation/insights/charts/OpseraDeploymentFrequencyHelpDocumentation";
import genericChartFilterMetadata from "../../generic_filters/genericChartFilterMetadata";
import IconBase from "components/common/icons/IconBase";

function OpseraPipelineDeploymentFrequencyStats({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, DeploymentFrequencyInsightsTableMetadata, false)
  );

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "deduplicatePipelineDeploymentFrequencyCounts", kpiConfiguration, dashboardTags, filterDto);
      let dataObject = response?.data ? response?.data?.data[0]?.deduplicatePipelineDeploymentFrequencyCounts?.data : [];
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataObject[0]);
      setTableFilterDto({ ...newFilterDto });

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }
    
    const infoPopover = (item) => {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Content>
            <div className="text-primary mb-2">{item._id}</div>
          </Popover.Content>
        </Popover>
      );
    };

    const onRowSelect = (stat) => {
      const chartModel = new Model({...DeploymentFrequencyInsightsTableMetadata.newObjectFields}, DeploymentFrequencyInsightsTableMetadata, false);
      toastContext.showOverlayPanel(
      <ChartDetailsOverlay 
        dashboardData={dashboardData} 
        kpiConfiguration={kpiConfiguration} 
        chartModel={chartModel} 
        kpiIdentifier={"opsera-deployment-frequency-stats" + "-" + stat} />);
    };

    return (
      <div className="new-chart mb-3" style={{height: "300px"}}>
        <Container>
        <Row className="p-3">
            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div className="green pointer" onClick={() => onRowSelect("successful")}>{metrics[0].totalSuccess}</div>
              </div>
              <div className="w-100 text-muted mb-1">Successful Deployments</div>
            </div></Col>
            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div className="red pointer" onClick={() => onRowSelect("failed")}>{metrics[0].totalFailed}</div>
              </div>
              <div className="w-100 text-muted mb-1">Failed Deployments</div>
            </div></Col>
            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div>{metrics[0].successPercentage + "%"}</div>
              </div>
              <div className="w-100 text-muted mb-1">Success Rate</div>
            </div></Col>
          </Row>
          <Row className="p-1">
            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div>{metrics[0].avg}</div>
              </div>
              <div className="w-100 text-muted mb-1">Average Deployments</div>
            </div></Col>
            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div>{metrics[0].max.count}</div>
              </div>
              <OverlayTrigger trigger="click" rootClose placement="top" overlay={infoPopover(metrics[0].max)}>
                <IconBase
                  icon={faEllipsisH}
                  className={"fa-pull-right pointer pr-1"}
                  onClickFunction={() => document.body.click()}
                />
              </OverlayTrigger>
              <div className="w-100 text-muted mb-1">Max Deployments</div>
            </div></Col>
            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div>{metrics[0].min.count}</div>
              </div>
              <OverlayTrigger trigger="click" rootClose placement="top" overlay={infoPopover(metrics[0].min)}>
                <IconBase
                  icon={faEllipsisH}
                  className="fa-pull-right pointer pr-1"
                  onClickFunction={() => document.body.click()}
                  />
                </OverlayTrigger>
              <div className="w-100 text-muted mb-1">Min Deployments</div>
            </div></Col>
          </Row>
        </Container>
      </div>

    );
  };

  return (
    <div>
      <ChartContainer
        title={kpiConfiguration?.kpi_name}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => (
          <OpseraDeploymentFrequencyHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
      <ModalLogs
        header="Build Duration"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

OpseraPipelineDeploymentFrequencyStats.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default OpseraPipelineDeploymentFrequencyStats;