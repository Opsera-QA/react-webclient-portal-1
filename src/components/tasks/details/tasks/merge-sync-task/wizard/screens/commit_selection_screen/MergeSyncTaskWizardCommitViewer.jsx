import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import LoadingDialog from "components/common/status_notifications/loading";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import {
  comparisonFileMetadata
} from "components/tasks/details/tasks/merge-sync-task/wizard/screens/commit_selection_screen/comparisonFile.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import CodeFieldBase from "components/common/fields/code/CodeFieldBase";
import { CODE_THEME_TYPES } from "components/common/inputs/code/CodeInput";

const MergeSyncTaskWizardCommitViewer = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  diffFile,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonFileModel, setComparisonFileModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setComparisonFileModel(undefined);

    if (hasStringValue(diffFile?.committedFile)) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [diffFile]);

  const loadData = async (
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      await getDiffFileList(cancelSource);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDiffFileList = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response = await mergeSyncTaskWizardActions.retrieveSelectedFileContent(
      getAccessToken,
      cancelSource,
      wizardModel?.getData("taskId"),
      wizardModel?.getData("runCount"),
      diffFile?.committedFile,
    );
    const newFileMetadata = response?.data?.message;

    if (isMounted?.current === true && newFileMetadata) {
      const comparisonFileModel = modelHelpers.parseObjectIntoModel(newFileMetadata, comparisonFileMetadata);
      setComparisonFileModel(comparisonFileModel);
    }
  };

  if (isLoading === true) {
    return (<LoadingDialog size={"sm"} message={"Loading Selected File Changes"} />);
  }

  return (
    <div className={"m-3"}>
      <Row>
        <Col xs={12}>
          <TextFieldBase
            dataObject={comparisonFileModel}
            fieldName={"fullName"}
          />
        </Col>
        <Col xs={12} md={6}>
          <CodeFieldBase
            fieldName={"sourceContent"}
            model={comparisonFileModel}
            isLoading={isLoading}
            theme={CODE_THEME_TYPES.DARK}
          />
        </Col>
        <Col xs={12} md={6}>
          <CodeFieldBase
            fieldName={"destinationContent"}
            model={comparisonFileModel}
            isLoading={isLoading}
            theme={CODE_THEME_TYPES.DARK}
          />
        </Col>
      </Row>
    </div>
  );
};

MergeSyncTaskWizardCommitViewer.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  diffFile: PropTypes.object,
};

export default MergeSyncTaskWizardCommitViewer;