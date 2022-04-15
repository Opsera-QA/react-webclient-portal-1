import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import IconBase from "../../../../../../../common/icons/IconBase";
import { faExternalLink } from "@fortawesome/pro-light-svg-icons";
import MTTRActionableInsightTable from "../MTTRActionableInsightTable";
import DataBlock from "../../../../../../../common/data_boxes/DataBlock";
import CoverityActionableDataBlockContainers
  from "../../../../../coverity/CoverityIssuesByCategory/actionable_insights/CoverityActionableDataBlockContainers";
import MTTRActionableDataBlocks from "../MTTRActionableDataBlocks";

function MTTRMasterTab({ priority, dashboardData, kpiConfiguration, icon }) {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [dataBlockValues, setDataBlockValues] = useState([]);
  const { getAccessToken } = useContext(AuthContext);
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
      let request = "serviceNowMTTRActionableInsights";
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
        null,
        null,
        priority

      );
      let dataObject = response?.data ? response?.data?.data[0]?.serviceNowMTTRActionableInsights?.data[0].tableData : [];
      let dataCount = response?.data
        ? response?.data?.data[0]?.serviceNowMTTRActionableInsights?.data[0]?.count[0]?.count
        : [];
      let DataBlocks = response?.data
        ? response?.data?.data[0]?.serviceNowMTTRActionableInsights?.data[0]?.blockData[0]
        : [];
      dataObject = dataObject.map((bd, index) => ({
        ...bd,
        _blueprint: <IconBase icon={faExternalLink} className={"mr-2"} />,
      }));

      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setFilterModel({ ...newFilterDto });
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setDataBlockValues(DataBlocks);
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

  return (
    <div className={"p-2"}>
      <MTTRActionableDataBlocks data={dataBlockValues}  />
      <MTTRActionableInsightTable
        data={metrics}
        isLoading={isLoading}
        loadData={loadData}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        priority={priority}
        tableTitleIcon={icon}
      />
    </div>
  );
}
MTTRMasterTab.propTypes = {
  priority: PropTypes.number,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object,
};
export default MTTRMasterTab;
