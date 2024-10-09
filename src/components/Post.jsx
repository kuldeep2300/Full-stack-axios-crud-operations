import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import { PostDetails } from "./PostDetails";
import "./Post.css";
import { Form } from "./Form";

export const Post = () => {
  const [apiData, setApiData] = useState([]);
  const [updateApiData, setUpdateApiData] = useState({});

  const getAPIData = async () => {
    try {
      const res = await getPost();
      console.log(res.data);
      setApiData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Functionality to delete the api data
  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        console.log(res);
        //After successfully deleting, filter out the deleting post
        const newUpdatedData = apiData.filter((curPost) => {
          return curPost.id !== id;
        });

        //Re-index remaining posts to ensure sequential IDs
        const updatedData = newUpdatedData.map((curPost, index) => ({
          ...curPost,
          id: index + 1,
        }));

        //Setting new index data to the api
        setApiData(updatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Handle Updating data
  const handleUpdateData = (curElem) => {
    setUpdateApiData(curElem);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  if (!apiData)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <>
      <Form
        apiData={apiData}
        setApiData={setApiData}
        updateApiData={updateApiData}
        setUpdateApiData={setUpdateApiData}
      />
      <div className="container">
        <ol className="card-container grid grid-three--cols">
          {apiData.map((curElem) => {
            return (
              <PostDetails
                key={curElem.id}
                cardData={curElem}
                onDelete={handleDelete}
                onUpdate={handleUpdateData}
              />
            );
          })}
        </ol>
      </div>
    </>
  );
};
