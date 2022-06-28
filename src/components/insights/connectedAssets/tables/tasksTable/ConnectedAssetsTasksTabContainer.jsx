import React, {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import LoadingIcon from "../../../../common/icons/LoadingIcon";
import VanitySetTabAndViewContainer from "../../../../common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "../../../../common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "../../../../common/tabs/vertical_tabs/VanitySetTabView";
import VanitySetVerticalTabContainer from "../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import ConnectedAssetsTasksRecentTable from "./ConnectedAssetsTasksRecentTable";
import ConnectedAssetsTasksInactiveTable from "./ConnectedAssetsTasksInactiveTable";
import ConnectedAssetsTasksDeletedTable from "./ConnectedAssetsTasksDeletedTable";

function ConnectedAssetsTasksTabContainer({ dashboardData }) {
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
          title={`List of Tasks`}
          defaultActiveKey={'recent'}
          verticalTabContainer={getVerticalTabContainer()}
          currentView={getTabContentContainer()}
        />
      </>
    );
  };

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        <VanitySetTabView key={'recent'} tabKey={'recent'}>
          <ConnectedAssetsTasksRecentTable
            dashboardData={dashboardData}
          />
        </VanitySetTabView>
        <VanitySetTabView key={'inactive'} tabKey={'inactive'}>
          <ConnectedAssetsTasksInactiveTable
            dashboardData={dashboardData}
          />
        </VanitySetTabView>
        <VanitySetTabView key={'deleted'} tabKey={'deleted'}>
          <ConnectedAssetsTasksDeletedTable
            dashboardData={dashboardData}
          />
        </VanitySetTabView>
      </VanitySetTabViewContainer>
    );
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
          />
          <VanitySetVerticalTab
            tabText={'Inactive'}
            tabName={'inactive'}
          />
          <VanitySetVerticalTab
            tabText={'Deleted'}
            tabName={'deleted'}
          />
        </VanitySetVerticalTabContainer>
      </div>
    );
  };

  return <div className={"p-3"}>{getBody()}</div>;
}

ConnectedAssetsTasksTabContainer.propTypes = {
  dashboardData: PropTypes.object,
};

export default ConnectedAssetsTasksTabContainer;
