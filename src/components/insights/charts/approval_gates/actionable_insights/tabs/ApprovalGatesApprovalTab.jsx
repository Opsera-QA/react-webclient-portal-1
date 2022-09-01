import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import ApprovalGatesVerticalTabContainer from "./ApprovalGatesVerticalTabContainer";
import ApprovalGatesPiplelineDataTab from "./ApprovalGatesPiplelineDataTab";

function ApprovalGatesApprovalTab({
  listOfPipelines,
  dashboardData,
  kpiConfiguration,
  icon,
  action
}) {
  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        {listOfPipelines.map((item, index) => (
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
            />
          </VanitySetTabView>
        ))}
      </VanitySetTabViewContainer>
    );
  };

  return (
    <VanitySetTabAndViewContainer
      title={`Approval Gates - Approvals`}
      defaultActiveKey={
        listOfPipelines &&
        Array.isArray(listOfPipelines) &&
        listOfPipelines[0]?._id &&
        listOfPipelines[0]?._id
      }
      verticalTabContainer={
        <ApprovalGatesVerticalTabContainer listOfPipelines={listOfPipelines} />
      }
      currentView={getTabContentContainer()}
    />
  );
}
ApprovalGatesApprovalTab.propTypes = {
  listOfPipelines: PropTypes.array,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object,
  action: PropTypes.string
};
export default ApprovalGatesApprovalTab;
