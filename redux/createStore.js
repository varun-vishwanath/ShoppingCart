import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';



import rootSaga from "../redux/rootSaga";
import rootReducer from "../redux/rootReducer";

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

function configureStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        initialState,
        bindMiddleware([sagaMiddleware])
    )

    store.sagaTask = sagaMiddleware.run(rootSaga)

    return store
}

export default configureStore;