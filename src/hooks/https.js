import { toast } from "react-toastify";

const baseEndPoint = "http://localhost:1337/api/v1/repos";

export const useSearchRepos = term => {
  return fetch(`${baseEndPoint}/q=${term}`);
};

export const useBookmarkRepo = (owner, repo) => {
  return fetch(`${baseEndPoint}/bookmarks`, {
    method: "POST",
    body: JSON.stringify({ ownerName: owner, repoName: repo }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const useListBookmarks = () => {
  return fetch(`${baseEndPoint}/bookmarks`);
};

export const useRemoveBookmark = (owner, repo) => {
  return fetch(`${baseEndPoint}/bookmarks/${owner}/${repo}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const notify = (type, message) => {
  // pass types : success , error , info , warning
  toast[type](message);
};

export const formatStars = (stars) => {
  return stars !== "" ? stars.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'): 0;
}