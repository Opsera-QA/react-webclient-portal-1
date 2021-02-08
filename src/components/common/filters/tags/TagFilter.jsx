import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function TagFilter({ filterDto, setFilterDto, className }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getTags();
    }
    catch (error) {
      toastContext.showErrorDialog(undefined,"Could not load tags");
    }
    finally {
      setIsLoading(false);
    }
  }

  const getTags = async () => {
    const response = await adminTagsActions.getAllTags(getAccessToken);
    let tags = response?.data?.data;
    let tagOptions = [];

    if (Array.isArray(tags) && tags.length > 0) {
      tags.map((tag, index) => {
        tagOptions.push({text: `Tag: ${tag["value"]}`, value: `${tag["type"]}:${tag["value"]}`, type: `${tag["type"]}`});
      });
    }

    setTagOptions(tagOptions);
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
        selectOptions={tagOptions}
      />
    </div>
  );
}


TagFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  className: PropTypes.string
};

export default TagFilter;


