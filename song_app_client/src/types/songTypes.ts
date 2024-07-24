export interface Song {
    _id: number;
    title: string;
    artist: string;
    album: string;
    genre: string;
  }

  export interface SongNew {
    title: string;
    artist: string;
    genre: string;
    album: string;
  }

  export interface FetchSongsRequestPayload {
    genre?: string;
    album?: string;
  }