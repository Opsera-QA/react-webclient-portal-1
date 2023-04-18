import React, {createContext, useState} from "react";
import PropTypes from "prop-types";

export default function FilterContextProvider (
  {
    children,
  }) {
  const [filterModel, setFilterModel] = useState(undefined);

  const initializeModel = (newFilterModel) => {
    setFilterModel({...newFilterModel});
  };

  return (
    <FilterContext.Provider
      value={{
        filterModel: filterModel,
        setFilterModel: setFilterModel,
        initializeModel: initializeModel,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

FilterContextProvider.propTypes = {
  children: PropTypes.any,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
};

export const FilterContext = createContext();
