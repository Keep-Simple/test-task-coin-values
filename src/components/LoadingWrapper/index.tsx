import React from 'react';
import {CircularProgress} from "@material-ui/core";

export default function LoadingWrapper(props: { children: any, isLoading: boolean }) {
    return props.isLoading ?
        <CircularProgress/>
        : props.children ?? null
}
