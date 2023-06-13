import React, {useState, useEffect} from "react";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import useComponentStateReference from "../../../../hooks/useComponentStateReference";
import ScreenContainer from "../../../common/panels/general/ScreenContainer";
import Model from "../../../../core/data_model/model";
import DependencyAnalyserInitializationScreen from "./initialization_screen/DependencyAnalyserInitializationScreen";
import ErrorDialog from "../../../common/status_notifications/error";
import sfdcDataAnalyserMetadata from "./sfdc-dependency-analyser-metadata";
import DependencyAnalyserComponentSelectionScreen
  from "./component_selection_screen/DependencyAnalyserComponentSelectionScreen";
import DependencyAnalyserFileValidationScreen from "./file_validation_screen/DependencyAnalyserFileValidationScreen";
import DependencyAnalyserModifiedFileViewer from "./file_viewer_screen/DependencyAnalyserModifiedFileViewer";

export const DEPENDENCY_ANALYSER_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  COMPONENT_SELECTOR: "COMPONENT_SELECTOR",
  MODIFIED_FILE_LIST_VIEWER: "MODIFIED_FILE_LIST_VIEWER",
  DEPENDENCY_VIEWER: "STANDARD_DEPENDENCY_VIEWER",
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
    let newModel = new Model(sfdcDataAnalyserMetadata.newObjectFields, sfdcDataAnalyserMetadata, false);
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
        return (
          <DependencyAnalyserComponentSelectionScreen
            pipelineWizardModel={dependencyAnalyserModel}
            setPipelineWizardModel={setDependencyAnalyserModel}
            setPipelineWizardScreen={setScreen}
            setError={setError}
          />
        );
      case DEPENDENCY_ANALYSER_SCREENS.VALIDATED_FILE_VIEWER:
        return (
          <DependencyAnalyserFileValidationScreen
            pipelineWizardModel={dependencyAnalyserModel}
            setPipelineWizardModel={setDependencyAnalyserModel}
            setPipelineWizardScreen={setScreen}
            setError={setError}
          />
        );
      case DEPENDENCY_ANALYSER_SCREENS.MODIFIED_FILE_LIST_VIEWER:
        return (
          <DependencyAnalyserModifiedFileViewer
            pipelineWizardModel={dependencyAnalyserModel}
            setPipelineWizardModel={setDependencyAnalyserModel}
            setPipelineWizardScreen={setScreen}
            setError={setError}
          />
        );
      case DEPENDENCY_ANALYSER_SCREENS.DEPENDENCY_VIEWER:
        return (<>DEPENDENCY_VIEWER Screen</>);
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