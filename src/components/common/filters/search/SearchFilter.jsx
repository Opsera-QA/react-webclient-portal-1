import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import {useHistory} from "react-router-dom";
import regexDefinitions from "utils/regexDefinitions";
import IconBase from "components/common/icons/IconBase";

function SearchFilter({ paginationModel, loadData, disabled, fieldName, className, isLoading, metadata}) {
  let history = useHistory();
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    try {
      let newPaginationModel = {...paginationModel};
      const searchString = currentSearchTerm;
      const mongoIdRegex = regexDefinitions.mongoId.regex;

      if (metadata?.detailView != null && searchString.match(mongoIdRegex)) {
        const model = new Model({_id: searchString}, metadata, true);
        const link = model.getDetailViewLink();

        if (link !== null) {
          history.push(link);
          return;
        }
      }

      setIsSearching(true);
      newPaginationModel.setData(fieldName, searchString);
      newPaginationModel.setData("currentPage", 1);
      await loadData(newPaginationModel);
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

  if (paginationModel == null || paginationModel.canSearch() === false) {
    return null;
  }

  return (
    <div className={className}>
      <InputGroup size="sm" className={"flex-nowrap"}>
        <input
          disabled={disabled || isLoading}
          placeholder="Search"
          value={currentSearchTerm}
          className="text-input inline-search-filter inline-filter-input"
          onKeyPress={(event) => handleKeyPress(event)}
          onChange={e => setCurrentSearchTerm(e.target.value)}
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

SearchFilter.propTypes = {
  paginationModel: PropTypes.object,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  metadata: PropTypes.object
};

SearchFilter.defaultProps = {
  fieldName: "search",
};

export default SearchFilter;


