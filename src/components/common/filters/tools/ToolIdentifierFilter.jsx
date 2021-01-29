import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import {createFilterOptions} from "components/common/filters/filterHelpers";
import DtoFilterSelectInput from "components/common/filters/input/DtoFilterSelectInput";

function ToolIdentifierFilter({ filterDto, setFilterDto, fieldName, setDataFunction}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolIdentifierFilterOptions, setToolIdentifierFilterOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await getToolList();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setLoading(false);
    }
  }

  const getToolList = async () => {
    const toolResponse = await toolsActions.getTools(getAccessToken);
    setToolIdentifierFilterOptions(createFilterOptions(toolResponse?.data, "Tool", "name", "identifier"));
  };

  return (
    <div>
      <DtoFilterSelectInput
        busy={isLoading}
        setDataFunctionplaceholderText={"Filter by Tool"}
        fieldName={fieldName}
        setDataObject={setFilterDto}
        dataObject={filterDto}
        setDataFunction={setDataFunction}
        selectOptions={toolIdentifierFilterOptions}
      />
    </div>
  );
}


ToolIdentifierFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
};

ToolIdentifierFilter.defaultProps = {
  fieldName: "toolIdentifier"
};

export default ToolIdentifierFilter;


