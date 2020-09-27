import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import toolsActions from "../../../inventory/tools/tools-actions";
import {AuthContext} from "../../../../contexts/AuthContext";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {createFilterOptions} from "../filterHelpers";
import DtoFilterInput from "../../input/dto_input/dto-filter-input";

function ToolIdentifierFilter({ filterDto, setFilterDto}) {
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
    setToolIdentifierFilterOptions(createFilterOptions(toolResponse.data, "Tool", "name", "identifier"));
  };

  return (
    <div><DtoFilterInput busy={isLoading} fieldName={"toolIdentifier"} setDataObject={setFilterDto} dataObject={filterDto} selectOptions={toolIdentifierFilterOptions} /></div>
  );
}


ToolIdentifierFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default ToolIdentifierFilter;


