import React, {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import LoadingIcon from "../../../../common/icons/LoadingIcon";
import VanitySetTabAndViewContainer from "../../../../common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetVerticalTabContainer from "../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import ConnectedAssetsPipelinesRecentTable from "./ConnectedAssetsPipelinesRecentTable";
import ConnectedAssetsPipelinesInactiveTable from "./ConnectedAssetsPipelinesInactiveTable";
import ConnectedAssetsPipelinesDeletedTable from "./ConnectedAssetsPipelinesDeletedTable";

const CONNECTED_ASSETS_PIPELINES_TABS = {
  RECENT: "recent",
  INACTIVE: "inactive",
  DELETED: "deleted",
};

function ConnectedAssetsPipelinesTabContainer({ dashboardData }) {
  const [currentTab, setCurrentTab] = useState(CONNECTED_ASSETS_PIPELINES_TABS.RECENT);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const getBody = () => {
    if(isLoading) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading</div>;
    }

    return (
      <>
        <VanitySetTabAndViewContainer
          className={"mb-3"}
          title={`List of Pipelines`}
          defaultActiveKey={'recent'}
          verticalTabContainer={getVerticalTabContainer()}
          currentView={getTabContentContainer()}
        />
      </>
    );
  };

  const getTabContentContainer = () => {
    switch (currentTab) {
      case CONNECTED_ASSETS_PIPELINES_TABS.RECENT:
        return (
          <ConnectedAssetsPipelinesRecentTable
            dashboardData={dashboardData}
          />
        );
      case CONNECTED_ASSETS_PIPELINES_TABS.DELETED:
        return (
          <ConnectedAssetsPipelinesDeletedTable
            dashboardData={dashboardData}
          />
        );
      case CONNECTED_ASSETS_PIPELINES_TABS.INACTIVE:
        return (
          <ConnectedAssetsPipelinesInactiveTable
            dashboardData={dashboardData}
          />
        );
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <div className={"h-100"}>
        <VanitySetVerticalTabContainer
          className={"h-100"}
          supportSearch={false}
        >
            <VanitySetVerticalTab
              tabText={'Recent'}
              tabName={'recent'}
              activeTab={currentTab}
              handleTabClick={setCurrentTab}
            />
            <VanitySetVerticalTab
              tabText={'Inactive'}
              tabName={'inactive'}
              activeTab={currentTab}
              handleTabClick={setCurrentTab}
            />
            <VanitySetVerticalTab
              tabText={'Deleted'}
              tabName={'deleted'}
              activeTab={currentTab}
              handleTabClick={setCurrentTab}
            />
        </VanitySetVerticalTabContainer>
      </div>
    );
  };

  return <div className={"p-3"}>{getBody()}</div>;
}

ConnectedAssetsPipelinesTabContainer.propTypes = {
  dashboardData: PropTypes.object,
};

export default ConnectedAssetsPipelinesTabContainer;
