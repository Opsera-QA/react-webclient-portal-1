import React, { PureComponent } from 'react'

import CreationModal from "./CreationModal"
import NewApplication from "./NewApplication"
import NewAppProvider from "./context"

import "./style.css"

export default class Platform extends PureComponent {
    render() {
        return (
            <NewAppProvider>
                <CreationModal />
                <NewApplication />
            </NewAppProvider>
        )
    }
}
