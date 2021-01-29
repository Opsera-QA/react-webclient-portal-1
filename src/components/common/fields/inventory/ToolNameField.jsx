import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import Label from "components/common/form_fields/Label";
import FieldContainer from "components/common/fields/FieldContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import toolsActions from "components/inventory/tools/tools-actions";

function ToolNameField({ dataObject, fieldName }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [toolName, setToolName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadToolName();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadToolName = async () => {
    let toolId = dataObject.getData(fieldName);
    if (toolId !== "") {
      const response = await toolsActions.getFullToolById(toolId, getAccessToken);
      if (response?.data) {
        setToolName(response.data[0].name);
      }
    }
  };

  const getToolName = () => {
    if (isLoading) {
      return <span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>{dataObject.getData(fieldName)}</span>;
    }

    if (toolName) {
      return toolName;
    }

    return `Tool name could not be found with ID: [${dataObject.getData(fieldName)}]`;
  };

  return (
    <FieldContainer>
      <Label field={field}/>
      <span>{getToolName()}</span>
    </FieldContainer>
  );
}

ToolNameField.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string
};

export default ToolNameField;