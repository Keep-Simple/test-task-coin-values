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

export type CurrencyShortInfo = {
    id: number;
    name: string;
    symbol: string;
    price: number,
    volume: number,
    market_cap: number,
    percent_change_24h: number
}

export type CurrencyDetailed = {
    name: string;
    price: number;
    market_cap: number;
    market_dominance: number;
    tweets: number;
    news: number;
    alt_rank: number;
    volume_24h: number;
    sparkline: SparkLineSlice[]
}

export type SparkLineSlice = {
   time: string;
   market_cap: number;
   market_cap_global: number;
}

export const loadPageSuccess = "LIST:LOAD_PAGE/SUCCESS";
export const loadPageTrigger = "LIST:LOAD_PAGE/TRIGGER";
export const loadPageFulfill = "LIST:LOAD_PAGE/FULFILL";
export const loadItemSuccess = "ITEM:LOAD/SUCCESS";
export const loadItemTrigger = "ITEM:LOAD/TRIGGER";
export const loadItemFulfill = "ITEM:LOAD/FULFILL";
