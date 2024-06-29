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
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomReservations = exports.rooms = void 0;
var express_1 = require("express");
var util_1 = require("./util");
var uuid_1 = require("uuid");
var cors_1 = require("cors");
var dao_1 = require("./dao");
var app = (0, express_1.default)();
var router = express_1.default.Router();
var port = 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
exports.rooms = (0, util_1.getAllRooms)();
exports.roomReservations = {};
// POST /api/reservations
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, availableRooms, reservation, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                payload = req.body;
                console.log("Request received by POST /reservations", payload);
                return [4 /*yield*/, (0, dao_1.getAvailableRooms)(payload.checkinDate, payload.checkoutDate, payload.roomType)];
            case 1:
                availableRooms = _a.sent();
                if (availableRooms.length == 0) {
                    return [2 /*return*/, res.status(400).send({
                            http: "NotFound",
                            body: "No rooms available for the given dates and type",
                        })];
                }
                reservation = {
                    id: (0, uuid_1.v4)(),
                    user: payload.user,
                    room: availableRooms[0].number,
                    checkinDate: payload.checkinDate,
                    checkoutDate: payload.checkoutDate,
                };
                return [4 /*yield*/, (0, dao_1.createReservation)(reservation)];
            case 2:
                _a.sent();
                console.log("Reservation created successfully", reservation);
                res.json(reservation);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// GET /api/reservations/roomTypes
router.get("/roomTypes", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, checkinDate, checkoutDate, guestCapacity, roomTypes, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("Request received by GET /reservations/roomTypes", req.query);
                _a = req.query, checkinDate = _a.checkinDate, checkoutDate = _a.checkoutDate, guestCapacity = _a.guestCapacity;
                // Validate query parameters
                if (!checkinDate || !checkoutDate || !guestCapacity) {
                    return [2 /*return*/, res.status(400).json({ error: "Missing required parameters" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, dao_1.getAvailableRoomTypes)(checkinDate.toString(), checkoutDate.toString(), parseInt(guestCapacity.toString(), 10))];
            case 2:
                roomTypes = _b.sent();
                res.json(roomTypes);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// GET /api/reservations/users/:userId
router.get("/users/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, reservations, resp, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, (0, dao_1.getReservations)(userId)];
            case 1:
                reservations = _a.sent();
                resp = reservations.map(function (reservation) { return reservation.reservation; });
                return [2 /*return*/, res.json(resp)];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// PUT /api/reservations/:reservationId
router.put("/:reservationId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reservationId, _a, checkinDate, checkoutDate, reservation, rooms_1, updatedReservation, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                reservationId = req.params.reservationId;
                _a = req.body, checkinDate = _a.checkinDate, checkoutDate = _a.checkoutDate;
                return [4 /*yield*/, (0, dao_1.getReservation)(reservationId)];
            case 1:
                reservation = _b.sent();
                if (!(reservation == null)) return [3 /*break*/, 2];
                res.json({ http: "NotFound", body: "Reservation not found" });
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, (0, dao_1.getAvailableRooms)(checkinDate, checkoutDate, reservation.reservation.room.type.name)];
            case 3:
                rooms_1 = _b.sent();
                if (rooms_1.length == 0) {
                    res.json({ http: "NotFound", body: "No rooms available" });
                }
                return [4 /*yield*/, (0, dao_1.updateReservation)(reservation.reservation.id, checkinDate, checkoutDate)];
            case 4:
                updatedReservation = _b.sent();
                res.json(updatedReservation);
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_4 = _b.sent();
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// DELETE /api/reservations/:reservationId
router.delete("/:reservationId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reservationId, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                reservationId = req.params.reservationId;
                return [4 /*yield*/, (0, dao_1.deleteReservation)(reservationId)];
            case 1:
                _a.sent();
                res.sendStatus(200);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.use("/api/reservations", router);
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
