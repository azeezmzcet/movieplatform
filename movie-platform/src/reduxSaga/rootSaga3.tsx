import { all } from 'redux-saga/effects';
import { watchFetchUserSaga } from './userSaga2';

export default function* rootSaga() {
  yield all([
    watchFetchUserSaga(),
    // Add other watchers here
  ]);
}
