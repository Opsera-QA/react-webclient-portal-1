import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Tooltip } from "react-bootstrap";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import LoadingDialog from "components/common/status_notifications/loading";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import axios from "axios";
import Model from "core/data_model/model";
import sfdcComponentsMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc_component_selector/sfdc-components-metadata";
import ListInputBase from "components/common/inputs/list/ListInputBase";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SfdcComponentListInput = ({
  sfdcToolId,
  isProfiles,
  setSelectedComponentTypes,
  selectedComponentTypes,
  setError,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [componentTypes, setComponentTypes] = useState([]);
  const [componentTypesModel, setComponentTypesModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  Moment.locale("en");
  momentLocalizer();

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    let newComponentTypesModel = new Model({...sfdcComponentsMetadata.newObjectFields}, sfdcComponentsMetadata, true);
    newComponentTypesModel.setData("selectedComponentTypes", selectedComponentTypes);
    newComponentTypesModel.setData("selected", selectedComponentTypes);
    setComponentTypesModel({...newComponentTypesModel});
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
  }, [isProfiles, sfdcToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      if(sfdcToolId) {
        const response = await sfdcPipelineActions.getComponentTypesV2(getAccessToken, cancelSource, sfdcToolId, isProfiles);
        if (isMounted?.current === true && response?.data) {
          setComponentTypes(response.data);
        }
      }
    } catch (error) {
      console.error("Error getting API Data: ", error);

      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const renderTooltip = (message, props) => (
    <Tooltip id="button-tooltip" style={{"zIndex": 1500}} {...props}>
      {message.length > 0 ? message : "No file extension found."}
    </Tooltip>
  );

  const searchFunction = (item, searchTerm) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const setDataFunction = (fieldName, newArray) => {
    let newDataObject = componentTypesModel;
    newDataObject.setData("selectedComponentTypes", [...newArray]);
    newDataObject.setData("selected", [...newArray]);
    setSelectedComponentTypes([...newArray]);
    setComponentTypesModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = componentTypesModel;
    newDataObject.setData("selectedComponentTypes", []);
    newDataObject.setData("selected", []);
    setSelectedComponentTypes([]);
    setComponentTypesModel({...newDataObject});
  };

  const getSelectedOptions = () => {
    let selectedArray = [];
    let selectedOptions = componentTypesModel.getData("selectedComponentTypes");

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
    const className = enabled === true ? "" :  "text-muted";

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

  if (componentTypesModel == null) {
    return <LoadingDialog size={"md"} message={"Loading Data"} />;
  }

  return (
    <Row>
      <Col lg={6}>
        <ListInputBase
          fieldName={"selectedComponentTypes"}
          selectOptions={componentTypes}
          dataObject={componentTypesModel}
          setDataObject={setComponentTypesModel}
          showSelectAllButton={true}
          setDataFunction={setDataFunction}
          valueField={"name"}
          textField={"name"}
          disabledOptions={getDisabledOptions()}
          isLoading={isLoading}
          clearDataFunction={clearDataFunction}
          searchFunction={searchFunction}
          icon={faSalesforce}
          disabled={isLoading}
          customTemplate={customTemplate}
          noDataMessage={"No Component Types Found"}
        />
      </Col>
      <Col lg={6}>
        <ListInputBase
          fieldName={"selected"}
          selectOptions={getSelectedOptions()}
          dataObject={componentTypesModel}
          setDataObject={setComponentTypesModel}
          clearDataFunction={clearDataFunction}
          setDataFunction={setDataFunction}
          disabledOptions={getDisabledOptions()}
          noDataMessage={"No Components Selected"}
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
  sfdcToolId: PropTypes.string,
  isProfiles: PropTypes.bool,
  setSelectedComponentTypes: PropTypes.func,
  selectedComponentTypes: PropTypes.array,
  setError: PropTypes.func
};

export default SfdcComponentListInput;
