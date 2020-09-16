export interface IAppState {
    itemsList: {
        get: CurrencyShortInfo[];
        isLoading: boolean;
        total_count: number;
    },
    selectedItem: {
        get: CurrencyDetailed;
        isLoading: boolean;
    }
}

type CurrencyShortInfo = {
    id: number;
    name: string;
    symbol: string;
    price: number,
    volume: number,
    market_cap: number,
    percent_change_24h: number
}

type CurrencyDetailed = {}

export const loadPageType = "LIST:LOAD_PAGE/SUCCESS";
export const loadPageTrigger = "LIST:LOAD_PAGE/TRIGGER";
export const loadPageFulfill = "LIST:LOAD_PAGE/FULFILL";
export const loadItemType = "ITEM:LOAD/SUCCESS";
export const loadItemTrigger = "ITEM:LOAD/TRIGGER";
export const loadItemFulfill = "ITEM:LOAD/FULFILL";
