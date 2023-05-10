import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import GithubMergeRequestsPushesCommentsActionableTableOverlay
    from "./GithubMergeRequestsPushesCommentsActionableTableOverlay";
import QuickDeployVerticalTabContainer from "../../../../quick-deploy-statistics/QuickDeployVerticalTabContainer";
import {hasStringValue} from "../../../../../../common/helpers/string-helpers";

function GithubMergeRequestsPushesCommentsVerticalTabContainer({
                                                     highestMergesMetric,
                                                     dashboardData,
                                                     kpiConfiguration,
                                                     icon,
                                                    date,
                                                 }) {
    const [activeTab, setActiveTab] = useState(undefined);

    useEffect(() => {
        if (Array.isArray(highestMergesMetric) && highestMergesMetric.length > 0) {
            setActiveTab(`0`);
        }
    }, [highestMergesMetric]);

    const getCurrentView = () => {
        if (hasStringValue(activeTab) === true) {
            const component = highestMergesMetric[activeTab];

            if (component) {
                return (
                    <GithubMergeRequestsPushesCommentsActionableTableOverlay
                        projectName={component}
                        dashboardData={dashboardData}
                        kpiConfiguration={kpiConfiguration}
                        icon={icon}
                        date={date}
                    />
                );
            }
        }
    };

    const getVerticalTabContainer = () => {
        return (
            <QuickDeployVerticalTabContainer
                highestMergesMetrics={highestMergesMetric}
                activeTab={activeTab}
                handleTabClick={setActiveTab}
            />
        );
    };

    return (
        <VanitySetTabAndViewContainer
            title={`Github Event Names`}
            verticalTabContainer={getVerticalTabContainer()}
            currentView={getCurrentView()}
            tabColumnSize={3}
        />
    );
}
GithubMergeRequestsPushesCommentsVerticalTabContainer.propTypes = {
    highestMergesMetric: PropTypes.array,
    dashboardData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    icon: PropTypes.object,
    date : PropTypes.string,

};
export default GithubMergeRequestsPushesCommentsVerticalTabContainer;
