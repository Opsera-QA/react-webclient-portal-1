import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import axios from "axios";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

// TODO: Use CustomerTagFilter instead. This is left in for legacy support
function TagFilter(
  {
    filterDto,
    setFilterDto,
    valueField,
    className,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
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
      await getTags(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showErrorDialog(undefined,"Could not load tags");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTags = async (cancelSource = cancelTokenSource) => {
    const response = await adminTagsActions.getAllTagsV2(getAccessToken, cancelSource, false);
    const tags = DataParsingHelper.parseNestedArray(response, "data.data", []);
    const tagOptions = [];

    if (Array.isArray(tags) && tags.length > 0) {
      tags.map((tag, index) => {
        tagOptions.push({
          text: `${tag["value"]}`,
          value: `${tag["type"]}:${tag["value"]}`,
          value2: {type: tag.type, value: tag.value},
          type: `${capitalizeFirstLetter(tag["type"])}`
        });
      });
    }

    if (isMounted?.current === true) {
      setTagOptions(tagOptions);
    }
  };

  const getTextFieldString = (tag) => {
    if (tag == null) {
      return "Select Tag";
    }

    if (valueField === "value2") {
      return `${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`;
    }

    return tag?.text;
  };

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={"tag"}
        busy={isLoading}
        placeholderText={"Filter by Tag"}
        groupBy={"type"}
        setDataObject={setFilterDto}
        dataObject={filterDto}
        valueField={valueField}
        textField={getTextFieldString}
        selectOptions={tagOptions}
      />
    </div>
  );
}


TagFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  className: PropTypes.string,
  valueField: PropTypes.string,
};

TagFilter.defaultProps = {
  valueField: "value",
};

export default TagFilter;


