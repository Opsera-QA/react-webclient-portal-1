import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faMicrochipAi} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function AIMLSidebarNavigationLink({ isSidebarCollapsed, }) {
    const {
        isOpseraAdministrator,
    } = useComponentStateReference();

    if (isOpseraAdministrator !== true) {
        return null;
    }

    return (
        <SidebarNavigationLinkBase
            link={`/ai`}
            label={"AI Tools (Beta)"}
            icon={faMicrochipAi}
            isSidebarCollapsed={isSidebarCollapsed}
        />
    );
}

AIMLSidebarNavigationLink.propTypes = {
    isSidebarCollapsed: PropTypes.bool,
};
