import { all, fork } from 'redux-saga/effects';
import { watchFetchSongs, watchAddSong, watchUpdateSong, watchDeleteSong } from './sagas/songSaga'; // Import your sagas

export default function* rootSaga() {
  yield all([
    fork(watchFetchSongs),
    fork(watchAddSong),
    fork(watchUpdateSong),
    fork(watchDeleteSong),
  ]);
}
