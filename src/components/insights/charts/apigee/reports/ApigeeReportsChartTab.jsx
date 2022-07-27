import React, {useState, useEffect, useContext, useRef} from "react";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "../../../../common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import ModalLogs from "../../../../common/modal/modalLogs";
import { faDiagramSuccessor } from "@fortawesome/free-solid-svg-icons";
import apigeeActions from "../apigee.action";
import LoadingIcon from "../../../../common/icons/LoadingIcon";
import {parseError} from "../../../../common/helpers/error-helpers";
import VanitySetTabAndViewContainer from "../../../../common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetVerticalTabContainer from "../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import IconBase from "../../../../common/icons/IconBase";
import VanitySetVerticalTab from "../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import ApigeeReportsPipelineTable from "./ApigeeReportsPipelineTable";
import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration
} from "components/insights/charts/charts-helpers";
import Model from "../../../../../core/data_model/model";
import {apigeeReportsMetadata} from "./apigeeReports-metadata";
import PaginationContainer from "../../../../common/pagination/PaginationContainer";

function ApigeeReportsChartTab({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis, showSettingsToggle}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [responseData, setResponseData] = useState(undefined);
  const [activeTab,setActiveTab] =useState("");
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...apigeeReportsMetadata.newObjectFields },
      apigeeReportsMetadata,
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
      const response = await apigeeActions.getPipelines(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        filterDto
      );
      const responseData1 = response?.data?.data?.[0];
      let dataCount = responseData1?.count?.[0]?.count ? responseData1?.count?.[0]?.count : 0;
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setFilterModel({ ...newFilterDto });
      if(Array.isArray(responseData1?.data)) {
        setResponseData(responseData1?.data);
        setActiveTab(responseData1?.[0]?.pipelineId);
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

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getTabContentContainer = () => {
    if(responseData.length > 0) {
      const pipeline = responseData.filter(item => {
        return item.pipelineId == activeTab;
      });
      return (
        <ApigeeReportsPipelineTable
          key={pipeline[0].pipelineId}
          pipeline={pipeline[0]}
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
        />
      );
    }
    return (
      <ApigeeReportsPipelineTable
        dashboardData={dashboardData}
        kpiConfiguration={kpiConfiguration}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <div className={"h-100"}>
        <VanitySetVerticalTabContainer
          className={"h-100"}
          title={
            <div>
              <IconBase icon={faDiagramSuccessor} className={'pr-2'}/>
              List Of Pipelines
            </div>
          }
          supportSearch={true}
          isLoading={isLoading}
          loadData={loadData}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
        >
          <PaginationContainer
            isLoading={isLoading}
            filterDto={filterModel}
            setFilterDto={setFilterModel}
            loadData={loadData}
            paginationStyle={"stackedVerticalTab"}
            topPaginationStyle={"stackedVerticalTab"}
            bodyClassName={'connected-assets-modal-body'}
          >
            {responseData && responseData.length > 0
              ? responseData?.map((data, index) => {
                return (<VanitySetVerticalTab
                  key={index}
                  tabText={data?.pipelineName}
                  tabName={data?.pipelineId}
                  handleTabClick={handleTabClick}
                  activeTab={activeTab}
                />);
              })
              : <div>No pipelines found.</div>
            }
          </PaginationContainer>
        </VanitySetVerticalTabContainer>
      </div>
    );
  };

  const getChartBody = () => {
    if(isLoading) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading</div>;
    }
    if (error) {
      return (
        <div className="mx-2" >
          <div className="max-content-width p-5 mt-5" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span className={"-5"}>There was an error loading the data: {parseError(error?.message)}. Please check logs for more details.</span>
          </div>
        </div>
      );
    }
    if(!responseData || responseData.length === 0) {
      return <div>No data found.</div>;
    }
    return (
      <>
        <VanitySetTabAndViewContainer
          className={"mb-3"}
          title={`APIGEE Report Details`}
          defaultActiveKey={responseData?.[0]?.pipelineId}
          verticalTabContainer={getVerticalTabContainer()}
          currentView={getTabContentContainer()}
        />
      </>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        dashboardData={dashboardData}
        index={index}
        setKpis={setKpis}
        isLoading={isLoading}
        showSettingsToggle={showSettingsToggle}
      />
      <ModalLogs
        header="APIGEE Reports"
        size="lg"
        jsonMessage={responseData}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

ApigeeReportsChartTab.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default ApigeeReportsChartTab;