import React, {useEffect} from "react";
import { Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import useLocationReference from "hooks/useLocationReference";
import SubMenuContainer from "temp-library-components/navigation/sub_menu/SubMenuContainer";
import SubMenuItem from "temp-library-components/navigation/sub_menu/SubMenuItem";
import GitCustodianRoleHelper from "@opsera/know-your-role/roles/compliance/git_custodian/gitCustodianRole.helper";

const HEADER_NAVIGATION_SCREENS = {
  HOME: "home",
  WORKSPACE: "workspace",
  UNIFIED_INSIGHTS: "insights",
  GIT_CUSTODIAN: "gitCustodian",
};

const getActiveScreen = (currentPath) => {
  if (currentPath === "/") {
    return HEADER_NAVIGATION_SCREENS.HOME;
  }

  if (currentPath?.startsWith("/workspace")) {
    return HEADER_NAVIGATION_SCREENS.WORKSPACE;
  }

  if (currentPath?.startsWith("/unified-insights")) {
    return HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS;
  }

  if (currentPath === "/git-custodian") {
    return HEADER_NAVIGATION_SCREENS.GIT_CUSTODIAN;
  }

  return "other";
};

export default function LandingHeaderNavigationBar() {
  const history = useHistory();
  const {
    currentPath,
    isPublicPathState
  } = useLocationReference();
  const {
    themeConstants,
    userData,
  } = useComponentStateReference();

  useEffect(() => {}, [currentPath]);

  const handleScreenClick = (newScreen) => {
    switch (newScreen) {
      case HEADER_NAVIGATION_SCREENS.HOME:
        if (currentPath !== "/") {
          history.push("/");
        }
        break;
      case HEADER_NAVIGATION_SCREENS.WORKSPACE:
        if (currentPath !== "/workspace") {
          history.push("/workspace");
        }
        break;
      case HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS:
        if (currentPath !== "/unified-insights") {
          history.push("/unified-insights");
        }
        break;
      case HEADER_NAVIGATION_SCREENS.GIT_CUSTODIAN:
        if (currentPath !== "/git-custodian") {
          history.push("/git-custodian");
        }
        break;
    }
  };

  if (!userData || isPublicPathState === true) {
    return null;
  }

  return (
    <Navbar.Collapse className={"h-100 d-flex mx-2"}>
      <SubMenuContainer className={"mx-auto"}>
        <SubMenuItem
          className={"px-3"}
          itemKey={HEADER_NAVIGATION_SCREENS.HOME}
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={"Home"}
          disabled={currentPath === "/"}
        />
        <SubMenuItem
          className={"px-3"}
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={"Workspace"}
          itemKey={HEADER_NAVIGATION_SCREENS.WORKSPACE}
          disabled={currentPath?.startsWith("/workspace") === true}
        />
        <SubMenuItem
          className={"px-3"}
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={<div className={"no-wrap-inline"}><span className={"no-wrap d-none d-lg-inline-block mr-1"}>{`Unified`}</span>Insights</div>}
          itemKey={HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS}
          disabled={currentPath?.startsWith("/unified-insights") === true}
        />
        <SubMenuItem
          className={"px-3"}
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={<div>Git Custodian</div>}
          itemKey={HEADER_NAVIGATION_SCREENS.GIT_CUSTODIAN}
          disabled={currentPath?.startsWith("/git-custodian") === true}
          visible={GitCustodianRoleHelper.canViewGitCustodian(userData) === true}
        />
      </SubMenuContainer>
    </Navbar.Collapse>
  );
}

