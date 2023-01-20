import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import QuickDeployTotalComponentsActionableTable from "./QuickDeployTotalComponentsActionableTable";
import QuickDeployVerticalTabContainer from "../QuickDeployVerticalTabContainer";
import { hasStringValue } from "components/common/helpers/string-helpers";

function QuickDeployTotalComponentsTab({ data, components, dashboardData, kpiConfiguration, icon }) {
    const [activeTab, setActiveTab] = useState(undefined);

    useEffect(() => {
        if (Array.isArray(components) && components.length > 0) {
            setActiveTab(`0`);
        }
    }, [components]);

    const getCurrentView = () => {
        if (hasStringValue(activeTab) === true) {
            const component = components[activeTab];

            if (component) {
                return (
                    <QuickDeployTotalComponentsActionableTable
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
                highestMergesMetrics={components}
                activeTab={activeTab}
                handleTabClick={setActiveTab}
            />
        );
    };

    return (
        <VanitySetTabAndViewContainer
            title={`Quick Deploy Total Components Report`}
            verticalTabContainer={getVerticalTabContainer()}
            currentView={getCurrentView()}
            tabColumnSize={3}
        />
    );
}

QuickDeployTotalComponentsTab.propTypes = {
    data: PropTypes.array,
    components: PropTypes.array,
    dashboardData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    icon: PropTypes.object,
};

export default QuickDeployTotalComponentsTab;
