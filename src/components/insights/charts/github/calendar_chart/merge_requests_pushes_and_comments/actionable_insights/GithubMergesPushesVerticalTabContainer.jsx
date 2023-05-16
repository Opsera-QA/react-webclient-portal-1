import React from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";

function GithubMergesPushesVerticalTabContainer({ activeTab, handleTabClick, highestMergesMetrics }) {
    return (
        <VanitySetVerticalTabContainer className={"h-100"}>
            {highestMergesMetrics.map((item, index) => {
                return (
                    <VanitySetVerticalTab
                        key={index}
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                        icon={faFileCode}
                        tabText={item}
                        tabName={item}
                    />
                );
            })}
        </VanitySetVerticalTabContainer>
    );
}

GithubMergesPushesVerticalTabContainer.propTypes = {
    highestMergesMetrics: PropTypes.array,
    handleTabClick: PropTypes.func,
    activeTab: PropTypes.string,
};
export default GithubMergesPushesVerticalTabContainer;