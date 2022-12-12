import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function PlatformTagFilter(
  {
    filterModel,
    setFilterModel,
    className,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const {
    cancelTokenSource,
    getAccessToken,
    isMounted,
    toastContext,
  } = useComponentStateReference();


  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getTags();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showErrorDialog(error,"Could not load Tags:");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTags = async () => {
    const response = await adminTagsActions.getPlatformTags(getAccessToken, cancelTokenSource);

    if (isMounted?.current === true) {
      setTags(DataParsingHelper.parseNestedArray(response, "data.data", []));
    }
  };

  const getTextFieldString = (tag) => {
    if (tag == null) {
      return "Select Tag";
    }

    return `${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`;
  };

  const setDataFunction = (fieldName, tag) => {
    filterModel.setData(fieldName, tag);
    setFilterModel({...filterModel});
  };

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={"tag"}
        busy={isLoading}
        placeholderText={"Filter by Tag"}
        groupBy={"type"}
        setDataObject={setFilterModel}
        setDataFunction={setDataFunction}
        dataObject={filterModel}
        textField={getTextFieldString}
        selectOptions={tags}
      />
    </div>
  );
}

PlatformTagFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
};

