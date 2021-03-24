import React from 'react';
import { RMProvider } from "./RMContext";
import Pipeline from './Pipeline';

export default function index() {
    return (
        <RMProvider>
            <Pipeline />
        </RMProvider>
    );
}
