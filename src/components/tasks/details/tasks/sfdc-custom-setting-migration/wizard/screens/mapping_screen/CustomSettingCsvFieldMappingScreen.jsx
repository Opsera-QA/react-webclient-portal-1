import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { Button, Row } from "react-bootstrap";
import IconBase from "../../../../../../../common/icons/IconBase";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import { CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS } from "../../customSettingMigrationTaskWizard.constants";
import {
  getMigrationTypeLabel,
  MIGRATION_TYPES,
} from "../../../inputs/SalesforceCustomSettingTaskTypeSelectInput";
import customSettingMigrationTaskWizardActions from "../../customSettingMigrationTaskWizard.actions";
import { parseError } from "../../../../../../../common/helpers/error-helpers";
import useAxiosCancelToken from "../../../../../../../../hooks/useAxiosCancelToken";
import axios from "axios";
import Col from "react-bootstrap/Col";
import SelectInputBase from "../../../../../../../common/inputs/select/SelectInputBase";
import Model from "../../../../../../../../core/data_model/model";
import { customSettingMappingMetadata } from "./customSettingMapping.metadata";
import { hasStringValue } from "../../../../../../../common/helpers/string-helpers";

const CustomSettingCsvFieldMappingScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  taskType,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [filePullCompleted, setFilePullCompleted] = useState(false);
  const [fieldsPropertiesList, setFieldsPropertiesList] = useState([]);
  const [localMappedData, setLocalMappedData] = useState(
    new Model({}, customSettingMappingMetadata, false),
  );
  const [mappedData, setMappedData] = useState([]);

  const { cancelTokenSource } = useAxiosCancelToken();
  const isMounted = useRef(false);
  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    isMounted.current = true;
    setFieldsPropertiesList([]);

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
      stopPolling();
    };
  }, []);

  // useEffect(() => {
  //   let newDataObject = {...wizardModel};
  //   newDataObject.setData("fieldMapping", mappedData);
  //   setWizardModel({...newDataObject});
  // }, [mappedData]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await handleFieldPropertiesListPolling(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const handleFieldPropertiesListPolling = async (
    cancelSource = cancelTokenSource,
    count = 1,
  ) => {
    if (isMounted?.current !== true) {
      return;
    }

    const newFileList = await getFieldPropertiesList(cancelSource);

    if (
      !Array.isArray(newFileList) &&
      count <= 5 &&
      filePullCompleted === false
    ) {
      await new Promise((resolve) => timerIds.push(setTimeout(resolve, 15000)));
      return await handleFieldPropertiesListPolling(cancelSource, count + 1);
    }
  };

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach((timerId) => clearTimeout(timerId));
    }
  };

  const getFieldPropertiesList = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    const response =
      await customSettingMigrationTaskWizardActions.pullFieldList(
        getAccessToken,
        cancelSource,
        wizardModel,
      );
    const errorMessage = response?.data?.data?.errorMessage;
    const fieldList = response?.data?.data?.fieldList;

    if (isMounted?.current === true) {
      if (errorMessage) {
        const parsedError = parseError(errorMessage);
        toastContext.showInlineErrorMessage(
          `Service Error Fetching Fields: ${parsedError}`,
        );
      }

      if (Array.isArray(fieldList)) {
        let mappedResult = fieldList.map((field) => ({
          targetField: field.name,
          sourceField: "",
          nillable: field.nillable,
          type: field.type,
          unique: field.unique,
        }));
        // console.log(mappedResult);

        let currentMappingData = wizardModel?.getData("fieldMapping");
        let mappedItems =
          Array.isArray(currentMappingData) && currentMappingData.length > 0
            ? currentMappingData
            : mappedResult;
        setMappedData([...mappedItems]);
        setFieldsPropertiesList(fieldList);

        let newDataObject = { ...wizardModel };
        newDataObject.setData("selectedFieldList", fieldList);
        setWizardModel({ ...newDataObject });

        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return fieldList;
  };

  const handleBackButton = () => {
    // setCurrentScreen(CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.UPLOAD_SCREEN);
    setCurrentScreen(
      CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.CONFIGURATION_SCREEN,
    );
  };

  const saveAndMoveToNextScreen = async () => {
    try {
      setIsSaving(true);
      wizardModel.setData("queryFilters", []);
      wizardModel.setData("fieldMapping", mappedData);
      wizardModel.setData("filterQuery", "");

      let finalSelectedFields = fieldsPropertiesList.filter((field) => {
        return mappedData.some(
          (obj) =>
            obj.targetField === field.name && hasStringValue(obj.sourceField),
        );
      });

      let newDataObject = { ...wizardModel };
      newDataObject.setData("selectedFieldList", finalSelectedFields);

      const query = `SELECT ${finalSelectedFields
        ?.map((ele) => ele.name)
        .join(", ")} FROM ${
        wizardModel?.getData("selectedCustomSetting")?.componentName
      }`;

      // console.log(query);
      newDataObject.setData("filterQuery", query);
      setWizardModel({ ...newDataObject });

      await customSettingMigrationTaskWizardActions.updateSelectedFields(
        getAccessToken,
        null,
        wizardModel,
        finalSelectedFields,
      );
      await customSettingMigrationTaskWizardActions.setFieldMappings(
        getAccessToken,
        null,
        wizardModel,
      );
      const response =
        await customSettingMigrationTaskWizardActions.validateQuery(
          getAccessToken,
          null,
          wizardModel,
          query,
        );
      if (response?.status === 200) {
        await customSettingMigrationTaskWizardActions.setFilterQuery(
          getAccessToken,
          null,
          wizardModel,
          query,
          [],
        );
        setCurrentScreen(
          CUSTOM_SETTING_MIGRATION_WIZARD_SCREENS.CONFIRMATION_SCREEN,
        );
      }
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        toastContext.showInlineErrorMessage(parsedError);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  const setCsvFieldData = (selectedOption, index) => {
    setMappedData((prevMappings) => {
      const newMapping = [...prevMappings];
      newMapping[index].sourceField = selectedOption;
      return newMapping;
    });
  };

  const validateMappingData = () => {
    if (isSaving || mappedData.length < 1) return false;
    return mappedData
      .filter((item) => !item.nillable)
      .every((item) => item["sourceField"].length > 1);
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
      <div
        className={"filter-container container-border mt-3"}
        style={{
          minHeight: "calc(100vh - 500px)",
        }}
      >
        <div className="d-flex justify-content-center page-description mt-3">
          <Col sm={12}>
            <Row>
              <Col
                sm={6}
                className={"pl-2 pr-0 py-2"}
              >
                <h6 className="text-muted ml-4">Custom Object Fields</h6>
              </Col>
              <Col
                sm={6}
                className={"pl-2 pr-0 py-2"}
              >
                <h6 className="text-muted">CSV Fields</h6>
              </Col>
            </Row>
          </Col>
        </div>
        <div className={"m-3"}>
          {mappedData && mappedData.length > 1 ? (
            mappedData.map((field, index, { length }) => {
              return (
                <Row
                  className="d-flex mx-1 justify-content-between mt-2"
                  key={index}
                >
                  <Col
                    sm={12}
                    className={"px-0"}
                  >
                    <Row className={"mx-0"}>
                      <Col
                        xs={6}
                        className={"pr-1 mt-3 pl-0"}
                      >
                        <Row className={"mx-0"}>
                          <Col
                            lg={6}
                            xl={6}
                            className={"no-wrap-inline mb-1"}
                          >
                            <span style={{ fontWeight: 500 }}>
                              {field?.targetField}
                            </span>
                          </Col>
                          <Col
                            lg={6}
                            xl={6}
                            className={"d-flex mb-1 mt-1 justify-content-end"}
                          >
                            <div
                              className={"badge badge-secondary mr-2"}
                              style={{
                                fontSize: "10px",
                                letterSpacing: "0.6px",
                              }}
                            >
                              {field?.type?.toUpperCase()}
                            </div>
                            {field?.unique ? (
                              <div
                                className={"badge badge-secondary mr-2"}
                                style={{
                                  fontSize: "10px",
                                  letterSpacing: "0.6px",
                                }}
                              >
                                UNIQUE
                              </div>
                            ) : null}
                            {!field?.nillable ? (
                              <div
                                className={"badge badge-danger mr-2"}
                                style={{
                                  fontSize: "10px",
                                  letterSpacing: "0.6px",
                                }}
                              >
                                MANDATORY
                              </div>
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        xs={6}
                        className={"pr-1 pl-0"}
                      >
                        <SelectInputBase
                          selectOptions={wizardModel?.getData("csvFields")}
                          fieldName={"sourceField"}
                          defaultValue={field.sourceField}
                          dataObject={localMappedData}
                          setDataObject={setLocalMappedData}
                          setDataFunction={(field, newValue) =>
                            setCsvFieldData(newValue, index)
                          }
                          showLabel={false}
                          dropUp={
                            length > 6 && index + 1 > Math.floor(length / 2)
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            })
          ) : (
            <div className={"ml-3"}>No Fields Found!</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={"my-3"}>
        <Row className="mx-1">
          <H5FieldSubHeader
            subheaderText={`${getMigrationTypeLabel(
              wizardModel?.getData("taskType"),
            )} : Custom Setting Field Mapping Screen`}
          />
        </Row>
        {getBody()}
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
          className={"mr-2"}
          size="sm"
          variant="primary"
          onClick={saveAndMoveToNextScreen}
          disabled={!validateMappingData()}
        >
          <span>
            <IconBase
              icon={faArrowRight}
              fixedWidth
              isLoading={isSaving}
              className="mr-2"
            />
            {isSaving ? "Saving" : "Save and Proceed"}
          </span>
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

CustomSettingCsvFieldMappingScreen.propTypes = {
  taskType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default CustomSettingCsvFieldMappingScreen;
