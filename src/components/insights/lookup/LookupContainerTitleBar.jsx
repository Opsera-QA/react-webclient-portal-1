import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import BetaBadge from "components/common/badges/BetaBadge";
import useLocationReference from "hooks/useLocationReference";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import {faLink} from "@fortawesome/pro-light-svg-icons";

function LookupContainerTitleBar(
    {
        title,
        titleIcon,
        isLoading,
        inactive,
        titleActionBar,
        helpComponent,
        isBeta,
        inlineFilters,
    }) {
    const {
        currentUrl,
    } = useLocationReference();

    const getInactiveText = () => {
        if (inactive) {
            return (<span className="text-white-50 mx-1">{inactive && "Inactive"}</span>);
        }
    };

    const getRightSideItems = () => {
        return (
            <div className="ml-auto d-flex">
                {getInactiveText()}
                {titleActionBar}
                <div className={"my-1"}>
                    {inlineFilters}
                </div>
                <CopyToClipboardIconBase
                    className={"ml-2"}
                    copyString={currentUrl}
                    copyIcon={faLink}
                    copyText={"Copy direct link to this page."}
                    copiedText={"Copied direct link to clipboard!"}
                />
                <LaunchHelpIcon helpComponent={helpComponent} className={"ml-2"} />
                <BetaBadge
                    isBeta={isBeta}
                    className={"mr-1 ml-2 my-auto"}
                />
            </div>
        );
    };

    if (isLoading) {
        return (<span><IconBase isLoading={isLoading} className={"mr-2"}/>Loading Data</span>);
    }

    return (
        <div className="d-flex">
            <div><span><IconBase icon={titleIcon} className={"mr-2"}/>{title}</span></div>
            {getRightSideItems()}
        </div>
    );
}


LookupContainerTitleBar.propTypes = {
    inactive: PropTypes.bool,
    title: PropTypes.string,
    titleActionBar: PropTypes.object,
    titleIcon: PropTypes.object,
    isLoading: PropTypes.bool,
    helpComponent: PropTypes.object,
    isBeta: PropTypes.bool,
    inlineFilters: PropTypes.any,
};

export default LookupContainerTitleBar;