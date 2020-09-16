export interface IAppState {
    itemsList: CurrencyShortInfo[],
    selectedItem: CurrencyDetailed,
    isLoading: boolean
}

type CurrencyShortInfo = {
    id: number;
    name: string;
    symbol: string;
    quote: {
        price: number,
        volume_30d: number,
        market_cap: number,
        percent_change_24h: number
    }
}

type CurrencyDetailed = {

}

export const loadPageType = "LIST:LOAD_PAGE/SUCCESS";
export const loadPageTrigger = "LIST:LOAD_PAGE/TRIGGER";
export const loadItemType = "ITEM:LOAD/TRIGGER";
export const loadItemTrigger = "ITEM:LOAD/TRIGGER";
