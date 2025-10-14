"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sessionController_js_1 = require("../controllers-b/sessionController.js");
var router = express_1.default.Router();
router.get('/sessions', sessionController_js_1.getSession);
router.post('/sessions', sessionController_js_1.createSession);
router.put('/sessions/:id', sessionController_js_1.updateSession);
router.delete('/sessions/:id', sessionController_js_1.deleteSession);
router.get("/ping", function (req, res) {
    res.json({ message: "Servern svarar" });
});
exports.default = router;
