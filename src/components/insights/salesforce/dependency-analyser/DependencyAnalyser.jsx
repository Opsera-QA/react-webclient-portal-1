import React, {useState, useEffect} from "react";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import useComponentStateReference from "../../../../hooks/useComponentStateReference";
import ScreenContainer from "../../../common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "../../../../core/data_model/model";
import sfdcPipelineWizardMetadata from "../../../workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-wizard-metadata";
import DependencyAnalyserInitializationScreen from "./initialization_screen/DependencyAnalyserInitializationScreen";
import ErrorDialog from "../../../common/status_notifications/error";

export const DEPENDENCY_ANALYSER_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  COMPONENT_SELECTOR: "COMPONENT_SELECTOR",
  DEPENDENCY_SELECTOR: "STANDARD_FILE_SELECTOR",
  VALIDATED_FILE_VIEWER: "VALIDATED_FILE_VIEWER",
};

function DependencyAnalyser() {
  const [error, setError] = useState("");
  const [screen, setScreen] = useState(DEPENDENCY_ANALYSER_SCREENS.INITIALIZATION_SCREEN);
  const [dependencyAnalyserModel, setDependencyAnalyserModel] = useState(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const {isMounted, cancelTokenSource, toastContext, getAccessToken} =
    useComponentStateReference();

  useEffect(() => {
    loadModel().catch(() => {});
  }, []);

  const loadModel = async () => {
    let newModel = new Model(sfdcPipelineWizardMetadata.newObjectFields, sfdcPipelineWizardMetadata, false);
    newModel.setData("fromDate", new Date(new Date().setHours(0,0,0,0)));
    newModel.setData("toDate", new Date());
    newModel.setData("selectedComponentTypes", []);
    setDependencyAnalyserModel({...newModel});
  };

  if (error && error !== "") {
    return (
      <div className="mt-5">
        <ErrorDialog error={error} />
      </div>
    );
  }

  const getBody = () => {
    switch (screen) {
      case DEPENDENCY_ANALYSER_SCREENS.INITIALIZATION_SCREEN:
        return (
          <DependencyAnalyserInitializationScreen
            pipelineWizardModel={dependencyAnalyserModel}
            setPipelineWizardModel={setDependencyAnalyserModel}
            setPipelineWizardScreen={setScreen}
            setError={setError}
        />
        );
      case DEPENDENCY_ANALYSER_SCREENS.COMPONENT_SELECTOR:
        return (<>COMPONENT_SELECTOR Screen</>);
      case DEPENDENCY_ANALYSER_SCREENS.DEPENDENCY_SELECTOR:
        return (<>DEPENDENCY_SELECTOR Screen</>);
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={
        <InsightsSubNavigationBar currentTab={"dependencyAnalyser"} />
      }
      breadcrumbDestination={"dependencyAnalyser"}
    >
      <div className={"m-4"}>
        {getBody()}
      </div>
    </ScreenContainer>
  );
}


export default DependencyAnalyser;