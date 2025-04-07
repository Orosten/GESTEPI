"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlStatus = exports.EPIType = void 0;
// Types d'EPI
var EPIType;
(function (EPIType) {
    EPIType["CORDE"] = "CORDE";
    EPIType["SANGLE"] = "SANGLE";
    EPIType["LONGE"] = "LONGE";
    EPIType["BAUDRIER"] = "BAUDRIER";
    EPIType["CASQUE"] = "CASQUE";
    EPIType["MOUSQUETON"] = "MOUSQUETON";
    EPIType["SYSTEME_ASSURAGE"] = "SYSTEME_ASSURAGE";
})(EPIType || (exports.EPIType = EPIType = {}));
// Statut possible après un contrôle
var ControlStatus;
(function (ControlStatus) {
    ControlStatus["OPERATIONNEL"] = "OPERATIONNEL";
    ControlStatus["A_REPARER"] = "A_REPARER";
    ControlStatus["MIS_AU_REBUT"] = "MIS_AU_REBUT";
})(ControlStatus || (exports.ControlStatus = ControlStatus = {}));
