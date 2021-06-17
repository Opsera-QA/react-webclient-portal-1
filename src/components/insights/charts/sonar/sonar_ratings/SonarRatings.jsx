import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import {Container, Row, Col} from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import Model from "../../../../../core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "../../detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";

function SonarRatings({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "sonarRatings", kpiConfiguration, dashboardTags);
      let dataObject = response?.data ? response?.data?.data[0]?.sonarRatings?.data : [];

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

  const onRowSelect = (stat) => {
    const chartModel = new Model({...SonarRatingsBugsActionableMetadata.newObjectFields}, SonarRatingsBugsActionableMetadata, false);
    toastContext.showOverlayPanel(
      <ChartDetailsOverlay
        dashboardData={dashboardData}
        kpiConfiguration={kpiConfiguration}
        chartModel={chartModel}
        kpiIdentifier={"sonar-ratings" + "-" + stat} />);
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{height: "300px"}}>
      <Container>
      <Row className="p-3">
        <Col><div className="metric-box p-3 text-center">
        <div className="box-metric">
        {metrics[0].security_rating <= 1 && <div className="green">A</div>}
        {1 < metrics[0].security_rating && metrics[0].security_rating <= 2 && <div className="green">B</div>}
        {2 < metrics[0].security_rating && metrics[0].security_rating <= 3 && <div className="yellow">C</div>}
        {3 < metrics[0].security_rating && metrics[0].security_rating <= 4 && <div className="red">D</div>}
        {4 < metrics[0].security_rating && metrics[0].security_rating <= 5 && <div className="red">E</div>}
        </div>
        <div className="w-100 text-muted mb-1">Security</div>  
      </div></Col>
        <Col><div className="metric-box p-3 text-center">
        <div className="box-metric">
        {metrics[0].reliability_rating <= 1 && <div className="green">A</div>}
        {1 < metrics[0].reliability_rating && metrics[0].reliability_rating <= 2 && <div className="green">B</div>}
        {2 < metrics[0].reliability_rating && metrics[0].reliability_rating <= 3 && <div className="yellow">C</div>}
        {3 < metrics[0].reliability_rating && metrics[0].reliability_rating <= 4 && <div className="red">D</div>}
        {4 < metrics[0].reliability_rating && metrics[0].reliability_rating <= 5 && <div className="red">E</div>}
        </div>
        <div className="w-100 text-muted mb-1">Reliability</div> 
      </div></Col>
        <Col><div className="metric-box p-3 text-center">
        <div className="box-metric">
        {metrics[0].maintainability_rating <= 1 && <div className="green">A</div>}
        {1 < metrics[0].maintainability_rating && metrics[0].maintainability_rating <= 2 && <div className="green">B</div>}
        {2 < metrics[0].maintainability_rating && metrics[0].maintainability_rating <= 3 && <div className="yellow">C</div>}
        {3 < metrics[0].maintainability_rating && metrics[0].maintainability_rating <= 4 && <div className="red">D</div>}
        {4 < metrics[0].maintainability_rating && metrics[0].maintainability_rating <= 5 && <div className="red">E</div>}
        </div> 
        <div className="w-100 text-muted mb-1">Maintainability</div>  
      </div></Col>
      </Row>
      <Row className="p-3">
          <Col><div className="metric-box p-3 text-center">
          <div className="box-metric">
            <div className="pointer" onClick={() => onRowSelect("vulnerabilities")}>{metrics[0].vulnerabilities}</div>
          </div>
          <div className="w-100 text-muted mb-1">Vulnerabilities</div>    
        </div></Col>
          <Col><div className="metric-box p-3 text-center">
          <div className="box-metric">
            <div className="red pointer" onClick={() => onRowSelect("bugs")}>{metrics[0].bugs}</div>
          </div>  
          <div className="w-100 text-muted mb-1">Bugs</div>    
        </div></Col>
          <Col><div className="metric-box p-3 text-center">
          <div className="box-metric">
            <div className="pointer" onClick={() => onRowSelect("debt-ratio")}>{metrics[0].technical_debt_ratio + "%"}</div>
          </div>  
          <div className="w-100 text-muted mb-1">Technical Debt Ratio</div>    
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

SonarRatings.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default SonarRatings;
