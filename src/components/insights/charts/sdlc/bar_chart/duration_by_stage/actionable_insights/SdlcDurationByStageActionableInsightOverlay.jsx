import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { faExternalLink, faTable } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import chartsActions from "components/insights/charts/charts-actions";
import { useHistory } from "react-router-dom";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SdlcDurationByStageActionableInsightTable from "./SdlcDurationByStageActionableInsightTable";
import SdlcDurationByStageOverviewDataBlockContainer from "./SdlcDurationByStageOverviewDataBlockContainer";
import { getTimeDisplay } from "components/insights/charts/sonar/sonar_ratings/data_blocks/sonar-ratings-pipeline-utility";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import IconBase from "components/common/icons/IconBase";

function SdlcDurationByStageActionableInsightOverlay({
  title,
  actionableInsightsQueryData,
  kpiConfiguration,
  dashboardData,
}) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [dataBlockValues, setDataBlockValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
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
  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      let request = "opseraSdlcPipelineStageDurationByMonth";
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        request,
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
        null,
        null,
        null,
        actionableInsightsQueryData
      );
      let dataObject = response?.data ? response?.data?.data[0]?.opseraSdlcDurationByStage?.data?.metrics[0]?.data : [];
      let dataCount = response?.data
        ? response?.data?.data[0]?.opseraSdlcDurationByStage?.data?.metrics[0]?.count[0]?.count
        : [];
      let summary = response?.data ? response?.data?.data[0]?.opseraSdlcDurationByStage?.data?.summary : [];
      dataObject = dataObject.map((bd, index) => ({
        ...bd,
        _blueprint: <IconBase icon={faExternalLink} className={"mr-2"} />,
      }));
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setFilterModel({ ...newFilterDto });
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setDataBlockValues(summary);
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

  const getFooterDetails = () => {
    if (!dataBlockValues) {
      return null;
    }

    const total_duration = dataBlockValues?.total_duration ? dataBlockValues?.total_duration : 0;
    const total_time_to_resolve = dataBlockValues?.total_time_to_resolve ? dataBlockValues?.total_time_to_resolve : 0;
    const total_duration_display = getTimeDisplay(total_duration);
    const total_time_to_resolve_display = getTimeDisplay(total_time_to_resolve);
    return (
      <Row className="px-2">
        <Col className="footer-records text-right">
          Total time spent to execute builds :{" "}
          {!total_duration_display || total_duration_display === 0 ? " 0 minutes" : total_duration_display}
          <br></br>
          Total time spent to resolve failed builds:{" "}
          {!total_time_to_resolve_display || total_time_to_resolve_display === 0
            ? " 0 minutes"
            : total_time_to_resolve_display}
        </Col>
      </Row>
    );
  };

  const onRowSelect = (rowData) => {
    history.push(`/blueprint/${rowData?.data?._id?.pipelineId}/${rowData?.data?._id?.run}`);
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDateBadge = () => {
    const date = actionableInsightsQueryData?.data;
    return <MetricDateRangeBadge startDate={date?.lowerBound} endDate={date?.upperBound} />;
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={title}
      showToasts={true}
      titleIcon={faTable}
      isLoading={isLoading}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        {getDateBadge()}
        <SdlcDurationByStageOverviewDataBlockContainer data={dataBlockValues} />
        <SdlcDurationByStageActionableInsightTable
          data={metrics}
          isLoading={isLoading}
          loadData={loadData}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          title={title}
        />
        {/* {getFooterDetails()} */}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

SdlcDurationByStageActionableInsightOverlay.propTypes = {
  title: PropTypes.string,
  actionableInsightsQueryData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SdlcDurationByStageActionableInsightOverlay;
