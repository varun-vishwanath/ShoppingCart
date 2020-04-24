// import { delay } from "redux-saga";
import { call, all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import actions from "./action";

let headers = {
    'Content-Type': 'application/json'
};

export async function get(url) {
    return new Promise(function (resolve, reject) {
        try {
            const options = {
                method: 'GET',
                headers: headers,
            };
            fetch(url, options)
                .then(res => {
                    if (200 === res.status) {
                        return res.json();
                    } else {
                        const error = { response: res };
                        console.log("Error");
                    }
                })
                .then(res => {
                    resolve(res);
                });

        } catch (error) {
            console.log("Error");
        }
    });
}

const fetchListData = async () =>
    await get("https://api.jsonbin.io/b/5e8c3ad0ff9c906bdf1d5380");
// await get("https://api.jsonbin.io/b/5e8c3a45af7c476bc47e477d");

function* onFetchItem() {
    // yield delay(4000);
    console.log("Inside sAga On Fethc Item")
    // let res = localStorage.getItem("parentReleaseData")
    // yield put({ type: "FETCH_ITEM_SUCCESS", result: res });

    let errMsg = "Error in fetching data."
    try {
        const searchResult = yield call(fetchListData);//Saga is suspended until the Promise returned by call
        if (searchResult !== undefined) {
            if (searchResult.items.length > 0) {
                yield put(actions.onFetchItemSuccess(searchResult));//which instructs the middleware to dispatch a action
            } else {
                yield put(actions.onFetchItemError(errMsg));
            }
        }
    } catch (error) {
        // notification('error', "Something went wrong. Please try again later.");
        yield put(actions.onFetchItemError(errMsg));
    }
}


export default function* rootSaga() {
    yield takeEvery("FETCH_ITEM", onFetchItem);
}