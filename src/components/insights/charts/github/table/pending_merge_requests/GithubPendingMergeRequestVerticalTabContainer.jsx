import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import IconBase from "../../../../../common/icons/IconBase";
import {faDatabase} from "@fortawesome/free-solid-svg-icons";
import PaginationContainer from "../../../../../common/pagination/PaginationContainer";
import chartsActions from "../../../charts-actions";
import {AuthContext} from "../../../../../../contexts/AuthContext";
import Model from "../../../../../../core/data_model/model";
import axios from "axios";
import githubPendingMergeRequestsMetadata from "./github-pending-merge-requests-metadata";

function GithubPendingMergeRequestVerticalTabContainer ({ handleTabClick, dashboardData, kpiConfiguration, activeTab }) {
    const [responseData, setResponseData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [error, setError] = useState(undefined);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const { getAccessToken } = useContext(AuthContext);
    const [tableFilterDto, setTableFilterDto] = useState(new Model({ ...githubPendingMergeRequestsMetadata.newObjectFields }, githubPendingMergeRequestsMetadata, false));

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
    const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
        try {
            setIsLoading(true);
            let dashboardTags =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
            let dashboardOrgs =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
                    ?.value;
            const response = await chartsActions.getGithubListOfRepositories(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                dashboardTags,
                dashboardOrgs,
                filterDto,
            );
            let dataObject = response?.data?.data?.githubListOfRepositories?.data;

            if (isMounted?.current === true && dataObject) {
                setResponseData(dataObject);
                let newFilterDto = filterDto;
                newFilterDto.setData("totalCount", response?.data?.data?.githubListOfRepositories?.count);
                setTableFilterDto({ ...newFilterDto });
                await handleTabClick(dataObject[0]?._id);
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

    const tabs = [];
    if(responseData && responseData.length){
        for(let i = 0; i <= responseData.length - 1; i++) {
            tabs.push(
                <VanitySetVerticalTab
                    key = {i}
                    tabText={responseData[i]?._id}
                    tabName={responseData[i]?._id}
                    handleTabClick={handleTabClick}
                    activeTab={activeTab}
                />
            );
        }
    }

    return (
        <div>
            <VanitySetVerticalTabContainer
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
                    scrollOnLoad={false}
                >
                    {tabs}
                </PaginationContainer>
            </VanitySetVerticalTabContainer>
        </div>
    );
}
GithubPendingMergeRequestVerticalTabContainer.propTypes = {
    handleTabClick: PropTypes.func,
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    setKpiConfiguration: PropTypes.func,
    activeTab: PropTypes.string,

};
export default GithubPendingMergeRequestVerticalTabContainer;
