import React, {useEffect, useState, useRef, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../../../../../contexts/AuthContext";
import Model from "../../../../../../core/data_model/model";
import LoadingIcon from "../../../../../common/icons/LoadingIcon";
import VanitySetTabAndViewContainer from "../../../../../common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetVerticalTab from "../../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "../../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabView from "../../../../../common/tabs/vertical_tabs/VanitySetTabView";
import VanitySetTabViewContainer from "../../../../../common/tabs/vertical_tabs/VanitySetTabViewContainer";
import IconBase from "../../../../../common/icons/IconBase";
import connectedAssetsActions from "../../../connectedAssets.actions";
import connectedAssetsMetadata from "../../../connectedAssets-metadata";
import ConnectedAssetsRepositoriesPipelinesTable from "./ConnectedAssetsCollaboratorsTasksTable";
import PaginationContainer from "../../../../../common/pagination/PaginationContainer";
import { CONNECTED_ASSETS_CONSTANTS as constants } from "../../../connecetdAssets.constants";

function ConnectedAssetsCollaboratorsTasksTab({ dashboardData }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [responseData, setResponseData] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(new Model({ ...connectedAssetsMetadata.newObjectFields }, connectedAssetsMetadata, false));

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

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dateRange = dashboardData?.getData("date");
      const response = await connectedAssetsActions.getUsersInfo(
        getAccessToken,
        cancelSource,
        constants.COLLABORATORS_LIST.LIST_OF_USERS,
        dateRange?.startDate,
        dateRange?.endDate,
        filterDto
      );
      const responseData1 = response?.data?.data?.usersList?.data?.[0];
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", responseData1?.count?.[0]?.count ? responseData1?.count?.[0]?.count : 0);
      setTableFilterDto(newFilterDto);
      setData(responseData1);
      if(Array.isArray(responseData1?.data)) {
        setResponseData(responseData1?.data);
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

  const getBody = () => {
    if(isLoading) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading</div>;
    }
    if(!data || data.length === 0) {
      return <div>No data found.</div>;
    }
    return (
      <>
        <VanitySetTabAndViewContainer
          className={"mb-3"}
          title={`List of Users from Tasks`}
          defaultActiveKey={responseData?.[0]?._id}
          verticalTabContainer={getVerticalTabContainer()}
          currentView={getTabContentContainer()}
        />
      </>
    );
  };

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        {responseData.map((item, index) => (
          <VanitySetTabView key={index} tabKey={item._id}>
            <ConnectedAssetsRepositoriesPipelinesTable
              user={item}
              dashboardData={dashboardData}
            />
          </VanitySetTabView>
        ))}
      </VanitySetTabViewContainer>
    );
  };

  const getVerticalTabContainer = () => {
    if(!responseData || responseData.length === 0) {
      return (<div className={"h-100"}>
        <VanitySetVerticalTabContainer className={"h-100"} title={<div><IconBase icon={faUsers} className={'pr-2'}/>List Of Users</div>}>
          <div>No users found.</div>
        </VanitySetVerticalTabContainer>
      </div>);
    }
    const tabs = [];
    for(let i = 0; i <= responseData.length - 1; i++) {
      tabs.push(
        <VanitySetVerticalTab
          tabText={responseData[i]?.email}
          tabName={responseData[i]?._id}
        />
      );
    }
    return (
      <div className={"h-100"}>
        <VanitySetVerticalTabContainer
          className={"h-100"}
          title={
            <div>
              <IconBase icon={faUsers} className={'pr-2'}/>
              List Of Users
            </div>
          }
          supportSearch={true}
          isLoading={isLoading}
          filterModel={tableFilterDto}
          setFilterModel={setTableFilterDto}
          loadData={loadData}
        >
          <PaginationContainer
            isLoading={isLoading}
            filterDto={tableFilterDto}
            setFilterDto={setTableFilterDto}
            loadData={loadData}
            paginationStyle={"stackedVerticalTab"}
            topPaginationStyle={"stackedVerticalTab"}
            bodyClassName={'connected-assets-modal-body'}
          >
            {tabs}
          </PaginationContainer>
        </VanitySetVerticalTabContainer>
      </div>
    );
  };

  return <div className={"p-3"}>{getBody()}</div>;
}

ConnectedAssetsCollaboratorsTasksTab.propTypes = {
  dashboardData: PropTypes.object,
};

export default ConnectedAssetsCollaboratorsTasksTab;
