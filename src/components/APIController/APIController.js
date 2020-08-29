import axios from "axios";

class APIController {
  clientId = "6b8f26f1088246968d5e5c28b028c519";
  clientSecret = "f9a0fa7d9def49599a4f6c588753e449";

  getToken = async () => {
    const result = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " + btoa(this.clientId + ":" + this.clientSecret),
        },
      }
    );

    // ALTERNATE
    // const result = await axios({
    //   url: "https://accounts.spotify.com/api/token",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: "Basic " + btoa(this.clientId + ":" + this.clientSecret),
    //   },
    //   data: "grant_type=client_credentials",
    // }).catch((error) => console.log(error.response));

    // FETCH API
    // const result = await fetch("https://accounts.spotify.com/api/token", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: "Basic " + btoa(this.clientId + ":" + this.clientSecret),
    //   },
    //   body: "grant_type=client_credentials",
    // });
    // const data = await result.json();

    return result.data.access_token;
  };

  getGenres = async (token) => {
    const result = await axios.get(
      `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.categories.items;
  };

  getPlaylistByGenre = async (token, genreId) => {
    const limit = 10;

    const result = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.playlists.items;
  };

  getTracks = async (token, tracksEndPoint) => {
    const limit = 10;

    const result = await axios.get(`${tracksEndPoint}?limit=${limit}`, {
      headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data.items;
  };

  getTrack = async (token, trackEndPoint) => {
    const result = await axios.get(`${trackEndPoint}`, {
      headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data;
  };

  getSearchResults = async (token, type, query) => {
    const limit = 50; // max limit

    const result = await fetch(
      `https://api.spotify.com/v1/search?type=${type}&limit=${limit}&q=${query}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.albums.items;
  };
}

export default APIController;
