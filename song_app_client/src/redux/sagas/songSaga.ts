import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  addSongSuccess,
  addSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
} from '../slices/songSlice';
import { FetchSongsRequestPayload, Song } from '../../types/songTypes';

function* fetchSongs(action: ReturnType<typeof fetchSongsRequest>): Generator<any, void, unknown> {
  try {
    const { genre, album }: FetchSongsRequestPayload = action.payload;
    const response= yield call(axios.get, 'http://localhost:8000/song_app/songs', {
      params: { genre, album },
    });
    const songs: Song[] = response.data;
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    yield put(fetchSongsFailure((error as Error).message));
  }
}

function* watchFetchSongs() {
  yield takeEvery(fetchSongsRequest.type, fetchSongs);
}

function* addNewSong(action: ReturnType<typeof addSong>):Generator<any, void, unknown> {
  try {
    const response = yield call(axios.post, 'http://localhost:8000/song_app/songs', action.payload);
    yield put(addSongSuccess(response.data));
    yield put(fetchSongsRequest({ genre: '', album: '' })); 
  } catch (error) {
    yield put(addSongFailure((error as Error).message));
  }
}

function* watchAddSong() {
  yield takeLatest(addSong.type, addNewSong);
}

function* updateSongData(action: ReturnType<typeof updateSong>):Generator<any, void, unknown> {
  try {
    const response = yield call(axios.put, `http://localhost:8000/song_app/songs/${action.payload._id}`, action.payload);
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure((error as Error).message));
  }
}

function* watchUpdateSong() {
  yield takeLatest(updateSong.type, updateSongData);
}

function* deleteSongData(action: ReturnType<typeof deleteSong>):Generator<any, void, unknown> {
  try {
    const response = yield call(axios.delete, `http://localhost:8000/song_app/songs/${action.payload}`);
    yield put(deleteSongSuccess(response.data));
  } catch (error) {
    yield put(deleteSongFailure((error as Error).message));
  }
}

function* watchDeleteSong() {
  yield takeLatest(deleteSong.type, deleteSongData);
}


export { watchFetchSongs, watchAddSong, watchUpdateSong, watchDeleteSong };