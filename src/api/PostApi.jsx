import axios from "axios";

//? Creating instance of axios using .create method which take an object as a parameter in which we pass baseURL.

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//? Creating a function to defining a method which we want to perform on api.

//get method to get data of api
export const getPost = () => {
  return api.get("/posts");
};

//delete method to delete the data of api
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

//post method to post the data to the api
export const postData = (post) => {
  return api.post("/posts", post);
};

//put method
export const updatePost = (id, post) => {
  return api.put(`/posts/${id}`, post)
}