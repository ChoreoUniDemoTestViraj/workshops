"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRooms = getAllRooms;
exports.getAllocatedRooms = getAllocatedRooms;
exports.getAvailableRoom = getAvailableRoom;
exports.getAvailableRoomTypes = getAvailableRoomTypes;
var _1 = require(".");
function getAllRooms() {
    return [
        {
            number: 101,
            type: {
                id: 0,
                name: "Single",
                guestCapacity: 1,
                price: 80,
            },
        },
        {
            number: 102,
            type: {
                id: 0,
                name: "Single",
                guestCapacity: 1,
                price: 80,
            },
        },
        {
            number: 103,
            type: {
                id: 0,
                name: "Single",
                guestCapacity: 1,
                price: 80,
            },
        },
        {
            number: 104,
            type: {
                id: 0,
                name: "Single",
                guestCapacity: 1,
                price: 80,
            },
        },
        {
            number: 105,
            type: {
                id: 1,
                name: "Double",
                guestCapacity: 2,
                price: 120,
            },
        },
        {
            number: 106,
            type: {
                id: 1,
                name: "Double",
                guestCapacity: 2,
                price: 120,
            },
        },
        {
            number: 201,
            type: {
                id: 0,
                name: "Single",
                guestCapacity: 1,
                price: 80,
            },
        },
        {
            number: 202,
            type: {
                id: 0,
                name: "Single",
                guestCapacity: 1,
                price: 80,
            },
        },
        {
            number: 203,
            type: {
                id: 0,
                name: "Single",
                guestCapacity: 1,
                price: 80,
            },
        },
        {
            number: 204,
            type: {
                id: 1,
                name: "Double",
                guestCapacity: 2,
                price: 120,
            },
        },
        {
            number: 205,
            type: {
                id: 1,
                name: "Double",
                guestCapacity: 2,
                price: 120,
            },
        },
        {
            number: 206,
            type: {
                id: 1,
                name: "Double",
                guestCapacity: 2,
                price: 120,
            },
        },
        {
            number: 301,
            type: {
                id: 1,
                name: "Double",
                guestCapacity: 2,
                price: 120,
            },
        },
        {
            number: 302,
            type: {
                id: 1,
                name: "Double",
                guestCapacity: 2,
                price: 120,
            },
        },
        {
            number: 303,
            type: {
                id: 2,
                name: "Family",
                guestCapacity: 4,
                price: 200,
            },
        },
        {
            number: 304,
            type: {
                id: 3,
                name: "Suite",
                guestCapacity: 4,
                price: 300,
            },
        },
        {
            number: 305,
            type: {
                id: 0,
                name: "Single",
                guestCapacity: 1,
                price: 80,
            },
        },
        {
            number: 306,
            type: {
                id: 1,
                name: "Double",
                guestCapacity: 2,
                price: 120,
            },
        },
        {
            number: 401,
            type: {
                id: 0,
                name: "Single",
                guestCapacity: 1,
                price: 80,
            },
        },
        {
            number: 402,
            type: {
                id: 1,
                name: "Double",
                guestCapacity: 2,
                price: 120,
            },
        },
        {
            number: 403,
            type: {
                id: 2,
                name: "Family",
                guestCapacity: 4,
                price: 200,
            },
        },
        {
            number: 404,
            type: {
                id: 3,
                name: "Suite",
                guestCapacity: 4,
                price: 300,
            },
        },
        {
            number: 405,
            type: {
                id: 0,
                name: "Single",
                guestCapacity: 1,
                price: 80,
            },
        },
        {
            number: 406,
            type: {
                id: 3,
                name: "Suite",
                guestCapacity: 4,
                price: 300,
            },
        },
        // Add other room objects here
    ];
}
function getAllocatedRooms(checkinDate, checkoutDate) {
    var userCheckinUTC = new Date(checkinDate);
    var userCheckoutUTC = new Date(checkoutDate);
    var allocatedRooms = {};
    for (var _i = 0, _a = Object.values(_1.roomReservations); _i < _a.length; _i++) {
        var reservation = _a[_i];
        var rCheckin = new Date(reservation.checkinDate);
        var rCheckout = new Date(reservation.checkoutDate);
        if (userCheckinUTC <= rCheckin && userCheckoutUTC >= rCheckout) {
            allocatedRooms[reservation.room.number] = reservation.room;
        }
    }
    return allocatedRooms;
}
function getAvailableRoom(checkinDate, checkoutDate, roomType) {
    var allocatedRooms = getAllocatedRooms(checkinDate, checkoutDate);
    for (var _i = 0, rooms_1 = _1.rooms; _i < rooms_1.length; _i++) {
        var room = rooms_1[_i];
        if (room.type.name === roomType &&
            (!allocatedRooms || !(room.number in allocatedRooms))) {
            return room;
        }
    }
    return null;
}
function getAvailableRoomTypes(checkinDate, checkoutDate, guestCapacity) {
    try {
        // Call the function to get allocated rooms
        var allocatedRooms_1 = getAllocatedRooms(checkinDate, checkoutDate);
        console.log("allocatedRooms", allocatedRooms_1);
        console.log("rooms", _1.rooms);
        // Filter available room types based on guest capacity and allocated rooms
        var availableRoomTypes = _1.rooms
            .filter(function (room) {
            return (room.type.guestCapacity >= guestCapacity &&
                !allocatedRooms_1[room.number]);
        })
            .map(function (room) { return room.type; });
        console.log("availableRoomTypes", availableRoomTypes);
        return availableRoomTypes;
    }
    catch (error) {
        throw new Error("Error occurred while fetching available room types");
    }
}
