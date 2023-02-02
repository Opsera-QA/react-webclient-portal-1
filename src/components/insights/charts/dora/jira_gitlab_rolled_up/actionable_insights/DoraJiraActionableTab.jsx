import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import { hasStringValue } from "components/common/helpers/string-helpers";
import DoraJiraActionableVerticalTabContainer from "./DoraJiraActionableVerticalTabContainer";
import DoraJiraDashboardActionableOverlay from "./DoraJiraDashboardActionableOverlay";

function DoraJiraActionableTab({ orgs, dashboardData, kpiConfiguration, icon }) {
    const [activeTab, setActiveTab] = useState(undefined);

    useEffect(() => {
        if (Array.isArray(orgs) && orgs.length > 0) {
            setActiveTab(`0`);
        }
    }, [orgs]);

    const getCurrentView = () => {
        if (hasStringValue(activeTab) === true) {
            const org = orgs[activeTab];

            if (org) {
                return (
                    <DoraJiraDashboardActionableOverlay
                        org={org}
                        dashboardData={dashboardData}
                        kpiConfiguration={kpiConfiguration}
                        activeTab={activeTab}
                    />
                );
            }
        }
    };

    const getVerticalTabContainer = () => {
        return (
            <DoraJiraActionableVerticalTabContainer
                highestMergesMetrics={orgs}
                activeTab={activeTab}
                handleTabClick={setActiveTab}
            />
        );
    };

    return (
        <VanitySetTabAndViewContainer
            title={`Dora Organization Tags Actionable Report`}
            verticalTabContainer={getVerticalTabContainer()}
            currentView={getCurrentView()}
            tabColumnSize={3}
        />
    );
}

DoraJiraActionableTab.propTypes = {
    orgs: PropTypes.array,
    dashboardData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    icon: PropTypes.object,
};

export default DoraJiraActionableTab;