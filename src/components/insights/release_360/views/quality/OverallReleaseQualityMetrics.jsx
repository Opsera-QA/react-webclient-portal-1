import React, {useState, useEffect, useContext, useRef} from 'react';
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import AutomationPercentagePieChart from 'components/insights/charts/qa_metrics/AutomationPercentagePieChart';
import KpiActions from 'components/admin/kpi_editor/kpi-editor-actions';
import {AuthContext} from "contexts/AuthContext";
import kpiFilterMetadata from 'components/admin/kpi_editor/kpi-filter-metadata';
import Model from "core/data_model/model";
import AdoptionPercentagePieChart from 'components/insights/charts/qa_metrics/AdoptionTestPercentagePieChart';


function OverallReleaseQualityMetrics() {
  const toastContext = useContext(DialogToastContext);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFiterModel]= useState(undefined);
  const [kpiList, setKpiList] = useState(undefined);
  const [kpiConfig, setKpiConfig] = useState(undefined);
  const [marketplaceFilterDto, setMarketplaceFilterDto] = useState(undefined);
  // const [dashboardFilterDto, setDashboardFilterDto] = useState(new Model({...dashboardFilterMetadata.newObjectFields}, dashboardFilterMetadata, false));
  const [kpiFilterDto, setKpiFilterDto] = useState(
    new Model({ ...kpiFilterMetadata.newObjectFields }, kpiFilterMetadata, false)
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
  }, []);

  // TODO: If these are separate data pulls,
  //  put the pulls inside the relevant data block components to keep concerns properly separated.
  //  Each data block component should be a separate react component and use the new base ones to keep everything consistent.
  //  If you need something different, feel free to ask me (Noah).
  //  I can also work with you to get this wired up properly once I have an example if needed
  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
       await getOverallReleaseQualityMetrics(cancelSource);
      // await getDashboard
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };
  // const getDashboard = async (cancelSource = cancelTokenSource) => {
  //   const response = await dashboardsActions.getDashboardByIdV2(getAccessToken, cancelSource, id);

  //   if (isMounted.current === true && response?.data) {
  //     setDashboardData(new Model(response.data, dashboardMetadata, false));
      
  //   }
  // };

  const getOverallReleaseQualityMetrics = async (cancelSource = cancelTokenSource) => {
    // const response = await KpiActions.getKpiById(getAccessToken,cancelSource,"automation-percentage");
    
    
    const response = await KpiActions.getKpisV2(getAccessToken, cancelSource, kpiFilterDto);
    console.log(response?.data?.data.find(item=>item.identifier =='automation-percentage'),' *** 123 list');
  
     if (isMounted?.current === true && response?.data?.data) {
    setKpiConfig(response?.data?.data.find(item=>item.identifier =='automation-percentage'));

    //   setKpiList(response.data.data);
    //   let newFilterDto = kpiFilterDto;
    //   newFilterDto.setData("totalCount", response.data.count);
    //   newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
    //   setKpiFilterDto({ ...newFilterDto });
     }
  };
console.log(kpiList,'*** ;list');

  const getMetricBlocks = () => {
    return (
      <div className={"d-flex"}>
        <DataBlockBoxContainer className={"mr-2"}>
          <AutomationPercentagePieChart
            kpiConfiguration={{kpi_name: "Automation Percentage", filters: []}}
            
          />
          <AdoptionPercentagePieChart
            kpiConfiguration={{kpi_name: "Adoption Percentage", filters: []}}
          />
          
          <ThreeLineDataBlockBase
            className={"p-2"}
            topText={"Successful Builds"}
            middleText={<MetricScoreText score={120} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
            bottomText={"6% Decrease"}
          />
        </DataBlockBoxContainer>
        <DataBlockBoxContainer className={"mr-2"}>
          <ThreeLineDataBlockBase
            className={"p-2"}
            topText={"Failed Builds"}
            middleText={<MetricScoreText score={52} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
            bottomText={"24% Increase"}
          />
        </DataBlockBoxContainer>
        <DataBlockBoxContainer className={"mr-2"}>
          <ThreeLineDataBlockBase
            topText={"Success Percentage"}
            className={"p-2"}
            middleText={<MetricPercentageText percentage={88} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
            bottomText={"Goal: 95%"}
          />
        </DataBlockBoxContainer>
      </div>
    );
  };

  if (isLoading === true) {
    return (<LoadingDialog message={"Loading Metrics"} />);
  }

  return (
    <div className={"mt-2"}>
      {getMetricBlocks()}
    </div>
  );
}

OverallReleaseQualityMetrics.propTypes = {
  dashboardId: PropTypes.string
};

export default OverallReleaseQualityMetrics;
