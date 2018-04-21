import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put} from 'redux-saga/effects';
import axios from 'axios';

//makes a middleware
const sagaMiddleware  = createSagaMiddleware();

function * rootSaga () {
    yield takeEvery('GET_REFLECTIONS', getReflectionsSaga);
    yield takeEvery('ADD_REFLECTION', postReflectionSaga);
    yield takeEvery('UPDATE_REFLECTION', putReflectionSaga);
    yield takeEvery('DELETE_REFLECTION', deleteReflectionSaga); 
}

function * getReflectionsSaga () {
    console.log('in getReflections Saga');
    try {
        const elementsResponse = yield call(axios.get, '/api/reflections');
        console.log(elementsResponse);
        yield put({
            type: 'ALL_REFLECTIONS',
            payload: elementsResponse.data
        })
    } catch (error) {}
}

function* postReflectionSaga(action){
    console.log('in postReflectionSaga ', action.payload);

    try {
    const reflectionResponse = yield call(axios.post, '/api/reflections', action.payload);
    console.log(reflectionResponse)
    yield put({
        type: 'GET_REFLECTIONS',
    })
} catch (error) {}
}

function* putReflectionSaga(action){
    console.log('in putReflectionSaga ', action.payload);

    try {
    const reflectionResponse = yield call(axios.put, `/api/reflections/${action.payload.id}` , action.payload);
    console.log(reflectionResponse)
    yield put({
        type: 'GET_REFLECTIONS',
    })
} catch (error) {}
}

function* deleteReflectionSaga(action){
    console.log('in deleteReflectionSaga ', action.payload);

    try {
    const reflectionResponse = yield call(axios.delete, `/api/reflections/${action.payload.id}` , action.payload);
    console.log(reflectionResponse)
    yield put({
        type: 'GET_REFLECTIONS',
    })
} catch (error) {}
}

const allReflectionsReducer = (state = [], action) => {
    if (action.type === 'ALL_REFLECTIONS') {
        return action.payload;
    }
    return state;
}

const storeInstance = createStore(

    combineReducers({
        // currentReflectionReducer,
        allReflectionsReducer     

    }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
