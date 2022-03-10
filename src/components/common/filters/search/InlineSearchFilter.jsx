import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import {useHistory} from "react-router-dom";
import regexDefinitions from "utils/regexDefinitions";
import IconBase from "components/common/icons/IconBase";

function InlineSearchFilter({ filterDto, setFilterDto, loadData, disabled, fieldName, supportSearch, className, isLoading, metadata}) {
  let history = useHistory();
  const [isSearching, setIsSearching] = useState(false);

  const validateAndSetData = (value) => {
    let newFilterDto = {...filterDto};
    newFilterDto.setData(fieldName, value);

    // TODO: Setting state on filter model should only be handled in the load data function and this should be removed.
    //  Leaving here for now to prevent unintended side effects
    if (setFilterDto) {
      setFilterDto({...newFilterDto});
    }
  };

  const handleSearch = async () => {
    try {
      let newFilterDto = {...filterDto};
      const searchString = newFilterDto.getData(fieldName);
      const mongoIdRegex = regexDefinitions.mongoId?.regex;

      if (metadata?.detailView != null && searchString.match(mongoIdRegex)) {
        const model = new Model({_id: searchString}, metadata, true);
        const link = model.getDetailViewLink();

        if (link !== null) {
          history.push(link);
          return;
        }
      }

      // TODO: Replace top detail view link check with this once everywhere is updated
      if (searchString.match(mongoIdRegex) && filterDto?.getDetailViewLink && filterDto?.getDetailViewLink() != null) {
        const link = filterDto?.getDetailViewLink(searchString);

        if (link !== null) {
          history.push(link);
          return;
        }
      }

      setIsSearching(true);
      newFilterDto.setData("currentPage", 1);

      // TODO: Setting state on filter model should only be handled in the load data function and this should be removed.
      //  Leaving here for now to prevent unintended side effects
      if (setFilterDto) {
        setFilterDto({...newFilterDto});
      }

      await loadData(newFilterDto);
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
      <InputGroup size="sm" className={"flex-nowrap"}>
        <input
          disabled={disabled || isLoading}
          placeholder="Search"
          value={filterDto?.getData(fieldName) || ""}
          className="text-input inline-search-filter inline-filter-input"
          onKeyPress={(event) => handleKeyPress(event)}
          onChange={e => validateAndSetData(e.target.value)}
        />
        <InputGroup.Append>
          <Button className="inline-filter-input filter-bg-white" disabled={isLoading || disabled} variant="outline-primary" onClick={handleSearch}>
            <IconBase isLoading={isSearching} icon={faSearch} />
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


