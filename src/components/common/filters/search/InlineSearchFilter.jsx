import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faSpinner} from "@fortawesome/pro-light-svg-icons";
import regexHelpers from "utils/regexHelpers";
import Model from "core/data_model/model";
import {useHistory} from "react-router-dom";

function InlineSearchFilter({ filterDto, setFilterDto, loadData, disabled, fieldName, supportSearch, className, isLoading, metadata}) {
  let history = useHistory();
  const [isSearching, setIsSearching] = useState(false);

  const validateAndSetData = (value) => {
    let newFilterDto = {...filterDto};
    newFilterDto.setData(fieldName, value);
    setFilterDto({...newFilterDto});
  };

  const handleSearch = async () => {
    try {
      let newFilterDto = {...filterDto};
      const searchString = newFilterDto.getData(fieldName);

      if (metadata?.detailView != null && searchString.match(regexHelpers.regexTypes.mongoId)) {
        const model = new Model({_id: searchString}, metadata, true);
        const link = model.getDetailViewLink();

        if (link !== null) {
          history.push(link);
          return;
        }
      }

      setIsSearching(true);
      newFilterDto.setData("currentPage", 1);
      setFilterDto({...newFilterDto});
      await loadData(newFilterDto);
    }
    finally {
      setIsSearching(false);
    }
  };

  const getSearchIcon = () => {
    if (isSearching) {
      return <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>;
    }

    return  <FontAwesomeIcon icon={faSearch} fixedWidth />;
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  };

  if (supportSearch !== true) {
    return null;
  }

  return (
    <div className={className}>
      <InputGroup size="sm" className={"flex-nowrap"}>
        <input
          disabled={disabled || isLoading || filterDto == null}
          placeholder="Search"
          value={filterDto?.getData(fieldName) || ""}
          className="text-input inline-search-filter inline-filter-input"
          onKeyPress={(event) => handleKeyPress(event)}
          onChange={e => validateAndSetData(e.target.value)}
        />
        <InputGroup.Append>
          <Button className="inline-filter-input filter-bg-white" disabled={isLoading || disabled || filterDto == null} variant="outline-primary" onClick={handleSearch}>
            {getSearchIcon()}
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


