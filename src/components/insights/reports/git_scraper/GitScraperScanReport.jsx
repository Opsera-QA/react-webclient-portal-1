import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import chartsActions from "components/insights/charts/charts-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import PropTypes from "prop-types";
import gitScrapperPipelineFilterMetadata from "../../charts/gitscrapper/git-scrapper-pipeline-filter-metadata";
import GitScraperScanReportTable from "./GitScraperScanReportTable";

function GitScraperScanReport({ kpiConfiguration, dashboardData }) {
    const { repository, branch } = useParams();
    const history = useHistory();
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [allCoverityIssues, setAllCoverityIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    // const [filterModel, setFilterModel] = useState(
    //     new Model(
    //         { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
    //         actionableInsightsGenericChartFilterMetadata,
    //         false
    //     )
    // );
    const [tableFilterDto, setTableFilterDto] = useState(
        new Model({ ...gitScrapperPipelineFilterMetadata.newObjectFields }, gitScrapperPipelineFilterMetadata, false)
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

    const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
        try {
            setIsLoading(true);
            let dashboardTags =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
            let dashboardOrgs =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
                    ?.value;

            const response = await chartsActions.getGitScraperIssuesActionableInsights(
                kpiConfiguration,
                getAccessToken,
                cancelSource,
                dashboardTags,
                dashboardOrgs,
                null,
                repository,
                branch
            );
            console.log("response", response);

            const dataBlocks = response?.data && response?.status === 200 ?
                response?.data?.data?.data : [];

            if (isMounted?.current === true && dataBlocks) {
                setMetrics(dataBlocks[0].data);
                let newFilterDto = filterDto;
                newFilterDto.setData(
                    "totalCount",
                    dataBlocks[0].count[0].count
                );
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

    return (
        <ScreenContainer
            navigationTabContainer={<InsightsSubNavigationBar currentTab={"reportsViewer"} />}
            pageDescription={`Downloadable Report for Git Scraper`}
            breadcrumbDestination={"gitscraperReports"}
        >
            <GitScraperScanReportTable
                data={metrics}
                allCoverityIssues={allCoverityIssues}
                isLoading={isLoading}
                loadData={loadData}
                filterDto={tableFilterDto}
                setFilterDto={setTableFilterDto}
                repository={repository}
                branch={branch}
            />
        </ScreenContainer>
    );
}

GitScraperScanReport.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default GitScraperScanReport;