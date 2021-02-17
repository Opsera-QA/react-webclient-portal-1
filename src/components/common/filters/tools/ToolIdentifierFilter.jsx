import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {createFilterOptions} from "components/common/filters/filterHelpers";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import axios from "axios";
import toolManagementActions from "components/admin/tools/tool-management-actions";

function ToolIdentifierFilter({ filterDto, setFilterDto, fieldName, setDataFunction, className, inline }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolIdentifierFilterOptions, setToolIdentifierFilterOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);
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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      await getToolList(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  }

  const getToolList = async (cancelSource = cancelTokenSource) => {
    const toolResponse = await toolManagementActions.getToolIdentifiersV2(getAccessToken, cancelSource, "active", true);

    if (toolResponse?.data) {
      setToolIdentifierFilterOptions(createFilterOptions(toolResponse?.data, "Tool", "name", "identifier"));
    }
  };

  return (
    <div className={className}>
      <FilterSelectInputBase
        busy={isLoading}
        placeholderText={"Filter by Tool"}
        fieldName={fieldName}
        inline={inline}
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
  className: PropTypes.string,
  inline: PropTypes.bool
};

ToolIdentifierFilter.defaultProps = {
  fieldName: "toolIdentifier"
};

export default ToolIdentifierFilter;


