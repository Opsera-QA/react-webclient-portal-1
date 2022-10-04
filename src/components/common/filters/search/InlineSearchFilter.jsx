import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import {useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";

function InlineSearchFilter({ filterDto, setFilterDto, loadData, disabled, fieldName, supportSearch, className, isLoading, metadata}) {
  let history = useHistory();
  const [isSearching, setIsSearching] = useState(false);

  const validateAndSetData = (value) => {
    filterDto.setData(fieldName, value);

    // TODO: Setting state on filter model should only be handled in the load data function and this should be removed.
    //  Leaving here for now to prevent unintended side effects
    if (setFilterDto) {
      setFilterDto({...filterDto});
    }
  };

  const handleSearch = async () => {
    try {
      const searchString = filterDto.getData(fieldName);

      if (metadata?.detailView != null && isMongoDbId(searchString)) {
        const model = new Model({_id: searchString}, metadata, true);
        const link = model.getDetailViewLink(searchString);

        if (hasStringValue(link) === true) {
          history.push(link);
          return;
        }
      }

      // TODO: Replace top detail view link check with this once everywhere is updated
      if (isMongoDbId(searchString) && filterDto?.getDetailViewLink && filterDto?.getDetailViewLink(searchString) != null) {
        const link = filterDto?.getDetailViewLink(searchString);

        if (hasStringValue(link) === true) {
          history.push(link);
          return;
        }
      }

      setIsSearching(true);
      filterDto.setData("currentPage", 1);

      // TODO: Setting state on filter model should only be handled in the load data function and this should be removed.
      //  Leaving here for now to prevent unintended side effects
      if (setFilterDto) {
        setFilterDto({...filterDto});
      }

      await loadData(filterDto);
    }
    finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  };

  if (supportSearch !== true || filterDto == null) {
    return null;
  }

  return (
    <div className={className}>
      <InputGroup
        size={"sm"}
        className={"flex-nowrap"}
      >
        <input
          disabled={disabled || isLoading}
          placeholder={"Search"}
          value={filterDto?.getData(fieldName) || ""}
          className={"text-input inline-search-filter inline-filter-input"}
          onKeyPress={(event) => handleKeyPress(event)}
          onChange={e => validateAndSetData(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            className={"inline-filter-input"}
            disabled={isLoading || disabled}
            variant={"secondary"}
            onClick={handleSearch}
          >
            <IconBase
              isLoading={isSearching}
              icon={faSearch}
            />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

InlineSearchFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
  disabled: PropTypes.bool,
  supportSearch: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  metadata: PropTypes.object
};

InlineSearchFilter.defaultProps = {
  fieldName: "search",
};

export default InlineSearchFilter;


