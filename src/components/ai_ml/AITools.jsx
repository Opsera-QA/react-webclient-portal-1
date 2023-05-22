import React, { useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AdminToolsPageLinkCards from "components/admin/AdminToolsPageLinkCards";
import FreeTrialAdminToolsPageLinkCards from "components/admin/FreeTrialAdminToolsPageLinkCards";
import useComponentStateReference from "hooks/useComponentStateReference";
import AIToolsSubNavigationBar from "./AIToolsSubNavigationBar";
import AIToolsHelpDocumentation from "../common/help/documentation/ai_ml/AIToolsHelpDocumentaiton";

function AITools() {
    const {
        accessRoleData,
        toastContext,
        isOpseraAdministrator,
    } = useComponentStateReference();

    useEffect(() => {}, []);

    const getHelpComponent = () => {
        return (<AIToolsHelpDocumentation />);
    };

    if (isOpseraAdministrator !== true) {
        return null;
    }

    return (
        <ScreenContainer
            breadcrumbDestination={"ai"}
            pageDescription={"Opsera ML Engine"}
            helpComponent={getHelpComponent()}
            navigationTabContainer={<AIToolsSubNavigationBar activeTab={"aiTools"} />}
        >
`            {/*<AdminToolsPageLinkCards*/}
            {/*    accessRoleData={accessRoleData}*/}
            {/*/>`*/}
            <FreeTrialAdminToolsPageLinkCards />
        </ScreenContainer>
    );
}

export default AITools;
