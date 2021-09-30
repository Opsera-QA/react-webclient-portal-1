import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Popover, OverlayTrigger } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Model from "../../../../../core/data_model/model";
import RequirementToBranchCreationTableMetadata from "./Req-creation-to-branch-creation.js";
import ChartDetailsOverlay from "../../detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import OpseraDeploymentFrequencyHelpDocumentation from "../../../../common/help/documentation/insights/charts/OpseraDeploymentFrequencyHelpDocumentation";
import genericChartFilterMetadata from "../../generic_filters/genericChartFilterMetadata";

function ReqCreateToBranchCreation({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [branchMetric, setBranchMetric] = useState([]);
  const [codeMetric, setCodeMetric] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, RequirementToBranchCreationTableMetadata, false)
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
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const branchResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "requirementCreationToBranchCreation",
        kpiConfiguration,
        dashboardTags,
        filterDto
      );
      let branchDataObject = branchResponse?.data
        ? branchResponse?.data?.data[0]?.requirementCreationToBranchCreation?.data
        : [];

      let branchNewFilterDto = filterDto;
      branchNewFilterDto.setData("totalCount", branchDataObject?.docs?.length);
      setTableFilterDto({ ...branchNewFilterDto });

      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "requirementCreationToCodeCommit",
        kpiConfiguration,
        dashboardTags,
        filterDto
      );
      let dataObject = response?.data ? response?.data?.data[0]?.requirementCreationToCodeCommit?.data : [];

      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataObject?.docs?.length);
      setTableFilterDto({ ...newFilterDto });

      if (isMounted?.current === true && dataObject) {
        // TODO: CONVERT IN NODE
        // branchDataObject.averageReqCreationToBranchCreationSecs = (
        //   (branchMetric.averageReqCreationToBranchCreationSecs % 3600) /
        //   60
        // ).toFixed(2);
        // dataObject.averageReqCreationToCodeCommitTimeSecs = (
        //   (codeMetric.averageReqCreationToCodeCommitTimeSecs % 3600) /
        //   60
        // ).toFixed(2);

        setBranchMetric(branchDataObject);
        setCodeMetric(dataObject);
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

  const getChartBody = () => {
    if (branchMetric.length === 0 && codeMetric.length === 0) {
      return null;
    }

    // const infoPopover = (item) => {
    //   return (
    //     <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
    //       <Popover.Content>
    //         <div className="text-primary mb-2">{item._id}</div>
    //       </Popover.Content>
    //     </Popover>
    //   );
    // };

    const onRowSelect = (stat) => {
      const chartModel = new Model(
        { ...RequirementToBranchCreationTableMetadata.newObjectFields },
        RequirementToBranchCreationTableMetadata,
        false
      );
      toastContext.showOverlayPanel(
        <ChartDetailsOverlay
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          chartModel={chartModel}
          kpiIdentifier={"req-creation-to-branch-creation"}
        />
      );
    };

    return (
      <div className="new-chart mb-3" style={{ height: "300px" }}>
        <Container>
          <Row className="p-3">
            <Col>
              <div className="metric-box p-3 text-center">
                <div className="box-metric">
                  <div className="green pointer" onClick={() => onRowSelect("successful")}>
                    {branchMetric.averageReqCreationToBranchCreationSecs}
                  </div>
                </div>
                <div className="w-100 text-muted mb-1">Requirement Creation to Branch Creation (Mins)</div>
              </div>
            </Col>
            <Col>
              <div className="metric-box p-3 text-center">
                <div className="box-metric">
                  <div className="green pointer" onClick={() => onRowSelect("successful")}>
                    {codeMetric.averageReqCreationToCodeCommitTimeMins}
                  </div>
                </div>
                <div className="w-100 text-muted mb-1">Requirement Creation to Last Code Commit (Mins)</div>
              </div>
            </Col>
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
        // chartHelpComponent={(closeHelpPanel) => (
        //   <OpseraDeploymentFrequencyHelpDocumentation closeHelpPanel={closeHelpPanel} />
        // )}
      />
      <ModalLogs
        header="Build Duration"
        size="lg"
        jsonMessage={branchMetric}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

ReqCreateToBranchCreation.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default ReqCreateToBranchCreation;
