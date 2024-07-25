import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
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

const API = "https://addistestproject-production.up.railway.app/"


// Type assertion for Axios call responses
function* fetchSongs(action: ReturnType<typeof fetchSongsRequest>) {
  try {
    const { genre, album }: FetchSongsRequestPayload = action.payload;
    const response: AxiosResponse<Song[]> = (yield call(axios.get, API + 'songs', {
      params: { genre, album },
    })) as AxiosResponse<Song[]>;
    const songs: Song[] = response.data;
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    yield put(fetchSongsFailure((error as Error).message));
  }
}

function* watchFetchSongs() {
  yield takeEvery(fetchSongsRequest.type, fetchSongs);
}

function* addNewSong(action: ReturnType<typeof addSong>) {
  try {
    const response: AxiosResponse<Song> = (yield call(axios.post, API + 'songs', action.payload)) as AxiosResponse<Song>;
    const song: Song = response.data;
    yield put(addSongSuccess(song));
    yield put(fetchSongsRequest({ genre: '', album: '' })); 
  } catch (error) {
    yield put(addSongFailure((error as Error).message));
  }
}

function* watchAddSong() {
  yield takeLatest(addSong.type, addNewSong);
}

function* updateSongData(action: ReturnType<typeof updateSong>) {
  try {
    const response: AxiosResponse<Song> = (yield call(axios.put, API + `songs/${action.payload._id}`, action.payload)) as AxiosResponse<Song>;
    yield put(updateSongSuccess(response.data));
    yield put(fetchSongsRequest({ genre: '', album: '' })); 
  } catch (error) {
    yield put(updateSongFailure((error as Error).message));
  }
}

function* watchUpdateSong() {
  yield takeLatest(updateSong.type, updateSongData);
}

function* deleteSongData(action: ReturnType<typeof deleteSong>) {
  try {
    const response: AxiosResponse<Song> = (yield call(axios.delete, API + `songs/${action.payload}`)) as AxiosResponse<Song>;
    yield put(deleteSongSuccess(response.data));
    yield put(fetchSongsRequest({ genre: '', album: '' })); 
  } catch (error) {
    yield put(deleteSongFailure((error as Error).message));
  }
}

function* watchDeleteSong() {
  yield takeLatest(deleteSong.type, deleteSongData);
}

export { watchFetchSongs, watchAddSong, watchUpdateSong, watchDeleteSong };
