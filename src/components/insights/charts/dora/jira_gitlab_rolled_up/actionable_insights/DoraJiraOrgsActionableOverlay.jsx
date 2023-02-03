import React, { useEffect, useContext, useState, useRef } from "react";
import PropTypes from "prop-types";
import { faExternalLink, faTable } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import DoraJiraActionableTab from "./DoraJiraActionableTab";
import TabPanelContainer from "../../../../../common/panels/general/TabPanelContainer";

function DoraJiraOrgsActionableOverlay({ kpiConfiguration, dashboardData, data }) {
    const [activeTab, setActiveTab] = useState("main");
    const toastContext = useContext(DialogToastContext);
    const noDataMessage = "No data for Dora actionable insights report is currently unavailable.";
    const newData = [];
    data.forEach((obj) => {newData.push(obj.name);});

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    const getBody = () => {
        if (data.length > 0) {
            if (activeTab == "main") {
                return (
                    <DoraJiraActionableTab
                        orgs={newData}
                        dashboardData={dashboardData}
                        kpiConfiguration={kpiConfiguration}
                    />
                );
            }
        }
        else{
            return noDataMessage;
        }

    };

    const handleTabClick = (tabSelection) => (e) => {
        e.preventDefault();
        setActiveTab(tabSelection);
    };


    return (
        <FullScreenCenterOverlayContainer
            closePanel={closePanel}
            showPanel={true}
            titleText={"Dora Organization Tags Actionable Insights"}
            showToasts={true}
            titleIcon={faTable}
            // isLoading={isLoading}
            linkTooltipText={"View Full Blueprint"}
        >
            <div className={"p-3"}>
                <TabPanelContainer currentView={getBody()} />
            </div>
        </FullScreenCenterOverlayContainer>
    );
}

DoraJiraOrgsActionableOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    data: PropTypes.array
};

export default DoraJiraOrgsActionableOverlay;
