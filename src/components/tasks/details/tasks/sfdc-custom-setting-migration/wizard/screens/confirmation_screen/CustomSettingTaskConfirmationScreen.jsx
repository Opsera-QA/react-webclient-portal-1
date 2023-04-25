import React, { useState, useMemo, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { Button, Col, Row } from "react-bootstrap";
import IconBase from "../../../../../../../common/icons/IconBase";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS } from "../../customSettingMigrationTaskWizard.constants";
import DetailPanelContainer from "../../../../../../../common/panels/detail_panel_container/DetailPanelContainer";
import { getMigrationTypeLabel, MIGRATION_TYPES } from "../../../inputs/SalesforceCustomSettingTaskTypeSelectInput";
import customSettingMigrationTaskWizardActions from "../../customSettingMigrationTaskWizard.actions";
import { parseError } from "../../../../../../../common/helpers/error-helpers";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import TextAreaClipboardField from "../../../../../../../common/fields/clipboard/TextAreaClipboardField";
import TaskMigrationTypeField from "../../../../../../../common/fields/tasks/TaskMigrationTypeField";
import TextFieldBase from "../../../../../../../common/fields/text/TextFieldBase";
import ToolNameField from "../../../../../../../common/fields/inventory/ToolNameField";
import axios from "axios";

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
      if(taskType !== MIGRATION_TYPES.MIGRATION_FROM_CSV_TO_ORG) {
        // TODO : make a call to get count of records
      }
      if(taskType !== MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_CSV) {
        // TODO : make a call to available storage on target org
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBackButton = () => {
    setCurrentScreen(
      CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.QUERY_BUILDER_SCREEN,
    );
  };

  const triggerTask = async () => {
    try {
      setIsLoading(true);
      // await customSettingMigrationTaskWizardActions.setFilterQuery(
      //   getAccessToken,
      //   cancelTokenSource,
      //   wizardModel,
      // );
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        toastContext.showInlineErrorMessage(parsedError);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getCountOfRecords = () => {

    return (
      <><span className={"mb-0 mr-2 text-muted no-wrap-inline"}>Records (count):</span> ${} </>
    );
  };
  const getAvailableStorage = () => {

    return (
      <><span className={"mb-0 mr-2 text-muted no-wrap-inline"}>Available Storage:</span> ${} </>
    );
  };

  const getBody = () => {
    if (wizardModel == null) {
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
              <TaskMigrationTypeField
                model={wizardModel}
                fieldName={"taskType"}
              />
            </Col>
            <Col xs={6}>
              <ToolNameField
                model={wizardModel}
                fieldName={"sourceToolId"}
              />
            </Col>
            <Col xs={12}>
              <span className={"mb-0 mr-2 text-muted no-wrap-inline"}>Query:</span>
              <TextAreaClipboardField
                allowResize={false}
                rows={10}
                textAreaValue={wizardModel?.getData("filterQuery")}
              />
            </Col>
            <Col>
              {getCountOfRecords()}
              {getAvailableStorage()}
            </Col>
          </Row>
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
            disabled={isLoading}
            className="mr-2"
          >
            <IconBase
              className={"mr-2"}
              isLoading={isLoading}
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
          subheaderText={`${getMigrationTypeLabel(
            taskType,
          )} : Confirmation Screen`}
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
