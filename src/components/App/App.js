import React, { Component } from "react";
import styles from "./App.module.css";
import APIController from "../APIController/APIController";
import SearchSidebar from "../SearchSidebar/SearchSidebar";

class App extends Component {
  state = {
    collage: [],
    token: null,
    APIControls: null,
  };

  async componentDidMount() {
    const newAPI = new APIController();
    const token = await newAPI.getToken();
    this.setState({ token: token, APIControls: newAPI });
  }

  // async getPlaylistsHandler(genreId) {
  //   const playlists = await this.state.APIControls.getPlaylistByGenre(
  //     this.state.token,
  //     genreId
  //   );
  //   this.setState({ playlists: playlists });
  // }

  // async getTracksHandler(trackEndPoint) {
  //   const tracks = await this.state.APIControls.getTracks(
  //     this.state.token,
  //     trackEndPoint
  //   );
  //   this.setState({ tracks: tracks });
  // }

  // async getTrackHandler(trackEndPoint) {
  //   const track = await this.state.APIControls.getTrack(
  //     this.state.token,
  //     trackEndPoint
  //   );
  //   console.log(track);
  //   this.setState({ track: track });
  // }

  render() {
    return (
      <div className={styles.app}>
        <SearchSidebar
          APIControls={this.state.APIControls}
          token={this.state.token}
        />
      </div>
    );
  }
}

export default App;

/* {this.state.genres.map((genre) => (
  <p key={genre.id} onClick={() => this.getPlaylistsHandler(genre.id)}>
    {genre.name}
  </p>
))}
{this.state.playlists.map((playlist) => {
  return (
    <p
      key={playlist.id}
      onClick={() => this.getTracksHandler(playlist.tracks.href)}
    >
      {playlist.name}, {playlist.tracks.href}
    </p>
  );
})}
{this.state.tracks.map((el) => {
  return (
    <p
      key={el.track.id}
      onClick={() => this.getTrackHandler(el.track.href)}
    >
      {el.track.name}
    </p>
  );
})}
{this.state.track && (
  <>
    <p>
      {this.state.track.name}, {this.state.track.artists[0].name}
    </p>
    <img
      src={this.state.track.album.images[0].url}
      alt="album cover"
    ></img>
  </>
)} */
