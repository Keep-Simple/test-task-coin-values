import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IAppState, loadItemTrigger} from "../../store/types";

export const DetailsPage: FC = () => {
    const {name} = useParams<{ name: string }>();
    const dispatch = useDispatch();
    const data = useSelector((state: IAppState) => state.selectedItem);

    console.log(data);
    useEffect(() => {
        dispatch({type: loadItemTrigger, payload: name});
    }, [name, dispatch]);

    return (
        <span>Details</span>
    );
}
