// import React, { useState, useEffect } from "react";
// import DatabaseService from "../Services/database_services";
// import { Container, PostCard } from "../Components";

// const AllPost = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     DatabaseService.getPosts().then((posts) => {
//         if (posts) {
//             setPosts(posts.documents)
//         }
//     })
// }, [])

//   return (
//     <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post}  />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//   );
// };

// export default AllPost;


import React, { useState, useEffect } from "react";
import DatabaseService from "../Services/database_services";
import { Container, PostCard } from "../Components";
import AuthService from "../Services/auth_services"; // assume you have an auth service

const AllPost = () => {
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
      DatabaseService.getPosts().then((posts) => {
          if (posts) {
          const userPosts = posts.documents.filter((post) => post.userId === currentUser.$id);
          setPosts(userPosts);
        }
      });
    }
  }, [currentUser]);

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;