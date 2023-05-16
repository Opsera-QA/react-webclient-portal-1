import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import GithubMergeRequestsPushesCommentsActionableTableOverlay
    from "./GithubMergeRequestsPushesCommentsActionableTableOverlay";
import VanitySetTabViewContainer from "../../../../../../common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "../../../../../../common/tabs/vertical_tabs/VanitySetTabView";
import GithubMergesPushesVerticalTabContainer from "./GithubMergesPushesVerticalTabContainer";

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

    if(highestMergesMetric.length > 0) {
        return (
            <VanitySetTabAndViewContainer
                title={`Github Event Name`}
                currentView={getTabContentContainer()}
                defaultActiveKey={
                    highestMergesMetric &&
                    Array.isArray(highestMergesMetric) &&
                    highestMergesMetric[0] &&
                    highestMergesMetric[0]
                }
                verticalTabContainer={
                    <GithubMergesPushesVerticalTabContainer
                        highestMergesMetrics={highestMergesMetric}
                    />
                }
                maximumHeight={"h-200"}
            />
        );
    }
    else {
        return null;
    }
}
GithubMergeRequestsPushesCommentsVerticalTabContainer.propTypes = {
    highestMergesMetric: PropTypes.array,
    dashboardData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    icon: PropTypes.object,
    date : PropTypes.string,

};
export default GithubMergeRequestsPushesCommentsVerticalTabContainer;