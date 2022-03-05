import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import axios from "axios";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";

function ToolIdentifierFilter({ filterDto, setFilterDto, fieldName, setDataFunction, className, inline, loadingData }) {
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

    // TODO: Rewrite this to not construct objects
    if (isMounted?.current === true && Array.isArray(toolIdentifiers) && toolIdentifiers.length > 0) {
      const toolIdentifierOptions = [];

      toolIdentifiers.map((toolIdentifier, index) => {
        toolIdentifierOptions.push({
          text: `${toolIdentifier["name"]}`,
          value: `${toolIdentifier["identifier"]}`,
          tool_type: `${toolIdentifier["tool_type_name"]}`,
        });
      });

      if (isMounted?.current === true) {
        setToolIdentifiers(toolIdentifierOptions);
      }
    }
  };

  if (filterDto == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      busy={isLoading}
      placeholderText={"Filter by Tool"}
      fieldName={fieldName}
      inline={inline}
      disabled={loadingData}
      groupBy={"tool_type"}
      setDataObject={setFilterDto}
      dataObject={filterDto}
      setDataFunction={setDataFunction}
      selectOptions={toolIdentifiers}
      className={className}
    />
  );
}


ToolIdentifierFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
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


