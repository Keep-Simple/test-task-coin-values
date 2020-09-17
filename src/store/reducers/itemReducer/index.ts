import {IAppState, loadItemFulfill, loadItemTrigger, loadItemSuccess} from "../../types";

const init = {
    get: {} as IAppState['selectedItem']['get'],
    isLoading: false
};

export default function (state: IAppState['selectedItem'] = init, {type, payload}: any) {
    switch (type) {
        case loadItemSuccess:
            return {
                ...state,
                get: payload
            };
        case loadItemTrigger:
            return {
                ...state,
                isLoading: true
            }
        case loadItemFulfill:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}
