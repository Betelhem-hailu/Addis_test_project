import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../../types/songTypes";

export interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
  success: false
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest(state, action: PayloadAction<{ genre?: string; album?: string }>) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    addSongSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
    },
    addSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSong: (state, action: PayloadAction<Song>) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) state.songs[index] = action.payload;
    },
    updateSongSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSong: (state, action: PayloadAction<number>) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    deleteSongSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = songSlice.actions;

export default songSlice.reducer;
