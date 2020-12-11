import React from "react";
import PropTypes from "prop-types";
import DtoFilterSelectInput from "../input/DtoFilterSelectInput";

function FavoritesFilter({ filterDto, setFilterDto}) {
  const favoritesOptions = [{text: "Show All", value: undefined}, {text: "Show Favorites", value: "favorites"} ];
  return (
    <div><DtoFilterSelectInput fieldName={"isFavorite"} setDataObject={setFilterDto} dataObject={filterDto} selectOptions={favoritesOptions} /></div>
  );
}


FavoritesFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default FavoritesFilter;


