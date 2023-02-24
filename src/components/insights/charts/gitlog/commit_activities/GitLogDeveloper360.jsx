import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import axios from "axios";
import gitlogAction from "../gitlog.action";
import GitLogDeveloper360CirclePacking from "./GitLogDeveloper360CirclePacking";


function GitLogDeveloper360({
    kpiConfiguration,
    setKpiConfiguration,
    dashboardData,
    index,
    setKpis,
 }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metricData, setMetricData] = useState({});
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
    }, []);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            let dashboardTags =
                dashboardData?.data?.filters[
                    dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
                    ]?.value;
            let dashboardOrgs =
                dashboardData?.data?.filters[
                    dashboardData?.data?.filters.findIndex(
                        (obj) => obj.type === "organizations",
                    )
                    ]?.value;
                const response = await gitlogAction.getDeveloper360(
                    getAccessToken,
                    cancelSource,
                    kpiConfiguration,
                    dashboardTags,
                    dashboardOrgs,
                );

                const metrics = response?.data?.gitLogDeveloper360?.data;
                if (
                    isMounted?.current === true && metrics?.chartData?.children?.length
                ) {
                    setMetricData(metrics);
                } else {

                    setMetricData({});
                }
        } catch (error) {
            if (isMounted?.current === true) {
                setError(error);
            }
        } finally {
            if (isMounted?.current === true) {
                setIsLoading(false);
            }
        }
    };

    const getChartBody = () => {
        if (metricData && !metricData?.chartData?.children?.length) {
            return null;
        }
        return (
            <div
                className="new-chart m-3 p-0"
                style={{ height: "450px"}}
            >
                <Col
                    md={12}
                    className={"my-2 p-0"}
                >
                    <GitLogDeveloper360CirclePacking
                        chartData={metricData}
                        kpiConfiguration={kpiConfiguration}
                    />
                </Col>
            </div>
        );
    };

    return (
        <div>
            <VanityMetricContainer
                title={"Developer 360"}
                kpiConfiguration={kpiConfiguration}
                setKpiConfiguration={setKpiConfiguration}
                chart={getChartBody()}
                loadChart={loadData}
                dashboardData={dashboardData}
                index={index}
                error={error}
                setKpis={setKpis}
                isLoading={isLoading}
                isBeta={true}
            />
        </div>
    );
}

GitLogDeveloper360.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
};

export default GitLogDeveloper360;
