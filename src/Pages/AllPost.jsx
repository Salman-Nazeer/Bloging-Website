import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../Components";
import AuthService from "../Services/auth_services";
import appwriteService from "../Services/database_services";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    AuthService.getCurrentUser().then((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          const userPosts = posts.documents.filter(
            (post) => post.userId === currentUser.$id
          );
          setPosts(userPosts);
        }
      });
    }
  }, [currentUser]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold ">
                Currently there is NO Post 
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-800 pb-6 md:pb-8 tracking-tight flex items-center justify-center">
        <FontAwesomeIcon icon={faFileAlt} className="text-blue-500 mr-2" />
        My Uploaded Posts
      </h1>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default AllPost;
