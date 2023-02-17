import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { faExternalLink, faTable } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import chartsActions from "components/insights/charts/charts-actions";
import { useHistory } from "react-router-dom";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import AquasecActionableInsightsTable from "./AquasecActionableInsightsTable";
import AquasecActionableDataBlockContainers from "./AquasecActionableDataBlockContainers";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import IconBase from "components/common/icons/IconBase";
import aquasecActions from "../aquasec.action";

function AquasecActionableInsightsOverlay({ title, severity, kpiConfiguration, dashboardData }) {
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
      const response = await aquasecActions.aquasecSecurityInsightsActionableOne(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
          filterDto,
          severity.toLowerCase()
      );

      let dataObject = response?.data ? response?.data?.data[0]?.TableData[0]?.data : [];
      let dataCount = response?.data
          ? response?.data?.data[0]?.TableData[0]?.count[0]?.count
          : [];
      let DataBlocks = response?.data
          ? response?.data?.data[0]?.BlocksData[0]
          : [];
      dataObject = dataObject.map((bd, index) => ({
        ...bd,
        _blueprint: <IconBase icon={faExternalLink} className={"mr-2"} />,
      }));

      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setFilterModel({ ...newFilterDto });
      if (isMounted?.current === true) {
        setMetrics(dataObject);
        setDataBlockValues(DataBlocks);
      }
      else{
        setMetrics([]);
        setDataBlockValues({});
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

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
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
        {getDateRange()}
        <AquasecActionableDataBlockContainers data={dataBlockValues} level={severity} />
        <AquasecActionableInsightsTable
          data={metrics}
          isLoading={isLoading}
          loadData={loadData}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          title={title}
          severity={severity}
          kpiConfiguration={kpiConfiguration}
          dashboardData={dashboardData}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

AquasecActionableInsightsOverlay.propTypes = {
  title: PropTypes.string,
  severity: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default AquasecActionableInsightsOverlay;
