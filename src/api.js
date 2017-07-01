// @flow
import axios from "axios";

type User = {
  name: string,
  login: string,
  avatar_url: string,
  bio: string
};

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRECT_ID";
var params = "?client_id=" + id + "&client_secrect=" + sec;

// export const fetchPopularRepos = (lang: string) => {
//   var encodedURI: string = window.encodeURI(
//     "https://api.github.com/search/repositories?q=stars:>1 + language:" +
//       lang +
//       "&sort=stars&order=desc&type=Repositories"
//   );
//   return axios
//     .get(encodedURI)
//     .then(response => response.data.items)
//     .catch(error => console.log(error));
// };
export const fetchPopularRepos = () => {
  var encodedURI: string = window.encodeURI(
    "https://api.github.com/search/repositories?q=stars:>1 + language:" +
      "all" +
      "&sort=stars&order=desc&type=Repositories"
  );
  return axios
    .get(encodedURI)
    .then(response => response.data.items)
    .catch(error => console.log(error));
};

export function getProfile(username: string) {
  return axios
    .get(`https://api.github.com/users/${username}${params}`)
    .then(user => user);
}
