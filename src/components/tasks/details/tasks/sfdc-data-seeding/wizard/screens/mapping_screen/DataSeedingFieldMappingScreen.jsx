import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { Button, Row, Collapse, ListGroup, ListGroupItem, Nav  } from "react-bootstrap";
import IconBase from "../../../../../../../common/icons/IconBase";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import dataSeedingTaskWizardActions from "../../dataSeedingTaskWizard.actions";
import { parseError } from "../../../../../../../common/helpers/error-helpers";
import useAxiosCancelToken from "../../../../../../../../hooks/useAxiosCancelToken";
import axios from "axios";
import Col from "react-bootstrap/Col";
import SelectInputBase from "../../../../../../../common/inputs/select/SelectInputBase";
import Model from "../../../../../../../../core/data_model/model";
import { customSettingMappingMetadata } from "./customSettingMapping.metadata";
import { hasStringValue } from "../../../../../../../common/helpers/string-helpers";
import { DATA_SEEDING_WIZARD_SCREENS } from "../../dataSeedingTaskWizard.constants";

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

  const items = [
    { id: 1, title: 'List Item 1', content: 'Content 1' },
    { id: 2, title: 'List Item 2', content: 'Content 2' },
    { id: 3, title: 'List Item 3', content: 'Content 3' },
  ];

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
      await dataSeedingTaskWizardActions.pullFieldList(
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
        setFieldsPropertiesList(fieldList);

        let newDataObject = { ...wizardModel };
        // newDataObject.setData("selectedFieldList", fieldList);
        setWizardModel({ ...newDataObject });

        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return fieldList;
  };

  const handleBackButton = () => {
    setCurrentScreen(
      DATA_SEEDING_WIZARD_SCREENS.CONFIGURATION_SCREEN,
    );
  };

  const saveAndMoveToNextScreen = async () => {
    try {
      // TODO : fix this
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

      await dataSeedingTaskWizardActions.updateSelectedFields(
        getAccessToken,
        null,
        wizardModel,
        finalSelectedFields,
      );
      await dataSeedingTaskWizardActions.setFieldMappings(
        getAccessToken,
        null,
        wizardModel,
      );
      const response =
        await dataSeedingTaskWizardActions.validateQuery(
          getAccessToken,
          null,
          wizardModel,
          query,
        );
      if (response?.status === 200) {
        await dataSeedingTaskWizardActions.setFilterQuery(
          getAccessToken,
          null,
          wizardModel,
          query,
          [],
        );
        setCurrentScreen(
          DATA_SEEDING_WIZARD_SCREENS.CONFIRMATION_SCREEN,
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
        {fieldsPropertiesList && fieldsPropertiesList.length > 0 ?
          <Accordion>
            {fieldsPropertiesList.map((item) => (
              <Card key={item.id}>
                <Accordion.Toggle as={Card.Header} eventKey={item.id.toString()}>
                  {item.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={item.id.toString()}>
                  <Card.Body style={{ height: "500px" }}>content</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
          :
          <>No Fields Found</>
        }
      </div>
    );
  };

  return (
    <div>
      <div className={"my-3"}>
        <Row className="mx-1">
          <H5FieldSubHeader
            subheaderText={`Data Seeding Task : Custom Setting Field Mapping Screen`}
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
