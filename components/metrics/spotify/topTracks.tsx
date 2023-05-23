import useSWR from "swr";

import fetcher from "lib/fetcher";
import Track from "./track";

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};

export default function Tracks() {
  const { data } = useSWR<TopTracks>("/api/spotify/top-tracks", fetcher);

  if (!data) {
    return null;
  }

  return (
    <>
      {data.tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} {...track} />
      ))}
    </>
  );
}
