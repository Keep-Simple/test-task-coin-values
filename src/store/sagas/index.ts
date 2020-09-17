import {all, call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {Info} from 'luxon';
import {
    CurrencyDetailed,
    CurrencyShortInfo,
    loadItemFulfill,
    loadItemSuccess,
    loadItemTrigger,
    loadPageFulfill,
    loadPageSuccess,
    loadPageTrigger
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
        const res = yield call(axios.get, `https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${action.payload}&interval=day&data_points=8`);

        const p = res.data.data[0];

        const toSave: CurrencyDetailed = {
            name: p.name,
            market_cap: p.market_cap,
            market_dominance: p.market_dominance,
            alt_rank: p.alt_rank,
            tweets: p.tweets,
            news: p.news,
            price: p.price,
            volume_24h: p.volume_24h,
            sparkline: p.timeSeries.slice(0, -1).map((t: any, i: number) => ({
                time: Info.weekdays()[i],
                market_cap: t.market_cap / Math.pow(10, 9),
                market_cap_global: t.market_cap_global / Math.pow(10, 9)
            }))
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
