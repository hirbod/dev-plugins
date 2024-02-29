"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatsEntry = exports.listStatsEntries = exports.addStatsEntry = exports.createStatsFile = exports.validateStatsFile = exports.getStatsMetdata = exports.getStatsPath = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var package_json_1 = require("../../package.json");
var env_1 = require("../utils/env");
var file_1 = require("../utils/file");
/** The default location of the metro stats file */
function getStatsPath(projectRoot) {
    return path_1.default.join(projectRoot, '.expo/stats.json');
}
exports.getStatsPath = getStatsPath;
/** The information to validate if a stats file is compatible with this library version */
function getStatsMetdata() {
    return { name: package_json_1.name, version: package_json_1.version };
}
exports.getStatsMetdata = getStatsMetdata;
/** Validate if the stats file is compatible with this library version */
function validateStatsFile(statsFile, metadata) {
    if (metadata === void 0) { metadata = getStatsMetdata(); }
    return __awaiter(this, void 0, void 0, function () {
        var line, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fs_1.default.existsSync(statsFile)) {
                        throw new Error("Stats file \"".concat(statsFile, "\" not found."));
                    }
                    if (env_1.env.EXPO_NO_STATS_VALIDATION) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, file_1.readFirstLine)(statsFile)];
                case 1:
                    line = _a.sent();
                    data = line ? JSON.parse(line) : {};
                    if (data.name !== metadata.name || data.version !== metadata.version) {
                        throw new Error("Stats file \"".concat(statsFile, "\" is incompatible with this version of the plugin."));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.validateStatsFile = validateStatsFile;
/**
 * Create or overwrite the stats file with basic metadata.
 * This metdata is used by the API to determine version compatibility.
 */
function createStatsFile(projectRoot) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = getStatsPath(projectRoot);
                    return [4 /*yield*/, fs_1.default.promises.mkdir(path_1.default.dirname(filePath), { recursive: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fs_1.default.promises.writeFile(filePath, JSON.stringify(getStatsMetdata()) + '\n')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createStatsFile = createStatsFile;
/**
 * Add a new stats entry to the stats file.
 * This is appended on a new line, so we can load the stats selectively.
 */
function addStatsEntry(projectRoot, stats) {
    return __awaiter(this, void 0, void 0, function () {
        var entry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    entry = JSON.stringify([
                        stats.platform,
                        stats.projectRoot,
                        stats.entryPoint,
                        stats.preModules,
                        stats.graph,
                        stats.options,
                    ]);
                    console.log('Adding stats entry for platform', stats.platform);
                    return [4 /*yield*/, fs_1.default.promises.appendFile(getStatsPath(projectRoot), entry + '\n')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.addStatsEntry = addStatsEntry;
/**
 * List all stats entries without parsing the data.
 * This only reads the bundle name, and adds a line number as ID.
 */
function listStatsEntries(statsFile) {
    return __awaiter(this, void 0, void 0, function () {
        var bundlePattern, entries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bundlePattern = /^\["([^"]+)","([^"]+)","([^"]+)/;
                    entries = [];
                    return [4 /*yield*/, (0, file_1.mapLines)(statsFile, function (index, line) {
                            var _a;
                            if (index === 1)
                                return;
                            var _b = (_a = line.match(bundlePattern)) !== null && _a !== void 0 ? _a : [], _ = _b[0], platform = _b[1], projectRoot = _b[2], entryPoint = _b[3];
                            if (platform && projectRoot && entryPoint) {
                                entries.push({
                                    id: index,
                                    platform: platform,
                                    projectRoot: projectRoot,
                                    absolutePath: entryPoint,
                                    relativePath: path_1.default.relative(projectRoot, entryPoint),
                                });
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, entries];
            }
        });
    });
}
exports.listStatsEntries = listStatsEntries;
/**
 * Get the stats entry by id or line number, and parse the data.
 */
function getStatsEntry(statsFile, id) {
    return __awaiter(this, void 0, void 0, function () {
        var line, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, file_1.readLine)(statsFile, id)];
                case 1:
                    line = _a.sent();
                    if (!line) {
                        throw new Error("Stats entry \"".concat(id, "\" not found."));
                    }
                    list = JSON.parse(line);
                    return [2 /*return*/, {
                            platform: list[0],
                            projectRoot: list[1],
                            entryPoint: list[2],
                            preModules: list[3],
                            graph: list[4],
                            options: list[5],
                        }];
            }
        });
    });
}
exports.getStatsEntry = getStatsEntry;
//# sourceMappingURL=serializeStatsFile.js.map