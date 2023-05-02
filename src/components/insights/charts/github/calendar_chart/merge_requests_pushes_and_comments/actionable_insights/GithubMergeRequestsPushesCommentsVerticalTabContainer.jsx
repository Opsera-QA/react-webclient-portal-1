import React from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import GithubMergeRequestsPushesCommentsActionableTableOverlay
    from "./GithubMergeRequestsPushesCommentsActionableTableOverlay";

function GithubMergeRequestsPushesCommentsVerticalTabContainer({
                                                     highestMergesMetric,
                                                     dashboardData,
                                                     kpiConfiguration,
                                                     icon,
                                                    startDate,
                                                    endDate
                                                 }) {
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
                            startDate={startDate}
                            endDate={endDate}
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
                highestMergesMetric
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
    startDate : PropTypes.string,
    endDate : PropTypes.string,

};
export default GithubMergeRequestsPushesCommentsVerticalTabContainer;
