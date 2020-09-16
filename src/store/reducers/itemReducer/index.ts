import {IAppState, loadItemType} from "../../types";

export default function (state: IAppState['selectedItem'] = [], {type, payload}: any) {
    switch (type) {
        case loadItemType:
            return payload;
        default:
            return state;
    }
}
