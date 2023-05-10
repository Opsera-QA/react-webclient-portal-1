import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import GithubCommitsVerticalTabContainer
    from "../../../pie_chart/commits_statistics/actionable_insights/GithubCommitsVerticalTabContainer";
import GithubMergeRequestsPushesCommentsActionableTableOverlay
    from "./GithubMergeRequestsPushesCommentsActionableTableOverlay";

function GithubMergeRequestsPushesCommentsVerticalTabContainer({
                                                     highestMergesMetric,
                                                     dashboardData,
                                                     kpiConfiguration,
                                                     icon,
                                                    date,
                                                 }) {
    const getTabContentContainer = () => {
        return (
            <VanitySetTabViewContainer>
                {highestMergesMetric.map((item, index) => (
                    <VanitySetTabView
                        key={index}
                        tabKey={item.id}
                    >
                        <GithubMergeRequestsPushesCommentsActionableTableOverlay
                            projectName={item.id}
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
            defaultActiveKey={
                highestMergesMetric &&
                Array.isArray(highestMergesMetric) &&
                highestMergesMetric[0]?.id &&
                highestMergesMetric[0]?.id
            }
            verticalTabContainer={
                <GithubCommitsVerticalTabContainer
                    highestMergesMetric={highestMergesMetric}
                />
            }
            currentView={getTabContentContainer()}
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
