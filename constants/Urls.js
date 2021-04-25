export const SERVER_URL = "http://128.199.152.128/";
export const LOCAL_URL = "http://192.168.1.2:8000/";
export const BASE_URL = SERVER_URL;

// for authentication
export const LOGIN_URL = BASE_URL + "api/v1/auth/login/";
export const LOGOUT_URL = BASE_URL + "api/v1/auth/logout/";

// for user library
export const USER_LIBRARY_URL = BASE_URL + "api/v1/user/library/";
// for libraries sub directory
export const GET_PLAYLISTS = BASE_URL + "api/v1/library/directory/";
// for tracks for a given sub directory
export const GET_TRACKS = BASE_URL + "api/v1/library/tracks/"; //add id ahead