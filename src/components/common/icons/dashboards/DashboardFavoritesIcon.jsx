import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {faStar} from "@fortawesome/pro-light-svg-icons";
import {faStar as faStarSolid} from "@fortawesome/pro-solid-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import IconBase from "components/common/icons/IconBase";

function DashboardFavoritesIcon({dashboard, dashboardsActions}) {
  const {getAccessToken} = useContext(AuthContext);
  const [favorite, setFavorite] = useState(dashboard.isFavorite);

  const changeFavorite = (rowData) => {
    rowData.isFavorite = !rowData.isFavorite;
    setFavorite(rowData.isFavorite);
    dashboardsActions.updateFavorite(rowData, getAccessToken);
  };

  return (
    <div className="text-center">
      <IconBase
        className={"opsera-yellow"}
        icon={favorite ? faStarSolid : faStar}
        onClickFunction={(e) => {
          console.log(e);
          changeFavorite(dashboard);
          e.stopPropagation();
        }}
      />
    </div>
  );
}

DashboardFavoritesIcon.propTypes = {
    dashboard: PropTypes.object,
    dashboardsActions: PropTypes.object,
  };

export default DashboardFavoritesIcon;