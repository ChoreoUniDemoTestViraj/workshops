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
exports.getAllRooms = getAllRooms;
exports.getAvailableRoomTypes = getAvailableRoomTypes;
exports.getAvailableRooms = getAvailableRooms;
exports.createReservation = createReservation;
exports.getReservations = getReservations;
exports.getReservation = getReservation;
exports.updateReservation = updateReservation;
exports.deleteReservation = deleteReservation;
var postgresql_1 = require("./postgresql");
/**
 * getAllRooms returns all the rooms
 * @returns Promise<Room[]>
 */
function getAllRooms() {
    return __awaiter(this, void 0, void 0, function () {
        var client, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, postgresql_1.getClient)()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 4, 5]);
                    return [4 /*yield*/, client.query("SELECT \n        r.number,\n        jsonb_build_object(\n            'id', rt.id,\n            'name', rt.name,\n            'guestCapacity', rt.guest_capacity,\n            'price', rt.price\n        ) AS type\n    FROM \n        room r\n    JOIN \n        room_type rt ON r.type = rt.id;")];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
                case 4:
                    client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * getAvailableRoomTypes returns available room
 * types for a given date range for a given guest capacity.
 *
 * @param checkInDate - CheckIn Date
 * @param checkOutDate - CheckOut Date
 * @param guestCapacity - Guest capacity
 * @returns
 */
function getAvailableRoomTypes(checkInDate, checkOutDate, guestCapacity) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, postgresql_1.getClient)()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 4, 5]);
                    return [4 /*yield*/, client.query("SELECT rt.id, rt.name, rt.guest_capacity, rt.price\n      FROM room_type rt\n      WHERE rt.guest_capacity >= $1\n      AND rt.id IN (\n          SELECT r.type\n          FROM room r\n          WHERE r.type = rt.id\n          AND r.number NOT IN (\n              SELECT res.room\n              FROM reservation res\n              WHERE $2 <= res.checkout_date\n              AND $3 >= res.checkin_date\n          )\n      );      \n    ", [guestCapacity, checkInDate, checkOutDate])];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
                case 4:
                    client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * getAvailableRooms returns a list of available
 * rooms for a given data range and for a given room type.
 *
 * @param checkInDate - CheckIn Date
 * @param checkOutDate - CheckOut Date
 * @param roomType - Type of the room
 * @returns
 */
function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, postgresql_1.getClient)()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 4, 5]);
                    return [4 /*yield*/, client.query("WITH room_type_id AS (\n        SELECT id\n        FROM room_type\n        WHERE name = $1\n    )\n    SELECT r.number\n    FROM room r\n    CROSS JOIN room_type_id\n    WHERE r.type = room_type_id.id\n    AND r.number NOT IN (\n        SELECT res.room\n        FROM reservation res\n        WHERE (\n            $2 < res.checkout_date\n            AND $3 > res.checkin_date\n        )\n    );\n          ", [roomType, checkInDate, checkOutDate])];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
                case 4:
                    client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * createReservation creates a reservation
 *
 * @param reservation
 * @returns
 */
function createReservation(reservation) {
    return __awaiter(this, void 0, void 0, function () {
        var client, id, room, checkinDate, checkoutDate, user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, postgresql_1.getClient)()];
                case 1:
                    client = _a.sent();
                    id = reservation.id, room = reservation.room, checkinDate = reservation.checkinDate, checkoutDate = reservation.checkoutDate, user = reservation.user;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 4, 5]);
                    return [4 /*yield*/, client.query("INSERT INTO reservation (\"id\", \"room\", \"checkin_date\", \"checkout_date\", \"user\", \"user_info\", \"created_at\", \"updated_at\")\n    VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);\n    ", [id, room, checkinDate, checkoutDate, user.id, user])];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
                case 4:
                    client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * getReservations returns a list of reservations
 * for a given user.
 *
 * @param userId
 * @returns
 */
function getReservations(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, postgresql_1.getClient)()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 4, 5]);
                    return [4 /*yield*/, client.query("SELECT \n      json_build_object(\n          'id', res.id,\n          'room', json_build_object(\n              'number', r.number,\n              'type', json_build_object(\n                  'number', r.number,\n                  'name', rt.name,\n                  'guestCapacity', rt.guest_capacity,\n                  'price', rt.price\n              )\n          ),\n          'user', res.user_info::json,\n          'checkinDate', res.checkin_date,\n          'checkoutDate', res.checkout_date\n      ) AS reservation\n  FROM \n      reservation res\n  JOIN \n      room r ON res.room = r.number\n  JOIN \n      room_type rt ON r.type = rt.id\n  WHERE \n      res.user = $1;\n  \n  ", [userId])];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
                case 4:
                    client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * getReservation returns the reservation data for a given reservationId.
 *
 * @param reservationId
 * @returns
 */
function getReservation(reservationId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, postgresql_1.getClient)()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 4, 5]);
                    return [4 /*yield*/, client.query("SELECT \n      json_build_object(\n          'id', res.id,\n          'room', json_build_object(\n              'number', r.number,\n              'type', json_build_object(\n                  'number', r.number,\n                  'name', rt.name,\n                  'guestCapacity', rt.guest_capacity,\n                  'price', rt.price\n              )\n          ),\n          'user', res.user_info::json,\n          'checkinDate', res.checkin_date,\n          'checkoutDate', res.checkout_date\n      ) AS reservation\n  FROM \n      reservation res\n  JOIN \n      room r ON res.room = r.number\n  JOIN \n      room_type rt ON r.type = rt.id\n  WHERE \n      res.id = $1;\n    ", [reservationId])];
                case 3:
                    result = _a.sent();
                    if (result.rowCount == 0) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, result.rows[0]];
                case 4:
                    client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * updateReservation updates the reservation.
 *
 * @param reservationId - Reservation ID
 * @param checkInDate - CheckIn date
 * @param checkOutDate- CheckOut date
 * @returns
 */
function updateReservation(reservationId, checkInDate, checkOutDate) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, postgresql_1.getClient)()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 4, 5]);
                    return [4 /*yield*/, client.query("UPDATE reservation\n      SET \"checkin_date\" = $1, \"checkout_date\" = $2\n      WHERE \"id\" = $3;\n      ", [checkInDate, checkOutDate, reservationId])];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
                case 4:
                    client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * deleteReservation deletes the reservation.
 *
 * @param reservationId - Reservation Id
 * @returns
 */
function deleteReservation(reservationId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, postgresql_1.getClient)()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 4, 5]);
                    return [4 /*yield*/, client.query("DELETE FROM reservation\n      WHERE id = $1;\n      ", [reservationId])];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 4:
                    client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
