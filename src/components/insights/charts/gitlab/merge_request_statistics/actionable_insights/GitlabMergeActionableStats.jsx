import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import "components/analytics/charts/charts.css";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext.js";
import { metricHelpers } from "components/insights/metric.helpers";
import gitlabAction from "../../gitlab.action";
function GitlabMergeActionableStats({ kpiConfiguration, dashboardData}) {
    const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [error, setError] = useState(undefined);
    const [totalTime, setTotalTime] = useState("");
    const [repo, setRepo] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [dataBlockValues, setDataBlockValues] = useState([]);
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
            let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(
                dashboardData?.data?.filters,
            );
            let dashboardTags = dashboardMetricFilter?.tags;
            let dashboardOrgs = dashboardMetricFilter?.organizations;

            const response = await gitlabAction.getStatsMergeActionable(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                dashboardTags,
                dashboardOrgs,
            );

            const metrics = response?.data?.data;
            if (isMounted?.current === true && metrics) {
                setTotalTime(metrics[0]?.totalTime[0]?.totalTime);
                setRepo(metrics[0]?.mostbyRepo[0]?.RepoName);
                setName(metrics[0]?.mostbyReviewer[0]?.UserName);
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
        if (
            !name || !repo || !totalTime) {
            return null;
        }
        return (
            <div className={"d-flex details-title-text"}>
                <div className={'mr-4'}>
                    <b>Total Overall Time Taken (days):</b> {totalTime}
                </div>
                <div className={'mr-4'}>
                    <b>Most Time Consuming Repo:</b> {repo}
                </div>
                <div className={'mr-4'}>
                    <b>Most Time Taken By Reviewer:</b> {name}
                </div>
            </div>
        );
    };

    return (
        <div>
            {getChartBody()}
        </div>
    );
}

GitlabMergeActionableStats.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default GitlabMergeActionableStats;
