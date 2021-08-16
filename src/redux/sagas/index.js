import { all } from 'redux-saga/effects'
import { postsSaga } from './postsSaga';

function* rootSaga(){
    yield all([
        postsSaga()
    ])
}

export default rootSaga;