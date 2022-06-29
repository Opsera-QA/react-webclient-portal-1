import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import GithubCommitsVerticalTabContainer from "components/insights/charts/github/pie_chart/commits_statistics/actionable_insights/GithubCommitsVerticalTabContainer";
import QuickDeployTotalComponentsActionableTable from "./QuickDeployTotalComponentsActionableTable";
import QuickDeployVerticalTabContainer from "../QuickDeployVerticalTabContainer";

function QuickDeployTotalComponentsTab({data, components, dashboardData, kpiConfiguration,icon}) {

    const getTabContentContainer = () => {
        return (
            <VanitySetTabViewContainer className={"mb-3"}>
                {components.map((item,index)=>(
                    <VanitySetTabView key={index} tabKey={item} >
                        <QuickDeployTotalComponentsActionableTable
                            data={data}
                            component={item}
                            dashboardData={dashboardData}
                            kpiConfiguration={kpiConfiguration}
                            icon={icon}
                        />
                    </VanitySetTabView>
                ))}

            </VanitySetTabViewContainer>
        );
    };


    return (
        <VanitySetTabAndViewContainer
            title={`Quick Deploy Total Components Report`}
            defaultActiveKey={components && Array.isArray(components) && components[0] && components[0]}
            verticalTabContainer={<QuickDeployVerticalTabContainer highestMergesMetric={components} />}
            currentView={getTabContentContainer()}
        />
    );

}
QuickDeployTotalComponentsTab.propTypes = {
    data: PropTypes.array,
    components: PropTypes.array,
    dashboardData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    icon: PropTypes.object
};
export default QuickDeployTotalComponentsTab;