# ArmoniaMusicPlayer
Music Player for Armonia app developed in React Native

## First Milestone

Creating Basic Armonia Music Player app with following features
1. Login User
2. List of moods
3. List of tracks under moods
4. Track player
5. Scheduling moods
6. Downloading Tracks

Task List
* UI 
    * Mood List
    * Tracks in Moods
    * Profile
    * <del>Login<del>
* API Integration
    * Get moods
    * Get Tracks
    * Delete track 
    * Track Download URl
    * <del>Login</del>
    * <del>Logout</del>
* Download tracks in background
* Schedule tracks as based on mood settings.

## List of APIs

* Authentication
    * POST: Login: /v1/auth/login/
    * GET: Logout: /v1/auth/logout/

* Get user libraries (Profile)
    * GET: /v1/user/library

* Get sub directory for a given user
    * GET: /v1/library/directory/

* Get tracks for a given sub directory (Mood)
    * GET: /v1/mood/tracks/<library_id>


Replace base server url in Urls.js as required