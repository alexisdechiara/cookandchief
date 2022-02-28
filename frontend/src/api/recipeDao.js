import http from "./main.js"

class recipeDao {
	findAll() {
		return http.get("/recipes");
	}
	findOne(id) {
		return http.get(`/recipes/${id}`);
	}
	create(recipe) {
		return http.post("/recipes", recipe);
	}
	update(id,recipe) {
		return http.put(`/recipes/${id}`, recipe);
	}
	remove(id) {
		return http.delete(`/recipes/${id}`);
	}
}
export default new recipeDao();
