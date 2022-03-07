import http from "./main.js"

class userDao {
	login(user) {
		return http.post("/login", user)
	}

	register(data) {
		return http.post("/register", data)
	}
}
export default new userDao();
