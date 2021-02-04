import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faSpinner} from "@fortawesome/pro-light-svg-icons";

function InlineSearchFilter({ filterDto, setFilterDto, loadData, disabled, fieldName}) {
  const [isLoading, setIsLoading] = useState(false);

  const validateAndSetData = (value) => {
    let newFilterDto = {...filterDto};
    newFilterDto.setData(fieldName, value);
    setFilterDto({...newFilterDto});
  };

  const handleSearch = async () => {
    try {
      let newFilterDto = {...filterDto};
      setIsLoading(true);
      newFilterDto.setData("currentPage", 1);
      setFilterDto({...newFilterDto});
      await loadData(newFilterDto);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getSearchIcon = () => {
    if (isLoading) {
      return <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>;
    }

    return  <FontAwesomeIcon icon={faSearch} fixedWidth />;
  }

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  }

  if (filterDto == null) {
    return null;
  }

  return (
    <InputGroup size="sm">
      <input
        disabled={disabled}
        placeholder="Search"
        value={filterDto.getData(fieldName)}
        className="form-control inline-filter-input"
        onKeyPress={(event) => handleKeyPress(event)}
        onChange={e => validateAndSetData(e.target.value)}
      />
      <InputGroup.Append>
        <Button variant="outline-primary" onClick={handleSearch}>
          {getSearchIcon()}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

InlineSearchFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
  disabled: PropTypes.bool
};

InlineSearchFilter.defaultProps = {
  fieldName: "search"
};

export default InlineSearchFilter;


