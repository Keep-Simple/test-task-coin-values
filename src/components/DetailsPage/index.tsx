import React, {FC} from "react";
import {useParams} from "react-router-dom";

export const DetailsPage: FC = () => {
    const {name} = useParams<{ name: string }>();
    return (
        <span>Details</span>
    );
}
