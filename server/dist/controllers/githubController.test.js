"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("Test list bookmarks repositories", () => {
    test("It should response with 200", (done) => __awaiter(this, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .get("/api/v1/repos/bookmarks")
            .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    }), 30000);
});
describe("Test search bookmarks repositories", () => {
    test("It should response with 200", (done) => __awaiter(this, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .get("/api/v1/repos/q=reactjs")
            .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    }), 30000);
});
describe("Test set bookmark repositories", () => {
    test("It should response with 200", (done) => __awaiter(this, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .post("/api/v1/repos/bookmarks")
            .send({ ownerName: "ntkme", repoName: "react-github-btn" })
            .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    }), 30000);
});
describe("Test remove bookmark repositories", () => {
    test("It should response with 200", (done) => __awaiter(this, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .delete("/api/v1/repos/bookmarks/ntkme/react-github-btn")
            .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    }), 30000);
});
describe("Test search bookmarks repositories", () => {
    test("It should response with 404", (done) => __awaiter(this, void 0, void 0, function* () {
        yield supertest_1.default(app_1.default)
            .get("/api/v1/repos/q=babelhara")
            .then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    }), 30000);
});
//# sourceMappingURL=githubController.test.js.map