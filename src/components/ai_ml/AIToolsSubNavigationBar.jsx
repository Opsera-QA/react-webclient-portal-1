import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function AIToolsSubNavigationBar({activeTab}) {
    const history = useHistory();

    const handleTabClick = (tabSelection) => e => {
        e.preventDefault();

        switch (tabSelection) {
            case "aiTools":
                history.push(`/ai`);
                return;
        }
    };

    return (
        <NavigationTabContainer>
            <NavigationTab
                icon={faTools}
                tabName={"aiTools"}
                handleTabClick={handleTabClick}
                activeTab={activeTab}
                tabText={"AI Tools"}
            />
        </NavigationTabContainer>
    );
}

AIToolsSubNavigationBar.propTypes = {
    activeTab: PropTypes.string,
};

export default AIToolsSubNavigationBar;
