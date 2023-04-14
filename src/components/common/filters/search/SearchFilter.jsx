import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import {useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function SearchFilter(
  {
    paginationModel,
    loadData,
    disabled,
    fieldName,
    className,
    isLoading,
    metadata,
    searchText,
    visible,
    variant,
  }) {
  const history = useHistory();
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setCurrentSearchTerm(DataParsingHelper.parseString(searchText, ""));
  }, [searchText]);

  const handleSearch = async () => {
    try {
      const searchString = currentSearchTerm;

      if (isMongoDbId(searchString) && paginationModel?.getDetailViewLink && paginationModel?.getDetailViewLink(searchString) != null) {
        const link = paginationModel?.getDetailViewLink(searchString);

        if (hasStringValue(link) === true) {
          history.push(link);
          return;
        }
      }

      if (metadata?.detailView != null && isMongoDbId(searchString)) {
        const model = new Model({_id: searchString}, metadata, true);
        const link = model.getDetailViewLink(searchString);

        if (hasStringValue(link) === true) {
          history.push(link);
          return;
        }
      }

      setIsSearching(true);
      paginationModel.setData(fieldName, searchString);
      paginationModel.setData("currentPage", 1);
      await loadData(paginationModel);
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

  const buttonClassName = variant === "outline-primary" ? "inline-filter-input filter-bg-white" : "inline-filter-input";

  if (visible === false || paginationModel == null || paginationModel.canSearch() === false) {
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
          <Button className={buttonClassName} disabled={isLoading || disabled} variant={variant} onClick={handleSearch}>
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
  metadata: PropTypes.object,
  searchText: PropTypes.string,
  visible: PropTypes.bool,
  variant: PropTypes.string,
};

SearchFilter.defaultProps = {
  fieldName: "search",
  variant: "outline-primary",
};

export default SearchFilter;


