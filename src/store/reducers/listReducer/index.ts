import {IAppState, loadPageFulfill, loadPageTrigger, loadPageSuccess} from "../../types";

const init = {
    get: [] as IAppState['itemsList']['get'],
    isLoading: false,
    total_count: 0
};

export default function (state: IAppState['itemsList'] = init, {type, payload}: any) {
    switch (type) {
        case loadPageSuccess:
            return {
                ...state,
                get: payload.items,
                total_count: payload.total
            };
        case loadPageTrigger:
            return {
                ...state,
                isLoading: true
            };
        case loadPageFulfill:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
