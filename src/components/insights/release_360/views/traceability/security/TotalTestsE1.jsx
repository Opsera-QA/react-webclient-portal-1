import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { METRIC_QUALITY_LEVELS } from "../../../../../common/metrics/text/MetricTextBase";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "../../../../../common/metrics/score/MetricScoreText";
import VanityTable from "../../../../../common/table/VanityTable";
import FilterContainer from "../../../../../common/table/FilterContainer";
import { faDraftingCompass, faTable } from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import { getChartPipelineStatusColumn, getTableTextColumn } from "../../../../../common/table/table-column-helpers-v2";
import { getField } from "../../../../../common/metadata/metadata-helpers";
import { getTableDateTimeColumn } from "../../../../../common/table/column_definitions/model-table-column-definitions";
import Model from "../../../../../../core/data_model/model";
import genericChartFilterMetadata from "../../../../charts/generic_filters/genericChartFilterMetadata";
import TotalDeploymentsTableMetadata from "../deployments/total-deployments-metadata";
import { DialogToastContext } from "../../../../../../contexts/DialogToastContext";

function TotalTestsE1({ dashboardData, environment }) {
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, TotalDeploymentsTableMetadata, false)
  );
  const toastContext = useContext(DialogToastContext);


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
      let dashboardOrgs = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
      let dateRange = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "date")]?.value;
      const response = await chartsActions.getEnvironmentMetrics(getAccessToken, cancelSource, "totalTests", environment, dashboardTags, dashboardOrgs, dateRange);
      let dataObject = response?.data ? response?.data?.data[0] : [];

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

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getTable = () => {
    return (
      <VanityTable
        // isLoading={isLoading}
        columns={columns}
        data={metrics[0]?.steps}
        noDataMessage={"No Insights are available for this chart at this time"}
        paginationModel={tableFilterDto}
        setPaginationModel={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
        onRowSelect={onRowSelect}
      />
    );
  };

  const getBody = () => {
    let newFilterDto = tableFilterDto;
    newFilterDto.setData("totalCount", metrics[0]?.steps?.length);
    setTableFilterDto({ ...newFilterDto });

    return (
      <FilterContainer
        // isLoading={isLoading}
        showBorder={false}
        title={`Deployment Insights`}
        titleIcon={faDraftingCompass}
        body={getTable()}
        className={"px-2 pb-2"}
      />
    );
  };

  const onRowSelect = () => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Deployments Insights`}
        showToasts={true}
        titleIcon={faTable}
        isLoading={false}
        linkTooltipText={"View Full Blueprint"}
      >
        <div className={"p-3"}>{getBody()}</div>
      </FullScreenCenterOverlayContainer>
    );
  };

  const fields = [
    { id: "pipeline_name", label: "Pipeline Name" },
    { id: "run_count", label: "Run Count" },
    { id: "status", label: "Status" },
    { id: "timestamp", label: "Timestamp" },
  ];

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "pipeline_name")),
      getTableTextColumn(getField(fields, "run_count")),
      getChartPipelineStatusColumn(getField(fields, "status")),
      getTableDateTimeColumn(getField(fields, "timestamp")),
    ],
    []
  );

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    let color;
    let successRate = metrics[0]?.TotalTests === 0 ? 0 : (100*metrics[0].successfulTests/metrics[0].TotalTests).toFixed(0);
    if(successRate > 89){
      color = METRIC_QUALITY_LEVELS.SUCCESS;
    }
    else { color = METRIC_QUALITY_LEVELS.DANGER; }

    return (
      <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
        <ThreeLineDataBlockBase
          onClickFunction={(thisData) => onRowSelect(thisData)}
          topText={"Testing"}
          className={"p-4"}
          middleText={<MetricScoreText score={metrics[0].TotalTests} />}
          bottomText={<MetricScoreText score={successRate +"% Passed"} qualityLevel={color} />}
          showBorder={true}
        />
      </DataBlockBoxContainer>
    );
  };

  return (
    getChartBody()
  );
}

TotalTestsE1.propTypes = {
  // kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  environment: PropTypes.string
};

export default TotalTestsE1;
