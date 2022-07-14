import React, {useEffect, useState, useRef, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../../../../../contexts/AuthContext";
import Model from "../../../../../../core/data_model/model";
import LoadingIcon from "../../../../../common/icons/LoadingIcon";
import VanitySetTabAndViewContainer from "../../../../../common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetVerticalTab from "../../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "../../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import IconBase from "../../../../../common/icons/IconBase";
import connectedAssetsActions from "../../../connectedAssets.actions";
import connectedAssetsMetadata from "../../../connectedAssets-metadata";
import ConnectedAssetsBranchesPipelinesTable from "./ConnectedAssetsBranchesPipelinesTable";
import PaginationContainer from "../../../../../common/pagination/PaginationContainer";
import { CONNECTED_ASSETS_CONSTANTS as constants } from "../../../connecetdAssets.constants";
import {parseError} from "../../../../../common/helpers/error-helpers";

function ConnectedAssetsBranchesPipelinesTab({ dashboardData }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [responseData, setResponseData] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(new Model({ ...connectedAssetsMetadata.newObjectFields }, connectedAssetsMetadata, false));
  const [activeTab,setActiveTab] =useState("");

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
      const response = await connectedAssetsActions.getListOfRepositories(
        getAccessToken,
        cancelSource,
        constants.BRANCHES_LIST.REPOSITORIES_LIST_FROM_PIPELINES,
        dateRange?.startDate,
        dateRange?.endDate,
        filterDto
      );
      const responseData1 = response?.data?.data?.listOfRepositoriesFromPipelines?.data?.[0];
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", responseData1?.count?.[0]?.count ? responseData1?.count?.[0]?.count : 0);
      setTableFilterDto(newFilterDto);
      setData(responseData1);
      if(Array.isArray(responseData1?.data)) {
        setResponseData(responseData1?.data);
        setActiveTab(responseData1?.data?.[0]?._id);
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

  const getBody = () => {
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
    if(!data || data.length === 0) {
      return <div>No data found.</div>;
    }
    return (
      <>
        <VanitySetTabAndViewContainer
          className={"mb-3"}
          title={`List of Branches from Pipelines`}
          verticalTabContainer={getVerticalTabContainer()}
          currentView={getTabContentContainer()}
        />
      </>
    );
  };

  const getTabContentContainer = () => {
    if(responseData.length > 0) {
      const repo = responseData.filter(item => {
        return item._id == activeTab;
      });
      return (
        <ConnectedAssetsBranchesPipelinesTable
          key={repo[0]._id}
          repository={repo[0]}
          dashboardData={dashboardData}
        />
      );
    }
    return (
      <ConnectedAssetsBranchesPipelinesTable
        dashboardData={dashboardData}
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
              <IconBase icon={faDatabase} className={'pr-2'}/>
              List Of Repositories
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
              {responseData && responseData.length > 0
                ? responseData?.map((data, index) => {
                  return (<VanitySetVerticalTab
                    key={index}
                    tabText={data?.repository_name}
                    tabName={data?._id}
                    handleTabClick={handleTabClick}
                    activeTab={activeTab}
                  />);
                })
                : <div>No repositories found.</div>
              }
            </PaginationContainer>
          </VanitySetVerticalTabContainer>
      </div>
    );
  };

  return <div className={"p-3"}>{getBody()}</div>;
}

ConnectedAssetsBranchesPipelinesTab.propTypes = {
  dashboardData: PropTypes.object,
};

export default ConnectedAssetsBranchesPipelinesTab;
