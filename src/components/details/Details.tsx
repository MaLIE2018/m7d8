import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-query";

interface RouterProps {
  id: string;
}

interface TopicDetailProps extends RouteComponentProps<RouterProps> {
  // any other props (leave empty if none)
}

export const Details = ({ match }: TopicDetailProps) => {
  const { isLoading, data } = useQuery(
    ["song"],
    () =>
      fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/track/${match.params.id}`
      ).then((res) => res.json()),
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );
  console.log("data:", data);

  return isLoading ? (
    <>
      <h1>Details</h1>
      <div>Loading</div>
    </>
  ) : (
    <>
      <div>
        <img src={data.album.cover_xl} alt='albumImg' width='90%' />
        <h1>{data.title}</h1>
      </div>
    </>
  );
};
