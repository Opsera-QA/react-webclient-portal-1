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
import SonarRatingsChartHelpDocumentation
  from "components/common/help/documentation/insights/charts/SonarRatingsChartHelpDocumentation";
import MetricLetterGrade, {LETTER_GRADES} from "components/common/metrics/grade/MetricLetterGrade";
import SonarRatingsMaintainabilityDataBlock
  from "components/insights/charts/sonar/sonar_ratings/SonarRatingsMaintainabilityDataBlock";

//TODO: Charts should have some sort of name that says they're a chart like SonarRatingsChart for clarity and easy of global search
function SonarRatings({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setError] = useState(undefined);
  const [sonarRatingsMetric, setSonarRatingsMetric] = useState(undefined);
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

  // TODO: Don't send this complicated object, just send the metric
  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "sonarRatings", kpiConfiguration, dashboardTags);
      const metrics = response?.data?.data[0]?.sonarRatings?.data;

      if (isMounted?.current === true && Array.isArray(metrics)) {
        setSonarRatingsMetric(metrics[0]);
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

  const getSonarSecurityGrade = (rating) => {
    if (rating <= 1) {
      return LETTER_GRADES.A;
    }
    else if (rating <= 2) {
      return LETTER_GRADES.B;
    }
    else if (rating <= 3) {
      return LETTER_GRADES.C;
    }
    else if (rating <= 4) {
      return LETTER_GRADES.D;
    }
    else if (rating <= 5) {
      return LETTER_GRADES.E;
    }
    else {
      return "ERROR";
    }
  };


  // TODO: Make separate components
  const getVulnerabilityDataBlock = () => {
    return (
      <Col>
        <div className="metric-box p-3 text-center pointer" onClick={() => onRowSelect("vulnerabilities")}>
          <div className="box-metric">
            <MetricLetterGrade letterGrade={getSonarSecurityGrade(sonarRatingsMetric?.security_rating)} />
          </div>
          <div className="w-100 text-muted mb-1">Security</div>
        </div>
        {/*DATA BLOCK 2*/}
       <div className="metric-box p-3 text-center">
          <div className="box-metric">
            <div  className="pointer" onClick={() => onRowSelect("vulnerabilities")}>{sonarRatingsMetric.vulnerabilities}</div>
          </div>
          <div className="w-100 text-muted mb-1">Vulnerabilities</div>
        </div>
      </Col>
    );
  };

  const getSonarReliabilityGrade = (rating) => {
    if (rating <= 1) {
      return LETTER_GRADES.A;
    }
    else if (rating <= 2) {
      return LETTER_GRADES.B;
    }
    else if (rating <= 3) {
      return LETTER_GRADES.C;
    }
    else if (rating <= 4) {
      return LETTER_GRADES.D;
    }
    else if (rating <= 5) {
      return LETTER_GRADES.E;
    }
    else {
      return "ERROR";
    }
  };

  const getReliabilityDataBlock = () => {
    return (
      <Col className={""}>
        <div className="metric-box p-3 text-center">
        <div className="box-metric pointer" onClick={() => onRowSelect("bugs")}>
          <MetricLetterGrade letterGrade={getSonarReliabilityGrade(sonarRatingsMetric?.reliability_rating)} />
        </div>
        <div className="w-100 text-muted mb-1">Reliability</div>
      </div>
        {/*DATA BLOCK 2*/}
        <div className="metric-box p-3 text-center">
          <div className="box-metric">
            <div  className="red pointer" onClick={() => onRowSelect("bugs")}>{sonarRatingsMetric.bugs}</div>
          </div>
          <div className="w-100 text-muted mb-1">Bugs</div>
        </div>
      </Col>
    );
  };


  const getSonarMaintainabilityGrade = (rating) => {
    if (rating <= 1) {
      return LETTER_GRADES.A;
    }
    else if (rating <= 2) {
      return LETTER_GRADES.B;
    }
    else if (rating <= 3) {
      return LETTER_GRADES.C;
    }
    else if (rating <= 4) {
      return LETTER_GRADES.D;
    }
    else if (rating <= 5) {
      return LETTER_GRADES.E;
    }
    else {
      return "ERROR";
    }
  };

  const getMaintainabilityDataBlock = () => {
    return (
      <Col>
        <div className="metric-box p-3 text-center">
        <div className="box-metric pointer" onClick={() => onRowSelect("debt-ratio")}>
          <MetricLetterGrade letterGrade={getSonarMaintainabilityGrade(sonarRatingsMetric?.maintainability_rating)} />
        </div>
        <div className="w-100 text-muted mb-1">Maintainability</div>
      </div>
        {/*DATA BLOCK 2*/}
        <div className="metric-box p-3 text-center">
          <div className="box-metric">
            <div className="pointer" onClick={() => onRowSelect("debt-ratio")}>{sonarRatingsMetric.technical_debt_ratio + "%"}</div>
          </div>
          <div className="w-100 text-muted mb-1">Technical Debt Ratio</div>
        </div>
      </Col>
    );
  };

  const getChartBody = () => {
    if (sonarRatingsMetric == null) {
      return null;
    }

    return (
      // <div className="new-chart mb-3" style={{height: "300px"}}>
      //   <Container>
      //     <Row className="p-3">
      //       {getVulnerabilityDataBlock()}
      //       {getReliabilityDataBlock()}
      // {getMaintainabilityDataBlock()}
          // </Row>
        // </Container>
      // </div>

      <SonarRatingsMaintainabilityDataBlock
        dashboardData={dashboardData}
        kpiConfiguration={kpiConfiguration}
        maintainabilityRating={sonarRatingsMetric?.maintainability_rating}
        technicalDebtRatio={sonarRatingsMetric.technical_debt_ratio}
      />
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
        chartHelpComponent={(closeHelpPanel) => <SonarRatingsChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
      />
      <ModalLogs
        header="Build Duration"
        size="lg"
        jsonMessage={sonarRatingsMetric}
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
