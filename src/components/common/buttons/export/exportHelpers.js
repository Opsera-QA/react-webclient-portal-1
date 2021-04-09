import {ApiService} from "api/apiService";
import React from "react";
import { CSVLink } from "react-csv";
  
export const getAllResultsForExport = async (startDate, endDate, setIsLoading, getAccessToken, searchTerm, filterType, getFormattedCustomFilters, currentPage, setExportData, setExportDisabled) => {
    setIsLoading(true);

    const accessToken = await getAccessToken;
    let route = "/analytics/search";
    if (filterType === "blueprint") {
      route = "/analytics/blueprint";
    }
    const urlParams = {
      search: searchTerm,
      date: startDate !== 0 && endDate === 0 ? startDate : undefined,
      start: startDate !== 0 && endDate !== 0 ? startDate : undefined,
      end: startDate !== 0 && endDate !== 0 ? endDate : undefined,
      filter: {
        index: filterType,
        customFilter: getFormattedCustomFilters,
      },
      page: currentPage,
      size: 10000,
    };
    const apiCall = new ApiService(route, urlParams, accessToken);
    await apiCall
      .get()
      .then((result) => {
        let searchResults = [];
        if (result) {
          searchResults =
            result.data.hasOwnProperty("hits") && result.data.hits.hasOwnProperty("hits") ? result.data.hits : [];
        }
        let data = searchResults;
        setExportData(data);
        setIsLoading(false);
        setExportDisabled(false);
      })
      .catch(function (error) {
       console.log(error);
      });
  };

  export const rawDataDownload = (blob, fileName) => {
    const element = document.createElement("a");
    const file = blob;
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    element.click();
  };