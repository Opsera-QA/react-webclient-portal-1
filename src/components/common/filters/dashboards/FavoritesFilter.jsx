import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

const favoritesOptions = [
  {text: "Show All", value: undefined},
  {text: "Show Favorites", value: "favorites"}
];

function FavoritesFilter({ filterModel, setFilterModel, className }) {

  if (filterModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={"isFavorite"}
        placeholderText={"Filter by Dashboard Type"}
        setDataObject={setFilterModel}
        dataObject={filterModel}
        selectOptions={favoritesOptions}
      />
    </div>
  );
}


FavoritesFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string
};

export default FavoritesFilter;


