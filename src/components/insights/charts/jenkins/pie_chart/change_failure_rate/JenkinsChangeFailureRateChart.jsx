import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
    defaultConfig,
    assignStandardColors,
    shortenPieChartLegend,
    failColor,
    mainColor,
    goalSuccessColor
} from "../../../charts-views";
import {Col, Row} from "react-bootstrap";
import JenkinsChangeFailureTotalRunsDataBlock from "./data_blocks/JenkinsChangeFailureTotalRunsDataBlock";
import JenkinsChangeFailureTotalFailuresDataBlock from "./data_blocks/JenkinsChangeFailureTotalFailuresDataBlock";
import JenkinsChangeFailureRateActionableOverlay from "./actionable_insights/JenkinsChangeFailureRateActionableOverlay";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import InfoDialog from "../../../../../common/status_notifications/info";
import aquasecActions from "../../../aquasec_security_insights/aquasec.action";
import jenkinsActions from "../../jenkins.action";


function JenkinsChangeFailureRateChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const toastContext = useContext(DialogToastContext);

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
            const response = await jenkinsActions.jenkinsChangeFailureRate(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                dashboardTags,
                dashboardOrgs,
            );
            let dataObject = response?.data ? response?.data?.data : [];
            assignStandardColors(dataObject);
            shortenPieChartLegend(dataObject);

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

    const onRowSelect = () => {
        toastContext.showOverlayPanel(
            <JenkinsChangeFailureRateActionableOverlay
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardData}
            />
        );
    };

    const getChartBody = () => {
        if (!Array.isArray(metrics) || metrics.length === 0) {
            return null;
        }

        const getDataBlocks = () =>{
            return (<><Row className={'pb-1 pt-3'}>
                <Col>
                    <JenkinsChangeFailureTotalRunsDataBlock
                        data={metrics?.[0]?.total}
                        //dataPoint={boomiSuccessPercentageDataPoint}
                        //lastScore={ dataBlockValues?.prevSuccessPercentage}
                        //icon={getIcon(dataBlockValues?.successPercentageTrend?.trend)}
                        //className={getIconColor(dataBlockValues?.successPercentageTrend?.trend)}
                    />
                </Col>
            </Row>
                <Row className={'pb-1 pt-3'}>
                    <Col>
                        <JenkinsChangeFailureTotalFailuresDataBlock
                            data={metrics?.[0]?.failures}
                            onSelect={onRowSelect}
                            //dataPoint={boomiFrequencyPercentageDataPoint}
                            //lastScore={ dataBlockValues?.prevDeployments}
                            //icon={getIcon(dataBlockValues?.deploymentsTrend?.trend)}
                            //className={getIconColor(dataBlockValues?.deploymentsTrend?.trend)}
                        />
                    </Col>
                </Row></>);
        };

        const getChart = () => {
            return(<Row>
                    <Col md={12} sm={12} lg={12}>
                        <div className="new-chart" style={{height: "300px"}}>
                            <div className="text-center">
                                <div className="font-inter-light-400 light-gray-text-secondary metric-block-footer-text">
                                    Change Failure Rate
                                </div>
                            </div>
                            {metrics.length == 0 ||
                            typeof metrics[0].failureRate !== "number" ? (
                                <div
                                    className="max-content-width p-5 mt-5"
                                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                >
                                    <InfoDialog message="No Data is available for this chart at this time." />
                                </div>
                            ) : (
                                <div
                                    className="circle"
                                    style={{ backgroundColor: metrics && metrics[0].failureRate > 15 ? failColor : goalSuccessColor }}
                                >
                                    {metrics && metrics[0].failureRate.toFixed(2) + "%"}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            );
        };

        return (
            <>
                <div className="new-chart m-3">
                    <Row>
                        <Col className="mt-4" md={3} sm={6} lg={5}>{getDataBlocks()}</Col>
                        <Col md={9} sm={6} lg={7}>{getChart()}</Col>
                    </Row>
                </div>
            </>
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
            />
            <ModalLogs
                header="Commits By Project"
                size="lg"
                jsonMessage={metrics}
                dataType="bar"
                show={showModal}
                setParentVisibility={setShowModal}
            />
        </div>
    );
}

JenkinsChangeFailureRateChart.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
};

export default JenkinsChangeFailureRateChart;