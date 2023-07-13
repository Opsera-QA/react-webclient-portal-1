import React, { useContext } from "react";
import PropTypes from "prop-types";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import GitlabCommitsByAuthorOverlay from "./GitlabCommitsByAuthorOverlay";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { DialogToastContext } from "contexts/DialogToastContext";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";

function GitlabCommitsByAuthorVerticalTabContainer({
  kpiConfiguration,
  dashboardData,
  metrics,
}) {
  const toastContext = useContext(DialogToastContext);
  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearInfoOverlayPanel();
  };
  let data = [];
  for (let i = 0; i < metrics[0]?.data?.length; i++) {
    data[i] = metrics[0]?.data[i].x;
  }
  data.sort();
  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer className={"h-100"}>
        {data?.map((item) => {
          return (
            <VanitySetVerticalTab
              tabName={item}
              tabText={item}
            />
          );
        })}
      </VanitySetVerticalTabContainer>
    );
  };
  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        {data?.map((item, index) => (
          <VanitySetTabView
            key={index}
            tabKey={item}
          >
            <GitlabCommitsByAuthorOverlay
              author={item}
              dashboardData={dashboardData}
              kpiConfiguration={kpiConfiguration}
            />
          </VanitySetTabView>
        ))}
      </VanitySetTabViewContainer>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"Gitlab Total Commits By Author"}
      showToasts={true}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        <TabAndViewContainer
          verticalTabContainer={getVerticalTabContainer(metrics)}
          currentView={getTabContentContainer()}
          defaultActiveKey={
            metrics && Array.isArray(metrics) && data[0] && data[0]
          }
          overflowYContainerStyle={"hidden"}
          overflowYBodyStyle="auto"
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}
GitlabCommitsByAuthorVerticalTabContainer.propTypes = {
  metrics: PropTypes.array,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
};
export default GitlabCommitsByAuthorVerticalTabContainer;
