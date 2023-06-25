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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroup = exports.updateGroup = exports.addGroup = exports.getGroups = void 0;
const group_1 = __importDefault(require("../../models/group"));
const getGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGroups = yield group_1.default.find();
        res
            .status(200)
            .json({
            groups: allGroups,
        });
    }
    catch (e) {
        const error = e;
        try {
            res
                .status(400)
                .json({
                errorMessage: error.message,
            });
        }
        catch (HTTPError) {
            console.log("HTTP error getGroups(): " + HTTPError);
        }
        ;
    }
    ;
});
exports.getGroups = getGroups;
const addGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const group = new group_1.default({
            name: body.name,
            hostname: body.hostname,
        });
        const validateErrMsg = validateGroup(group);
        if (validateErrMsg !== "") {
            throw Error(validateErrMsg);
        }
        ;
        const groups = yield group_1.default.find();
        const conflictErrMsg = checkGroupConflicts(group, groups);
        if (conflictErrMsg !== "") {
            throw Error(conflictErrMsg);
        }
        ;
        const newGroup = yield group.save();
        const allGroups = yield group_1.default.find();
        res
            .status(201)
            .json({
            message: `Group '${describeGroup(group)}' created`,
            group: newGroup,
            groups: allGroups,
        });
    }
    catch (e) {
        const error = e;
        try {
            res
                .status(400)
                .json({
                errorMessage: error.message,
            });
        }
        catch (HTTPError) {
            console.log("HTTP error addGroup(): " + HTTPError);
        }
        ;
    }
    ;
});
exports.addGroup = addGroup;
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const group = Object.assign({}, body);
        const validateErrMsg = validateGroup(group);
        if (validateErrMsg !== "") {
            throw Error(validateErrMsg);
        }
        ;
        const updateGroup = yield group_1.default.findByIdAndUpdate({ _id: id }, body);
        const allGroups = yield group_1.default.find();
        res
            .status(200)
            .json({
            message: `Group '${describeGroup(group)}' updated`,
            group: updateGroup,
            groups: allGroups,
        });
    }
    catch (e) {
        const error = e;
        try {
            res
                .status(400)
                .json({
                errorMessage: error.message,
            });
        }
        catch (HTTPError) {
            console.log("HTTP error updateGroup(): " + HTTPError);
        }
        ;
    }
    ;
});
exports.updateGroup = updateGroup;
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield group_1.default.findByIdAndRemove(req.params.id);
        const allGroups = yield group_1.default.find();
        res
            .status(200)
            .json({
            message: `Group '${describeGroup(group)}' deleted`,
            group: group,
            groups: allGroups,
        });
    }
    catch (e) {
        const error = e;
        try {
            res
                .status(400)
                .json({
                errorMessage: error.message,
            });
        }
        catch (HTTPError) {
            console.log("HTTP error deleteGroup(): " + HTTPError);
        }
        ;
    }
    ;
});
exports.deleteGroup = deleteGroup;
const describeGroup = (group) => {
    const name = (group === null || group === void 0 ? void 0 : group.name) || "";
    return `${name}`;
};
const validateGroup = (group) => {
    if (group.name === "") {
        return "Group validation failed: name is an empty string";
    }
    if (group.hostname === "") {
        return "Group validation failed: hostname is an empty string";
    }
    if (/\s/.test(group.hostname)) {
        return `Group validation failed: hostname '${group.hostname}' contains whitespace characters`;
    }
    return "";
};
const checkGroupConflicts = (group, groups) => {
    var errMsg = "";
    groups.forEach((g) => {
        if (g.name === group.name) {
            errMsg = `Group validation failed: conflict for name '${group.name}' already exists`;
            return;
        }
        ;
        if (g.hostname === group.hostname) {
            errMsg = `Group validation failed: conflict for name '${group.hostname}' already exists`;
            return;
        }
        ;
    });
    return errMsg;
};
