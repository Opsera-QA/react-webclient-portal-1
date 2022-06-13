import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import axios from "axios";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";

function ToolIdentifierFilter(
  {
    filterModel,
    setFilterModel,
    fieldName,
    setDataFunction,
    className,
    inline,
    loadingData,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      setToolIdentifiers([]);
      setIsLoading(true);
      await getToolIdentifiers(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getToolIdentifiers = async (cancelSource = cancelTokenSource) => {
    const toolResponse = await toolIdentifierActions.getToolIdentifiersV2(getAccessToken, cancelSource, "active", true);
    const toolIdentifiers = toolResponse?.data?.data;

    if (isMounted?.current === true && Array.isArray(toolIdentifiers)) {
      setToolIdentifiers(toolIdentifiers);
    }
  };

  if (filterModel == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      busy={isLoading}
      placeholderText={"Filter by Tool"}
      fieldName={fieldName}
      inline={inline}
      disabled={loadingData}
      groupBy={"tool_type_name"}
      textField={"name"}
      valueField={"identifier"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      setDataFunction={setDataFunction}
      selectOptions={toolIdentifiers}
      className={className}
    />
  );
}


ToolIdentifierFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  inline: PropTypes.bool,
  loadingData: PropTypes.bool
};

ToolIdentifierFilter.defaultProps = {
  fieldName: "toolIdentifier"
};

export default ToolIdentifierFilter;


