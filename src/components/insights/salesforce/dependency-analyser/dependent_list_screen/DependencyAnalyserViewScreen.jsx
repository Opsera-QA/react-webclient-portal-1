import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Model from "core/data_model/model";
import sfdcComponentFilterMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import { Button } from "react-bootstrap";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import { parseError } from "components/common/helpers/error-helpers";
import IconBase from "components/common/icons/IconBase";
import sfdcDependencyAnalyserActions from "../sfdc-dependency-analyser-actions";
import { DEPENDENCY_ANALYSER_SCREENS } from "../DependencyAnalyser";
import DependencyAnalyserDependentFilesTable from "./DependencyAnalyserDependentFilesTable";

const DependencyAnalyserViewScreen = ({
  pipelineWizardModel,
  setPipelineWizardModel,
  setPipelineWizardScreen,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [sfdcWarningMessage, setSfdcWarningMessage] = useState("");
  const [sfdcFilterDto, setSfdcFilterDto] = useState(
    new Model(
      { ...sfdcComponentFilterMetadata.newObjectFields },
      sfdcComponentFilterMetadata,
      false,
    ),
  );
  const [sfdcDependentFilesList, setSfdcDependentFilesList] = useState([]);
  const [filePullCompleted, setFilePullCompleted] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [totalFileCount, setTotalFileCount] = useState(0);
  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    const newSfdcFilterDto = new Model(
      { ...sfdcComponentFilterMetadata.newObjectFields },
      sfdcComponentFilterMetadata,
      false,
    );
    setSfdcFilterDto({ ...newSfdcFilterDto });
    loadData(newSfdcFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
      stopPolling();
    };
  }, [JSON.stringify(pipelineWizardModel.getData("sfdcDependencyFileRuleList"))]);

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach((timerId) => clearTimeout(timerId));
    }
  };

  const loadData = async (
    newFilterDto = sfdcFilterDto,
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      setSfdcWarningMessage("");
      await sfdcPolling(cancelSource, newFilterDto);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDependentFilesList = async (
    cancelSource = cancelTokenSource,
    newFilterDto = sfdcFilterDto,
  ) => {
    const response = await sfdcDependencyAnalyserActions.getDependentList(
      getAccessToken,
      cancelSource,
      pipelineWizardModel,
      newFilterDto,
    );
    const data = response?.data;

    if (isMounted?.current === true && data) {
      const files = data.data;

      if (data?.error) {
        const parsedError = parseError(data?.error);
        toastContext.showInlineErrorMessage(
          `Service Error Fetching File List : ${parsedError}`,
        );
      }

      if (data.warning) {
        setSfdcWarningMessage(data.warning);
      }

      if (Array.isArray(files)) {
        let newSfdcFilterDto = { ...newFilterDto };
        newSfdcFilterDto.setData("totalCount", data.count);
        newSfdcFilterDto.setData(
          "activeFilters",
          newFilterDto.getActiveFilters(),
        );
        setTotalFileCount(data.count);
        setSfdcFilterDto({ ...newSfdcFilterDto });
        setPipelineWizardModel({ ...pipelineWizardModel });
        setSfdcDependentFilesList(files);
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return data?.data;
  };

  const sfdcPolling = async (
    cancelSource = cancelTokenSource,
    newFilterDto = sfdcFilterDto,
    count = 1,
  ) => {
    if (isMounted?.current !== true) {
      return;
    }

    const dependentFileList = await getDependentFilesList(cancelSource, newFilterDto);

    if (
      !Array.isArray(dependentFileList) &&
      count <= 5 &&
      filePullCompleted === false
    ) {
      await new Promise((resolve) => timerIds.push(setTimeout(resolve, 15000)));
      return await sfdcPolling(cancelSource, newFilterDto, count + 1);
    }
  };

  return (
    <div>
      <DependencyAnalyserDependentFilesTable
        sfdcFiles={sfdcDependentFilesList}
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardScreen={setPipelineWizardScreen}
        isLoading={isLoading}
        loadData={loadData}
        sfdcFilesPaginationModel={sfdcFilterDto}
        setSfdcFilesPaginationModel={setSfdcFilterDto}
        filePullCompleted={filePullCompleted}
        setPipelineWizardModel={setPipelineWizardModel}
      />
      <InlineWarning
        warningMessage={sfdcWarningMessage}
        className="pl-3"
      />
      <SaveButtonContainer>
        <Button
          variant="secondary"
          size="sm"
          className="mr-2"
          onClick={() => {
            if(pipelineWizardModel?.getData("fromFileUpload") === true) {
              setPipelineWizardScreen(DEPENDENCY_ANALYSER_SCREENS.INITIALIZATION_SCREEN);
              return;
            }
            setPipelineWizardScreen(
              DEPENDENCY_ANALYSER_SCREENS.MODIFIED_FILE_LIST_VIEWER,
            );
          }}
        >
          <IconBase
            icon={faArrowLeft}
            className={"mr-1"}
          />
          Back
        </Button>
      </SaveButtonContainer>
    </div>
  );
};

DependencyAnalyserViewScreen.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
};

export default DependencyAnalyserViewScreen;
