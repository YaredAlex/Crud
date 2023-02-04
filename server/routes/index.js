const express = require("express");
const userdata = require("../data/jsondata.json");
const UserService = require("../services/User");
module.exports = () => {
	const route = express.Router();
	route.get("/users", async (req, res, next) => {
		try {

			const adding = await UserService.getAllUsers();
			res.send(adding);
		} catch (e) {
			return next(e);
		}

	});
	route.get("/users/:uid", async (req, res, next) => {
		const uid = req.params.uid;
		try {
			const user = await UserService.getUser(uid);
			if (user) res.send(user);
			else res.send({});
		} catch (e) {
			return next(e);
		}

	});

	route.put("/users/edit", async (req, res, next) => {
		let result = null;
		const f_name = req.body.f_name.trim();
		const l_name = req.body.l_name.trim();
		const gender = req.body.gender.trim();
		const email = req.body.email.trim();
		try {

			if (req.body._id) result = await UserService.editUser(req.body._id, { f_name, l_name, gender, email });
			res.send("edited");
		} catch (e) {
			return next(e);
		}

	});

	route.post("/delete/user", async (req, res, next) => {
		try {
			if (req.body._id) await UserService.deleteUser(req.body._id);
			res.send("User deleted");
		} catch (e) {
			console.log("errr", err.message);
			return next(e);
		}
	});
	route.post("/users/addUser", async (req, res, next) => {
		const f_name = req.body.f_name;
		const l_name = req.body.l_name;
		const gender = req.body.gender;
		const id = req.body.id;
		const email = req.body.email.trim();
		if (!f_name || !l_name || !gender || !id || !email) {
			console.log("error while adding");
		}
		try {

			const result = await UserService.addUser({
				f_name,
				l_name,
				gender,
				id: Number(id),
				email,
			});
			res.send(result);
		} catch (e) {
			next(e);
		}
	});

	return route;
};
