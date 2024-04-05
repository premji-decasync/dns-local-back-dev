var express = require("express");
var private_router = express.Router();



private_router.get("/", function (req, res, next) {
    res.json({ data: "private api waked" });
  });
  
  private_router.post("/add_family_member", function (req, res, next) {
    res.json({ data: "private api waked" });
  });
  
  private_router.post("/view_family_members", function (req, res, next) {
    res.json({ data: "private api waked" });
  });

  private_router.post("/v1/add_a_security_profile", function (req, res, next) {
    res.json({ data: "private api waked" });
  });
  private_router.post("/v2/add_a_security_profile", function (req, res, next) {
    res.json({ data: "private api waked" });
  });

  private_router.post("/update_a_security_profile", function (req, res, next) {
    res.json({ data: "private api waked" });
  });

  private_router.post("/delete_a_security_profile", function (req, res, next) {
    res.json({ data: "private api waked" });
  });
  private_router.post("/set_a_security_profile_default_to_user", function (req, res, next) {
    res.json({ data: "private api waked" });
  });

  private_router.post("/generate_key_for_adding_a_device_of_user", function (req, res, next) {
    res.json({ data: "private api waked" });
  });

  private_router.post("/verify_key_for_adding_a_device_of_user", function (req, res, next) {
    res.json({ data: "private api waked" });
  });


module.exports = private_router;
