import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import axios from "axios";
import ListInputBase from "components/common/inputs/list/ListInputBase";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {DialogToastContext} from "contexts/DialogToastContext";

const SfdcComponentListInput = ({ pipelineWizardModel, setPipelineWizardModel }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [componentTypes, setComponentTypes] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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

      if (pipelineWizardModel.getData("sfdcToolId")) {
        const response = await sfdcPipelineActions.getComponentTypesV2(getAccessToken, cancelSource, pipelineWizardModel);

        if (isMounted?.current === true && Array.isArray(response?.data)) {
          setComponentTypes(response?.data);
        }
      }
    } catch (error) {
      console.error("Error getting API Data: ", error);

      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const searchFunction = (item, searchTerm) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const getSelectedOptions = () => {
    let selectedArray = [];
    let selectedOptions = pipelineWizardModel.getData("selectedComponentTypes");

    if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      selectedOptions.forEach((selectedOptionName) => {
        let componentType = componentTypes.find((type) => type.name === selectedOptionName);

        if (componentType != null) {
          selectedArray.push(componentType);
        }
      });
    }

    return selectedArray;
  };

  const getDisabledOptions = () => {
    return componentTypes?.filter((item) => item.enabled !== true);
  };

  const customTemplate = (item) => {
    const value = item["value"] !== "" ? item["value"] : "No file extension found.";
    const enabled = item["enabled"] === true;
    const className = enabled === true ? "" : "text-muted";

    return (`
      <div class="${className}">
        <div class="d-flex justify-content-between">
            <div>${item["name"]}</div>
            <div>${enabled ? "" : "Disabled"}</div>
        </div>
       <div class="ml-2">${value}</div>
      </div>
    `);
  };

  // TODO: This is a workaround for the refresh issue.
  const handleRemoveFromSelected = (fieldName, valueArray) => {
    let newModel = pipelineWizardModel;
    pipelineWizardModel.setData(fieldName, valueArray);
    setPipelineWizardModel({...newModel});
    setComponentTypes([...componentTypes]);
  };

  if (pipelineWizardModel == null) {
    return <LoadingDialog size={"md"} message={"Loading Data"} />;
  }

  // TODO: Should I make this generic for reuse?
  return (
    <Row>
      <Col lg={6}>
        <ListInputBase
          fieldName={"selectedComponentTypes"}
          selectOptions={componentTypes}
          dataObject={pipelineWizardModel}
          setDataObject={setPipelineWizardModel}
          showSelectAllButton={true}
          valueField={"name"}
          textField={"name"}
          disabledOptions={getDisabledOptions()}
          isLoading={isLoading}
          searchFunction={searchFunction}
          icon={faSalesforce}
          disabled={isLoading}
          customTemplate={customTemplate}
          noDataMessage={"No Component Types Found"}
        />
      </Col>
      <Col lg={6}>
        <ListInputBase
          customTitle={"Selected Component Types"}
          fieldName={"selectedComponentTypes"}
          selectOptions={getSelectedOptions()}
          dataObject={pipelineWizardModel}
          setDataObject={setPipelineWizardModel}
          setDataFunction={handleRemoveFromSelected}
          disabledOptions={getDisabledOptions()}
          noDataMessage={"No Component Types Selected"}
          valueField={"name"}
          textField={"name"}
          isLoading={isLoading}
          searchFunction={searchFunction}
          icon={faSalesforce}
          disabled={isLoading || getSelectedOptions().length === 0}
          customTemplate={customTemplate}
        />
      </Col>
    </Row>
  );
};

SfdcComponentListInput.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
};

export default SfdcComponentListInput;
