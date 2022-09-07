import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import ApprovalGatesVerticalTabContainer from "./ApprovalGatesVerticalTabContainer";
import ApprovalGatesPiplelineDataTab from "./ApprovalGatesPiplelineDataTab";
import approvalGatesChartsActions from "../../metrics/ApprovalGatesMetric.action";
import Model from "core/data_model/model";
import approvalGatesPipelinesMetadata from "./approval-gates-pipelines-metadata";

const ApprovalGatesRejectTab= ({
  dashboardData,
  kpiConfiguration,
  icon,
  action,
  onRowSelect
}) => {

  const { getAccessToken } = useContext(AuthContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [listOfPipelines, setListOfPipelines] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [tableFilterDto, setTableFilterDto] = useState(new Model({ ...approvalGatesPipelinesMetadata.newObjectFields }, approvalGatesPipelinesMetadata, false));



  const loadData = async (
    cancelSource = cancelTokenSource,
    filterDto = tableFilterDto
  ) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
        ]?.value;

      const response = await approvalGatesChartsActions.approvalGatesPipeline(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        dashboardOrgs,
        filterDto,
        action
      );

      let dataObject = response?.data?.data ? response?.data?.data?.data : [];
      if (isMounted?.current === true && dataObject) {
        setListOfPipelines(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.data?.count);
        setTableFilterDto({ ...newFilterDto });
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
  
  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        {listOfPipelines?.map((item, index) => (
          <VanitySetTabView
            key={index}
            tabKey={item._id}
          >
            <ApprovalGatesPiplelineDataTab
              pipeline_id={item._id}
              dashboardData={dashboardData}
              kpiConfiguration={kpiConfiguration}
              icon={icon}
              action={action}
              onRowSelect={onRowSelect}
            />
          </VanitySetTabView>
        ))}
      </VanitySetTabViewContainer>
    );
  };

  if(!listOfPipelines) return null;

  return (
    <VanitySetTabAndViewContainer
      title={`Approval Gates - Reject`}
      defaultActiveKey={
        listOfPipelines &&
        Array.isArray(listOfPipelines) &&
        listOfPipelines[0]?._id &&
        listOfPipelines[0]?._id
      }
      verticalTabContainer={
        <ApprovalGatesVerticalTabContainer listOfPipelines={listOfPipelines} isLoading={isLoading} tableFilterDto={tableFilterDto} setTableFilterDto={setTableFilterDto} loadData={loadData} />        
      }
      currentView={getTabContentContainer()}
    />
  );
};

ApprovalGatesRejectTab.propTypes = {
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object,
  action: PropTypes.string,
  onRowSelect: PropTypes.func,
};
export default ApprovalGatesRejectTab;
