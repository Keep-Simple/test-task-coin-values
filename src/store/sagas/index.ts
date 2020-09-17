import {all, call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {
    loadItemFulfill,
    loadItemTrigger,
    loadItemSuccess,
    loadPageFulfill,
    loadPageTrigger,
    loadPageSuccess,
    CurrencyShortInfo, CurrencyDetailed
} from "../types";

function* loadPage(action: any) {
    try {
        const {start, size} = action.payload;
        const res = yield call(axios.get, `cryptocurrency/listings/latest?start=${start + 1}&limit=${size}`);

        const toSave: CurrencyShortInfo[] = res.data.data.map((i: any) => ({
            id: i.id,
            name: i.name,
            symbol: i.symbol,
            price: i.quote.USD.price.toFixed(),
            volume: i.quote.USD.volume_24h.toFixed(),
            market_cap: i.quote.USD.market_cap.toFixed(),
            percent_change_24h: i.quote.USD.percent_change_24h.toFixed(2)
        }))

        yield put({
            type: loadPageSuccess, payload: {
                items: toSave,
                total: res.data.status.total_count
            }
        })
    } catch (e) {
        alert("Failed loading list");
    } finally {
        yield put({type: loadPageFulfill});
    }
}

function* loadItem(action: any) {
    try {
        const key = process.env.REACT_APP_CMC_API_KEY2;
        const res = yield call(axios.get, `https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${action.payload}`);

        const p = res.data.data[0];

        const toSave: CurrencyDetailed = {
            name: p.name,
            market_cap: p.market_cap,
            market_dominance: p.market_dominance,
            max_supply: p.max_supply,
            price: p.price,
            volume_24h: p.volume_24h,
            sparkline: p.timeSeries.map((i: any) => i.market_cap)
        }

        yield put({type: loadItemSuccess, payload: toSave})
    } catch (e) {
        alert("Failed loading item");
    } finally {
        yield put({type: loadItemFulfill});
    }
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(loadItemTrigger, loadItem),
        yield takeEvery(loadPageTrigger, loadPage)
    ]);
}
