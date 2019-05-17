"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const joi_1 = __importDefault(require("joi"));
const config_1 = require("../configuration/config");
const endPoint = "https://api.github.com";
const searchEndPoint = `${endPoint}/search/repositories`;
const bookmarkEndPoint = `${endPoint}/user/starred`;
const config = {
    headers: {
        "Authorization": config_1.accessToken,
        "Content-Length": 0,
        "Content-Type": "application/json",
    },
};
/**
 * GET /api/v1/git/repos/{term}
 * Search for git hub repos by name.
 */
exports.searchForRepos = (req, res) => {
    const { term } = req.params;
    axios_1.default
        .get(`${searchEndPoint}?q=${term}`, config)
        .then((response) => {
        // handle success
        if (response.data.total_count === 0) {
            return res.status(404).json("No result found");
        }
        return res.status(200).json({
            items: response.data.items,
            message: "Search result is ready",
        });
    })
        .catch((error) => {
        // handle error
        return res.status(400).json("Error while searching repositories");
    });
};
/**
 * GET /api/v1/git/repos/bookmark
 * List all bookmarked repos
 */
exports.listBookmarkedRepos = (req, res) => {
    axios_1.default
        .get(`${bookmarkEndPoint}`, config)
        .then((response) => {
        // handle success
        if (response.data.length <= 0) {
            return res.status(404).json("No result found");
        }
        return res.status(200).json(response.data);
    })
        .catch((error) => {
        // handle error
        return res.status(400).json("Error while fetching bookmarked repos");
    });
};
/**
 * PUT /api/v1/git/repos/bookmark
 * ownerName = string
 * repoName = string
 * Remove bookmark repo by owner and repoName
 */
exports.bookmarkRepos = (req, res) => {
    const { repoName, ownerName } = req.body;
    // another way to use Joi is by applying it as a middleware before calling this function
    const schema = {
        ownerName: joi_1.default.string().required(),
        repoName: joi_1.default.string().required(),
    };
    const result = joi_1.default.validate(req.body, schema);
    if (result.error) {
        return res.status(400).json(result.error);
    }
    axios_1.default
        .put(`${bookmarkEndPoint}/${ownerName}/${repoName}`, {}, config)
        .then((response) => {
        // handle success
        return res.status(200).json("Repository bookmarked successfully");
    })
        .catch((error) => {
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
exports.removeReposBookmark = (req, res) => {
    const { repoName, ownerName } = req.params;
    axios_1.default
        .delete(`${bookmarkEndPoint}/${ownerName}/${repoName}`, config)
        .then((response) => {
        // handle success
        return res.status(200).json("Bookmark removed successfully");
    })
        .catch((error) => {
        // handle error
        return res.status(400).json("Error while removing bookmark");
    });
};
//# sourceMappingURL=gitHubController.js.map