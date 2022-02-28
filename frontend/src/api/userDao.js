import http from "./main.js"

class userDao {
	login(user) {
		return http.post("/login", user)
	}
}
export default new userDao();
