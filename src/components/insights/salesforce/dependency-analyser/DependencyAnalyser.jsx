import React, {useState, useEffect} from "react";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import useComponentStateReference from "../../../../hooks/useComponentStateReference";
import ScreenContainer from "../../../common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DependencyAnalyser() {
  const [isLoading, setIsLoading] = useState(false);
  const {isMounted, cancelTokenSource, toastContext, getAccessToken} =
    useComponentStateReference();

  useEffect(() => {
    loadModel().catch(() => {});
  }, []);

  const loadModel = async () => {

  };

  return (
    <ScreenContainer
      navigationTabContainer={
        <InsightsSubNavigationBar currentTab={"dependencyAnalyser"} />
      }
      breadcrumbDestination={"dependencyAnalyser"}
    >
      <div className={"m-4"}>
        Dependency Analyser
      </div>
    </ScreenContainer>
  );
}


export default DependencyAnalyser;