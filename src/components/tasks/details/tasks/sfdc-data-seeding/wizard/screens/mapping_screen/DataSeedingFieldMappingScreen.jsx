import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import {
  Button,
  Row,
} from "react-bootstrap";
import IconBase from "../../../../../../../common/icons/IconBase";
import {
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import dataSeedingTaskWizardActions from "../../dataSeedingTaskWizard.actions";
import { parseError } from "../../../../../../../common/helpers/error-helpers";
import useAxiosCancelToken from "../../../../../../../../hooks/useAxiosCancelToken";
import axios from "axios";
import Model from "../../../../../../../../core/data_model/model";
import { hasStringValue } from "../../../../../../../common/helpers/string-helpers";
import { DATA_SEEDING_WIZARD_SCREENS } from "../../dataSeedingTaskWizard.constants";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { faChevronUp, faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import Col from "react-bootstrap/Col";
import DataSeedingFieldSelectionBaseEditorPanel from "./DataSeedingFieldSelectionBaseEditorPanel";

const DataSeedingFieldMappingScreen = ({
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
    const response = await dataSeedingTaskWizardActions.pullFieldList(
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
        let selectedFieldList = wizardModel?.getData("selectedFieldList");
        setFieldsPropertiesList(selectedFieldList && selectedFieldList.length > 0 ? selectedFieldList : fieldList);
        // let newDataObject = { ...wizardModel };
        // newDataObject.setData("selectedFieldList", selectedFieldList);
        // setWizardModel({ ...newDataObject });
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return fieldList;
  };

  const handleBackButton = () => {
    setCurrentScreen(DATA_SEEDING_WIZARD_SCREENS.CONFIGURATION_SCREEN);
  };

  const saveAndMoveToNextScreen = async () => {
    try {
      setIsSaving(true);
      wizardModel.setData("queryFilters", []);
      wizardModel.setData("filterQuery", "");

      // TODO : Get Filterable Field List and save it to filteredFieldList

      const formattedFieldList = fieldsPropertiesList.reduce((list, item) => {
        list[item.name] = item.fieldList;
        return list;
      }, { fieldList: {} });
      delete formattedFieldList["fieldList"];

      // console.log(formattedFieldList);

      let finalSelectedFields = fieldsPropertiesList.find((obj) => obj.name === wizardModel?.getData("selectedCustomSetting")?.componentName);
      let newDataObject = { ...wizardModel };

      const query = `SELECT Id FROM ${
        wizardModel?.getData("selectedCustomSetting")?.componentName
      }`;

      // const query = `SELECT ${finalSelectedFields?.fieldList
      //   ?.map((ele) => ele.name)
      //   .join(", ")} FROM ${
      //   wizardModel?.getData("selectedCustomSetting")?.componentName
      // }`;

      // console.log(query);
      newDataObject.setData("filteredFieldList", finalSelectedFields?.fieldList);
      newDataObject.setData("filterQuery", query);
      setWizardModel({ ...newDataObject });

      await dataSeedingTaskWizardActions.updateSelectedFields(
        getAccessToken,
        null,
        wizardModel,
        formattedFieldList,
      );
      setCurrentScreen(DATA_SEEDING_WIZARD_SCREENS.QUERY_BUILDER_SCREEN);
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

  const toggleItem = (id) => {
    setFieldsPropertiesList((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, isCollapsed: !item.isCollapsed };
        } else {
          return { ...item, isCollapsed: true };
        }
      }),
    );
  };
  const setFieldData = (id, fieldIndex, modifiedValue) => {
    let newFieldPropertiesList = [...fieldsPropertiesList];
    let newFieldObj = newFieldPropertiesList[id]?.fieldList;
    newFieldObj[fieldIndex] = modifiedValue;
    // console.log(modifiedValue);
    // console.log(newFieldPropertiesList[id]?.fieldList[fieldIndex]);
    let newDataObject = { ...wizardModel };
    newDataObject.setData("selectedFieldList", newFieldPropertiesList);
    setWizardModel({ ...newDataObject });
    setFieldsPropertiesList(newFieldPropertiesList);
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
        {fieldsPropertiesList && fieldsPropertiesList.length > 0 ? (
          <Accordion>
            {fieldsPropertiesList.map((item) => (
              <Card key={item?.id}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={item?.id.toString()}
                  onClick={() => toggleItem(item?.id)}
                >
                  <Row>
                    <Col
                      lg={11}
                      md={11}
                    >
                      <H5FieldSubHeader subheaderText={item?.name} />
                    </Col>
                    <Col
                      lg={1}
                      md={1}
                    >
                      <span className={"ml-4"}>
                        {item?.isCollapsed ? (
                          <IconBase
                            icon={faChevronDown}
                            iconSize={"sm"}
                          />
                        ) : (
                          <IconBase
                            icon={faChevronUp}
                            iconSize={"sm"}
                          />
                        )}
                      </span>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={item.id.toString()}>
                  <Card.Body className={"scroll-y"}>
                    {item.fieldList && item.fieldList.length > 0 ? (
                      <DataSeedingFieldSelectionBaseEditorPanel
                        id={item?.id - 1}
                        fieldsList={item.fieldList}
                        setFieldData={setFieldData}
                      />
                    ) : (
                      <small className={"text-muted form-text mt-4"}>
                        <div>No fields found for the selected objects</div>
                      </small>
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        ) : (
          <div className={"m-5"}>No Fields Found</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className={"my-3"}>
        <Row className="mx-1">
          <H5FieldSubHeader
            subheaderText={`Data Seeding Task : Custom Setting Field Edit View`}
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
          disabled={isLoading || isSaving}
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

DataSeedingFieldMappingScreen.propTypes = {
  taskType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default DataSeedingFieldMappingScreen;
