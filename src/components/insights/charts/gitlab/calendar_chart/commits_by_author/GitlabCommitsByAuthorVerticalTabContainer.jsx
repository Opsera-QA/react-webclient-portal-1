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
  metrics
}) {
  const toastContext = useContext(DialogToastContext);
  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearInfoOverlayPanel();
  };
  let data = metrics[0]?.data;
  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer className={"h-100"}>
        {data?.map((item) => {
          return <VanitySetVerticalTab tabName={item?.x} tabText={item?.x} />;
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
            tabKey={item?.x}
          >
            <GitlabCommitsByAuthorOverlay
              author={item?.x}
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
          defaultActiveKey={metrics && Array.isArray(metrics) && metrics[0]?.data[0]?.x && metrics[0]?.data[0]?.x}
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
