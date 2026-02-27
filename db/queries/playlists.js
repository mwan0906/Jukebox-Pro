import db from "#db/client";

export async function createPlaylist(name, description, owner_id) {
  const sql = `
  INSERT INTO playlists
    (name, description, owner_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description, owner_id]);
  return playlist;
}

export async function getPlaylists() {
  const sql = `
  SELECT *
  FROM playlists
  `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function getPlaylistsByUserId(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE owner_id = $1
  `;
  const { rows: playlists } = await db.query(sql, [id]);
  return playlists;
}

export async function getPlaylistsByTrack(track_id, user_id) {
  const sql = `
  SELECT playlists.description, playlists.id, playlists.name
  FROM playlists
    JOIN playlists_tracks
    ON playlists.id = playlists_tracks.playlist_id
  WHERE playlists_tracks.track_id = $1
  AND playlists.owner_id = $2
  `;
  const { rows: playlists } = await db.query(sql, [track_id, user_id]);
  return playlists;
}
