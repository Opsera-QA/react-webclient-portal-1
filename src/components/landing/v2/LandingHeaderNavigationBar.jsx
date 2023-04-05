import React, {useEffect} from "react";
import { Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import useLocationReference from "hooks/useLocationReference";
import SubMenuContainer from "temp-library-components/navigation/sub_menu/SubMenuContainer";
import SubMenuItem from "temp-library-components/navigation/sub_menu/SubMenuItem";

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
          itemKey={HEADER_NAVIGATION_SCREENS.HOME}
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={"Home"}
          disabled={currentPath === "/"}
        />
        <SubMenuItem
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={"Workspace"}
          itemKey={HEADER_NAVIGATION_SCREENS.WORKSPACE}
          disabled={currentPath?.startsWith("/workspace") === true}
        />
        <SubMenuItem
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={<div className={"no-wrap-inline"}><span className={"no-wrap d-none d-lg-inline-block mr-1"}>{`Unified`}</span>Insights</div>}
          itemKey={HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS}
          disabled={currentPath?.startsWith("/unified-insights") === true}
        />
        <SubMenuItem
          activeKey={getActiveScreen(currentPath)}
          setActiveKey={handleScreenClick}
          label={<div>Git Custodian</div>}
          itemKey={HEADER_NAVIGATION_SCREENS.GIT_CUSTODIAN}
          disabled={currentPath?.startsWith("/git-custodian") === true}
        />
      </SubMenuContainer>
      {/*<HeaderNavigationBarItem*/}
      {/*  currentScreen={currentPath === "/" ? HEADER_NAVIGATION_SCREENS.HOME : undefined}*/}
      {/*  setCurrentScreen={handleScreenClick}*/}
      {/*  screenLabel={"Home"}*/}
      {/*  screenName={HEADER_NAVIGATION_SCREENS.HOME}*/}
      {/*  fontColor={themeConstants.COLOR_PALETTE.WHITE}*/}
      {/*  disableMousePointer={currentPath === "/"}*/}
      {/*/>*/}
      {/*<HeaderNavigationBarItem*/}
      {/*  currentScreen={currentPath?.startsWith("/workspace") ? HEADER_NAVIGATION_SCREENS.WORKSPACE : undefined}*/}
      {/*  setCurrentScreen={handleScreenClick}*/}
      {/*  screenLabel={"Workspace"}*/}
      {/*  screenName={"workspace"}*/}
      {/*  fontColor={themeConstants.COLOR_PALETTE.WHITE}*/}
      {/*  disableMousePointer={currentPath?.startsWith("/workspace") === true}*/}
      {/*/>*/}
      {/*<HeaderNavigationBarItem*/}
      {/*  className={"no-wrap d-none d-lg-inline"}*/}
      {/*  currentScreen={currentPath?.startsWith("/unified-insights") ? HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS : undefined}*/}
      {/*  setCurrentScreen={handleScreenClick}*/}
      {/*  screenLabel={"Unified Insights"}*/}
      {/*  screenName={"insights"}*/}
      {/*  fontColor={themeConstants.COLOR_PALETTE.WHITE}*/}
      {/*  disableMousePointer={currentPath?.startsWith("/unified-insights") === true}*/}
      {/*/>*/}
      {/*<HeaderNavigationBarItem*/}
      {/*  className={"d-inline d-lg-none"}*/}
      {/*  currentScreen={currentPath?.startsWith("/unified-insights") ? HEADER_NAVIGATION_SCREENS.UNIFIED_INSIGHTS : undefined}*/}
      {/*  setCurrentScreen={handleScreenClick}*/}
      {/*  screenLabel={"Insights"}*/}
      {/*  screenName={"insights"}*/}
      {/*  fontColor={themeConstants.COLOR_PALETTE.WHITE}*/}
      {/*  disableMousePointer={currentPath?.startsWith("/unified-insights") === true}*/}
      {/*/>*/}
    </Navbar.Collapse>
  );
}

