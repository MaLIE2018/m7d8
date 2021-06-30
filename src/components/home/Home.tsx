import React, { useState, ChangeEvent } from "react";
import styles from "./styles";
import { RouteComponentProps, Link } from "react-router-dom";
import { useQuery } from "react-query";
const { HomeDiv, List } = styles;

interface props {
  title?: string;
}

type componentProps = props & RouteComponentProps;

export const Home = ({ title }: componentProps) => {
  const [search, setSearch] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as "search";
    setSearch(e.target.value);
  };

  const { isLoading, data } = useQuery(
    ["songs", search],
    () =>
      fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${search}`
      ).then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );

  return (
    <HomeDiv>
      <h1>{title}</h1>
      <label htmlFor='search'>Search</label>
      <input
        type='text'
        id='search'
        name='search'
        onChange={(e) => handleInput(e)}></input>

      {isLoading ? (
        "Loading"
      ) : (
        <List>
          {data.data.map((song: { title: string; id: string }) => {
            return (
              <Link to={`/details/${song.id}`}>
                <li key={song.id}>{song.title}</li>
              </Link>
            );
          })}
        </List>
      )}
    </HomeDiv>
  );
};
