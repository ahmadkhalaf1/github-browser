import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import path from "path";
import { cache } from "./services/cache.service";

// Controllers (route handlers)
import * as githubController from "./controllers/gitHubController";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 1337);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  next();
});

/**
 * API routes.
 */

app.get("/api/v1/repos/q=:term", cache(10), githubController.searchForRepos);
app.get("/api/v1/repos/bookmarks", cache(10), githubController.listBookmarkedRepos);
app.post("/api/v1/repos/bookmarks", githubController.bookmarkRepos);
app.delete("/api/v1/repos/bookmarks/:ownerName/:repoName", githubController.removeReposBookmark);

export default app;
