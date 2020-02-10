import React, { PureComponent } from "react";

import CreationModal from "./CreationModal";
import NewApplication from "./NewApplication";
import NewAppProvider from "./context";

import "./style.css";

export default class Platform extends PureComponent {
  render() {
    return (
      <div className="mt-3 max-content-width">
        <NewAppProvider>
          <CreationModal />
          <NewApplication />
        </NewAppProvider>
      </div>
    );
  }
}
