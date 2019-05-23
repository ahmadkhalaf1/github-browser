import axios from "axios";
import { Request, Response } from "express";
import Joi from "joi";
import { accessToken } from "../configuration/config";
const endPoint = "https://api.github.com";
const searchEndPoint = `${endPoint}/search/repositories`;
const bookmarkEndPoint = `${endPoint}/user/starred`;

const config = {
  headers: {
    "Authorization": accessToken,
    "Content-Length": 0,
    "Content-Type": "application/json",
  },
};

/**
 * GET /api/v1/git/repos/{term}
 * Search for git hub repos by name.
 */
export let searchForRepos = (req: Request, res: Response) => {
  const { term } = req.params;
  axios
    .get(`${searchEndPoint}?q=${term}`, config)
    .then((response: any) => {
      // handle success
      if (response.data.total_count === 0) {
        return res.status(404).json({
          items: [],
          message: "No result found",
        });
      }

      return res.status(200).json({
        items: response.data.items,
        message: "Search result is ready",
      });
    })
    .catch((error: any) => {
      // handle error
      return res.status(400).json("Error while searching repositories");
    });
};

/**
 * GET /api/v1/git/repos/bookmark
 * List all bookmarked repos
 */
export let listBookmarkedRepos = (req: Request, res: Response) => {
  axios
    .get(`${bookmarkEndPoint}`, config)
    .then((response: any) => {
      // handle success
      if (response.data.length <= 0) {
        return res.status(404).json({ data: [], message: "No result found" });
      }

      return res
        .status(200)
        .json({ data: response.data });
    })
    .catch((error: any) => {
      // handle error
      return res
        .status(400)
        .json({ data: [], message: "Error while fetching bookmarked repos" });
    });
};

/**
 * PUT /api/v1/git/repos/bookmark
 * ownerName = string
 * repoName = string
 * Remove bookmark repo by owner and repoName
 */
export let bookmarkRepos = (req: Request, res: Response) => {
  const { repoName, ownerName } = req.body;
  // another way to use Joi is by applying it as a middleware before calling this function
  const schema = {
    ownerName: Joi.string().required(),
    repoName: Joi.string().required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).json(result.error);
  }
  axios
    .put(`${bookmarkEndPoint}/${ownerName}/${repoName}`, {}, config)
    .then((response: any) => {
      // handle success

      return res.status(200).json("Repository bookmarked successfully");
    })
    .catch((error: any) => {
      // handle error
      return res.status(400).json("Error while bookmark repository");
    });
};

/**
 * Delete /api/v1/git/repos/bookmark/{ownerName}/{repoName}
 * ownerName = string
 * repoName = string
 * Remove bookmark repo by owner and repoName
 */
export let removeReposBookmark = (req: Request, res: Response) => {
  const { repoName, ownerName } = req.params;
  axios
    .delete(`${bookmarkEndPoint}/${ownerName}/${repoName}`, config)
    .then((response: any) => {
      // handle success
      return res.status(200).json("Bookmark removed successfully");
    })
    .catch((error: any) => {
      // handle error
      return res.status(400).json("Error while removing bookmark");
    });
};
