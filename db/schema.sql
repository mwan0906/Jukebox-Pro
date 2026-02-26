DROP TABLE IF EXISTS playlists_tracks;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS users;

CREATE TABLE tracks (
  id serial PRIMARY KEY,
  name text NOT NULL,
  duration_ms integer NOT NULL
 );

CREATE TABLE playlists (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  owner_id integer NOT NULL
);

CREATE TABLE playlists_tracks (
  id serial PRIMARY KEY,
  playlist_id integer NOT NULL,
  track_id integer NOT NULL,
  UNIQUE (playlist_id, track_id)
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL
 );

CREATE UNIQUE INDEX on "playlists_tracks" ("playlist_id", "track_id");

ALTER TABLE "playlists_tracks" ADD FOREIGN KEY ("playlist_id") REFERENCES "playlists" ("id") ON DELETE CASCADE;
ALTER TABLE "playlists_tracks" ADD FOREIGN KEY ("track_id") REFERENCES "tracks" ("id") ON DELETE CASCADE;
ALTER TABLE "playlists" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE CASCADE;