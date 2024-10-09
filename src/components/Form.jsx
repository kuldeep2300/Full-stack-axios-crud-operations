/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Post.css";
import { postData, updatePost } from "../api/PostApi";

export const Form = ({
  apiData,
  setApiData,
  updateApiData,
  setUpdateApiData,
}) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  // Form button changing adit or edit functionality
  // Object.keys(updateApiData) here this portion return empty array if there is no data in object, then we use array length property to check object is empty or not.
  let isEmpty = Object.keys(updateApiData).length === 0;

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // adding post data function
  const addPostData = async () => {
    try {
      const res = await postData(addData);
      console.log(res);
      console.log("res data:", res.data);
      if (res.status === 201) {
        if (addData.title && addData.body) {
          setApiData([...apiData, res.data]);
        }
        else{
          alert("Please Fill the Input Fields First!")
        }

        setAddData({
          title: "",
          body: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //updatePostData function;
  const updatePostData = async () => {
    try {
      const res = await updatePost(updateApiData.id, addData);
      console.log(res);
      if (res.status === 200) {
        setApiData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });

        setAddData({ title: "", body: "" });
        setUpdateApiData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // To get submit button value
    const action = e.nativeEvent.submitter.value;
    if (action === "ADD") {
      addPostData();
    } else if (action === "EDIT") {
      updatePostData();
    }
  };

  //Updating data
  useEffect(() => {
    updateApiData &&
      setAddData({
        title: updateApiData.title || "",
        body: updateApiData.body || "",
      });
  }, [updateApiData]);

  return (
    <form className="input-field" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Add Title"
        autoComplete="off"
        value={addData.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="body"
        id="body"
        placeholder="Add Post"
        autoComplete="off"
        value={addData.body}
        onChange={handleInputChange}
      />
      <button type="submit" className="btn-1" value={isEmpty ? "ADD" : "EDIT"}>
        {isEmpty ? "ADD" : "EDIT"}
      </button>
    </form>
  );
};
