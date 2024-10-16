import React, { useEffect, useState } from "react";
import appwriteService from "../Services/database_services";
import { Container, PostCard } from "../Components";
import AuthService from "../Services/auth_services"; // assume you have an auth service


const home = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser ] = useState(null);


  useEffect(() => {
    AuthService.getCurrentUser().then((user) => {
        if (user) {
        setCurrentUser (user);
      }
    });
  }, []);


  useEffect(() => {
    if (currentUser) {
      appwriteService.getPosts().then((posts) => {
          if (posts) {
          const userPosts = posts.documents.filter((post) => post.userId === currentUser.$id);
          setPosts(userPosts);
        }
      });
    }
  }, [currentUser]);


  // useEffect(() => {
  //   appwriteService.getPosts().then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //     }
  //   });
  // }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default home;
