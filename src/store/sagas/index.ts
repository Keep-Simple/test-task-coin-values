import {all, call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {loadItemFulfill, loadItemTrigger, loadItemType, loadPageFulfill, loadPageTrigger, loadPageType} from "../types";

function* loadPage(action: any) {
    try {
        const {start, size} = action.payload;
        const res = yield call(axios.get, `cryptocurrency/listings/latest?start=${start + 1}&limit=${size}`);

        const toSave = res.data.data.map((i: any) => ({
            id: i.id,
            name: i.name,
            symbol: i.symbol,
            price: i.quote.USD.price.toFixed(),
            volume: i.quote.USD.volume_24h.toFixed(),
            market_cap: i.quote.USD.market_cap.toFixed(),
            percent_change_24h: i.quote.USD.percent_change_24h.toFixed(2)
        }))

        yield put({
            type: loadPageType, payload: {
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
        const res = yield call(axios.get, ``);

        yield put({type: loadItemType, payload: res.data.data})
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
