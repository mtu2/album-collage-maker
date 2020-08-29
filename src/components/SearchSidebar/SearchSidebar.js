import React, { Component } from "react";
import styles from "./SearchSidebar.module.css";

class SearchSidebar extends Component {
  state = {
    searchAlbum: "",
    searchResults: [],
  };

  async getSearchResultsHandler(query) {
    let searchResults = [];
    if (query) {
      searchResults = await this.props.APIControls.getSearchResults(
        this.props.token,
        "album",
        query
      );
    }
    this.setState({ searchResults: searchResults });
  }

  handleSearchAlbumChange = (ev) => {
    console.log(ev.target.value);
    this.getSearchResultsHandler(ev.target.value);
    this.setState({ searchAlbum: ev.target.value });
  };

  render() {
    return (
      <div className={styles.searchSidebar}>
        <input
          type="text"
          value={this.state.searchAlbum}
          placeholder="Search for an album..."
          onChange={this.handleSearchAlbumChange}
        />
        <div className={styles.searchResults}>
          {this.state.searchResults.map((result) => {
            console.log(result);
            return (
              <div className={styles.album} key={result.id}>
                <img src={result.images[0].url} alt="" />
                <div className={styles.albumDetails}>
                  <h3>{result.name}</h3>
                  <p>{result.artists[0].name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchSidebar;
