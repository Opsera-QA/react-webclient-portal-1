import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { Col, Row } from "react-bootstrap";
import DataBlockBoxContainer from "../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../common/metrics/score/TwoLineScoreDataBlock";
import GithubConnectedAssetsHelpDocumentation
    from "../../../../common/help/documentation/insights/charts/github/GithubConnectedAssetsHelpDocumentation";

function GithubConnectedAssets({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            let dashboardTags =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
            let dashboardOrgs =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
                    ?.value;
            let dashboardFilters =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "hierarchyFilters")]
                    ?.value;        
            const response = await chartsActions.parseConfigurationAndGetChartMetrics(
                getAccessToken,
                cancelSource,
                "githubActionsConnectAssets",
                kpiConfiguration,
                dashboardTags,
                null,
                dashboardFilters,
                dashboardOrgs
            );
            let dataObject = response?.data ? response?.data?.data[0]?.connectedAssets?.data : [];

            if (isMounted?.current === true && dataObject) {
                setMetrics(dataObject);
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

    const getChartBody = () => {
        if (metrics?.repositories?.count == undefined ||metrics?.collaborators?.count == undefined || metrics?.workflows?.count == undefined) {
            return null;
        }
        return (
            <div className="new-chart m-3 p-0 all-github-actions-data-block">
            <Row>
                    <Col xl={4} lg={6} className={"mb-3"}>
                        <DataBlockBoxContainer showBorder={true}>
                            <TwoLineScoreDataBlock
                                className={"p-3"}
                                score={metrics.repositories.count}
                                subtitle={"Total Repositories"} />
                        </DataBlockBoxContainer>
                    </Col>
                    <Col xl={4} lg={6} className={"mb-3"}>
                        <DataBlockBoxContainer showBorder={true}>
                            <TwoLineScoreDataBlock
                                className={"p-3"}
                                score={metrics?.workflows.count}
                                subtitle={"Total Workflows"} />
                        </DataBlockBoxContainer>
                    </Col>
                    <Col xl={4} lg={6} className={"mb-3"}>
                        <DataBlockBoxContainer showBorder={true}>
                            <TwoLineScoreDataBlock
                                className={"p-3"}
                                score={metrics?.collaborators.count}
                                subtitle={"Total Collaborators"} />
                        </DataBlockBoxContainer>
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <div>
            <ChartContainer
                title={kpiConfiguration?.kpi_name}
                kpiConfiguration={kpiConfiguration}
                setKpiConfiguration={setKpiConfiguration}
                chart={getChartBody()}
                loadChart={loadData}
                dashboardData={dashboardData}
                index={index}
                error={error}
                setKpis={setKpis}
                isLoading={isLoading}
                chartHelpComponent={(closeHelpPanel) => <GithubConnectedAssetsHelpDocumentation closeHelpPanel={closeHelpPanel} />}
            />
        </div>
    );
}

GithubConnectedAssets.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
};

export default GithubConnectedAssets;
