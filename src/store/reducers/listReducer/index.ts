import {IAppState, loadPageType} from "../../types";

export default function (state: IAppState['itemsList'] = [], {type, payload}: any) {
    switch (type) {
        case loadPageType:
            return payload;
        default:
            return state;
    }
}
