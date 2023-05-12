import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import GithubMergeRequestsPushesCommentsActionableTableOverlay
    from "./GithubMergeRequestsPushesCommentsActionableTableOverlay";
import VanitySetTabViewContainer from "../../../../../../common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "../../../../../../common/tabs/vertical_tabs/VanitySetTabView";
import GithubCommitsVerticalTabContainer
    from "../../../pie_chart/commits_statistics/actionable_insights/GithubCommitsVerticalTabContainer";
import QuickDeployVerticalTabContainer from "../../../../quick-deploy-statistics/QuickDeployVerticalTabContainer";
import GithubMergesPushesVerticalTabContainer from "./GithubMergesPushesVerticalTabContainer";

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
            setActiveTab(highestMergesMetric[0]);
        }
    }, [highestMergesMetric]);

    const getTabContentContainer = () => {
        return (
            <VanitySetTabViewContainer>
                {highestMergesMetric.map((item, index) => (
                    <VanitySetTabView
                        key={index}
                        tabKey={item}
                    >
                        <GithubMergeRequestsPushesCommentsActionableTableOverlay
                            projectName={item}
                            dashboardData={dashboardData}
                            kpiConfiguration={kpiConfiguration}
                            icon={icon}
                            date={date}
                        />
                    </VanitySetTabView>
                ))}
            </VanitySetTabViewContainer>
        );
    };
    return (
        <VanitySetTabAndViewContainer
            title={`Github Event Name`}
            currentView={getTabContentContainer()}
            verticalTabContainer={
                <GithubMergesPushesVerticalTabContainer
                    highestMergesMetrics={highestMergesMetric}
                    activeTab={activeTab}
                    handleTabClick={setActiveTab}
                />
            }
            maximumHeight={"h-200"}
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
