import {all, call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {loadItemTrigger, loadItemType, loadPageTrigger, loadPageType} from "../types";

function* loadPage(action: any) {
    try {
        const res = yield call(axios.get, `/v1/cryptocurrency/listings/latest`);

        console.log(res);

        yield put({type: loadPageType, payload: res.data.data})
    } catch (e) {
        alert("Failed loading list");
    } finally {
        yield put({type: "fulfill"});
    }
}

function* loadItem(action: any) {
    try {
        const res = yield call(axios.get, ``);

        console.log(res);

        yield put({type: loadItemType, payload: res.data.data})
    } catch (e) {
        alert("Failed loading item");
    } finally {
        yield put({type: "fulfill"});
    }
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(loadItemTrigger, loadItem),
        yield takeEvery(loadPageTrigger, loadPage)
    ]);
}
