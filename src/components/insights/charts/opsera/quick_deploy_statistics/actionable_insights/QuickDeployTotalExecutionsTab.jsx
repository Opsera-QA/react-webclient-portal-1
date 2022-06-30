import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import QuickDeployVerticalTabContainer from "../QuickDeployVerticalTabContainer";
import {hasStringValue} from "../../../../../common/helpers/string-helpers";
import QuickDeployTotalComponentsActionableTable from "./QuickDeployTotalComponentsActionableTable";
import QuickDeployTotalExecutionsActionableTable from "./QuickDeployTotalExecutionsActionableTable";

function QuickDeployTotalExecutionsTab({ data, tasks, dashboardData, kpiConfiguration, icon }) {

    const [activeTab, setActiveTab] = useState(undefined);

    useEffect(() => {
        if (Array.isArray(tasks) && tasks.length > 0) {
            setActiveTab(`0`);
        }
    }, [tasks]);

    const getCurrentView = () => {
        if (hasStringValue(activeTab) === true) {
            const component = tasks[activeTab];

            if (component) {
                return (
                    <QuickDeployTotalExecutionsActionableTable
                        data={data}
                        component={component}
                        dashboardData={dashboardData}
                        kpiConfiguration={kpiConfiguration}
                        icon={icon}
                        className={"m-2"}
                    />
                );
            }
        }
    };

    const getVerticalTabContainer = () => {
        return (
            <QuickDeployVerticalTabContainer
                highestMergesMetrics={tasks}
                activeTab={activeTab}
                handleTabClick={setActiveTab}
            />
        );
    };

    return (
        <VanitySetTabAndViewContainer
            title={`Quick Deploy Total Executions Report`}
            verticalTabContainer={getVerticalTabContainer()}
            currentView={getCurrentView()}
            tabColumnSize={3}
        />
    );
}

QuickDeployTotalExecutionsTab.propTypes = {
    data: PropTypes.array,
    tasks: PropTypes.array,
    dashboardData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    icon: PropTypes.object,
};

export default QuickDeployTotalExecutionsTab;