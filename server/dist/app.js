"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const cache_service_1 = require("./services/cache.service");
// Controllers (route handlers)
const githubController = __importStar(require("./controllers/gitHubController"));
// Create Express server
const app = express_1.default();
// Express configuration
app.set("port", process.env.PORT || 1337);
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(helmet_1.default());
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
/**
 * API routes.
 */
app.get("/api/v1/repos/q=:term", cache_service_1.cache(10), githubController.searchForRepos);
app.get("/api/v1/repos/bookmarks", cache_service_1.cache(10), githubController.listBookmarkedRepos);
app.post("/api/v1/repos/bookmarks", githubController.bookmarkRepos);
app.delete("/api/v1/repos/bookmarks/:ownerName/:repoName", githubController.removeReposBookmark);
exports.default = app;
//# sourceMappingURL=app.js.map