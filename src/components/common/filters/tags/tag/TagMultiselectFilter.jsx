import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import axios from "axios";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import FilterMultiSelectInputBase from "components/common/filters/input/FilterMultiSelectInputBase";

function TagMultiselectFilter({ filterModel, setFilterModel, className, fieldName }) {
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
    const response = await adminTagsActions.getAllTagsV2(getAccessToken, cancelSource, "active");
    let tags = response?.data?.data;
    let tagOptions = [];

    if (Array.isArray(tags) && tags.length > 0) {
      tags.map((tag, index) => {
        tagOptions.push({text: `${tag["value"]}`, value: `${tag["type"]}:${tag["value"]}`, type: `${capitalizeFirstLetter(tag["type"])}`});
      });
    }

    if (isMounted?.current === true) {
      setTagOptions(tagOptions);
    }
  };

  return (
    <FilterMultiSelectInputBase
      fieldName={fieldName}
      className={className}
      busy={isLoading}
      placeholderText={"Filter by Tag"}
      groupBy={"type"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      selectOptions={tagOptions}
    />
  );
}

TagMultiselectFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

TagMultiselectFilter.defaultProps = {
  fieldName: "tags"
};

export default TagMultiselectFilter;


