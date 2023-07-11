import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useContext
} from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { Button, Col, Row } from "react-bootstrap";
import IconBase from "../../../../../../../common/icons/IconBase";
import { faArrowLeft, faCheck } from "@fortawesome/pro-solid-svg-icons";
import DetailPanelContainer from "../../../../../../../common/panels/detail_panel_container/DetailPanelContainer";
import dataSeedingTaskWizardActions from "../../dataSeedingTaskWizard.actions";
import { parseError } from "../../../../../../../common/helpers/error-helpers";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import TextAreaClipboardField from "../../../../../../../common/fields/clipboard/TextAreaClipboardField";
import TaskMigrationTypeField from "../../../../../../../common/fields/tasks/TaskMigrationTypeField";
import ToolNameField from "../../../../../../../common/fields/inventory/ToolNameField";
import axios from "axios";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import WarningMessageFieldBase from "components/common/fields/text/message/WarningMessageFieldBase";
import { DATA_SEEDING_WIZARD_SCREENS } from "../../dataSeedingTaskWizard.constants";

const CustomSettingTaskConfirmationScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  taskType,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStartig] = useState(false);
  const [recordCount, setRecordCount] = useState("");
  const [storageDetails, setStorageDetails] = useState({});

  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const storageResponse =
        await dataSeedingTaskWizardActions.getStorageDetails(
          getAccessToken,
          cancelSource,
          wizardModel,
        );
      setStorageDetails(storageResponse?.data?.message?.DataStorageMB);
      const recordCountResponse =
        await dataSeedingTaskWizardActions.getRecordCount(
          getAccessToken,
          cancelSource,
          wizardModel,
        );
      setRecordCount(recordCountResponse?.data?.message?.totalSize);
    } catch (e) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(e);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const handleBackButton = () => {
    setCurrentScreen(DATA_SEEDING_WIZARD_SCREENS.QUERY_BUILDER_SCREEN);
  };

  const triggerTask = async () => {
    try {
      setIsStartig(true);
      await dataSeedingTaskWizardActions.runDataSeedingTask(
        getAccessToken,
        cancelTokenSource,
        wizardModel,
      );
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        toastContext.showInlineErrorMessage(parsedError);
      }
    } finally {
      if (isMounted?.current === true) {
        handleClose();
        setIsStartig(false);
      }
    }
  };

  const getCountOfRecords = () => {
    return (
      <Col xs={6}>
        <span className={"mb-0 mr-2 text-muted no-wrap-inline"}>
          Records (count):
        </span>{" "}
        {recordCount}{" "}
      </Col>
    );
  };
  const getAvailableStorage = () => {
    return (
      <Col xs={6}>
        <span className={"mb-0 mr-2 text-muted no-wrap-inline"}>
          Available Storage in Target Org:
        </span>{" "}
        {storageDetails?.Remaining} of {storageDetails?.Max} (in MB){" "}
      </Col>
    );
  };

  const getBody = () => {
    if (wizardModel == null || isLoading) {
      return (
        <CenterLoadingIndicator
          minHeight={"500px"}
          message={`Loading`}
        />
      );
    }
    return (
      <div>
        <div className={"m-2"}>
          <Row>
            <Col xs={6}>
              <ToolNameField
                model={wizardModel}
                fieldName={"sourceToolId"}
                loadToolInNewWindow={true}
              />
            </Col>
            <Col xs={6}>
              <ToolNameField
                model={wizardModel}
                fieldName={"targetToolId"}
                loadToolInNewWindow={true}
              />
            </Col>
            <Col xs={12}>
              <span className={"mb-0 mr-2 text-muted no-wrap-inline"}>
                Query:
              </span>
              <TextAreaClipboardField
                allowResize={false}
                rows={10}
                textAreaValue={wizardModel?.getData("filterQuery")}
              />
            </Col>
            {getCountOfRecords()}
            {getAvailableStorage()}
          </Row>

          <MessageFieldBase
            className={"mt-3"}
            message={
              "Upon completion of the task execution, a file will be generated and made available for download in the task activity report section."
            }
          />

          {recordCount < 1 ? (
            <WarningMessageFieldBase
              className={"mt-3"}
              message={
                "Our system has not identified any records according to the parameters specified in your query. Please review and update your query criteria and try again."
              }
            />
          ) : null}
        </div>
        <SaveButtonContainer>
          <Button
            variant="secondary"
            size="sm"
            className="mr-2"
            onClick={() => {
              handleBackButton();
            }}
          >
            <IconBase
              icon={faArrowLeft}
              fixedWidth
              className="mr-2"
            />
            Back
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={triggerTask}
            disabled={isStarting || recordCount < 1}
            className="mr-2"
          >
            <IconBase
              className={"mr-2"}
              isLoading={isStarting}
              icon={faCheck}
            />
            Proceed
          </Button>
          <CancelButton
            showUnsavedChangesMessage={false}
            cancelFunction={handleClose}
            size={"sm"}
          />
        </SaveButtonContainer>
      </div>
    );
  };

  return (
    <DetailPanelContainer>
      <Row className="mx-2">
        <H5FieldSubHeader
          subheaderText={`Data Seeding Task : Confirmation Screen`}
        />
      </Row>
      <div className={"my-3"}>{getBody()}</div>
    </DetailPanelContainer>
  );
};

CustomSettingTaskConfirmationScreen.propTypes = {
  taskType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default CustomSettingTaskConfirmationScreen;
