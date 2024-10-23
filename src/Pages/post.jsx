import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Database from "../Services/database_services";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : true;

  useEffect(() => {
    if (slug) {
      Database.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    Database.deletePost(post.$id).then((status) => {
      if (status) {
        Database.deleteFile(post.featuredImage);
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {post.featuredImage ? (
            <img
              src={Database.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl"
            />
          ) : (
            <p>No featured image available</p> // You can customize this message or handle it differently.
          )}

          {isAuthor && (
            // <div className="flex absolute right-6 top-6 sm:items-start">
            //   <Link to={`/edit-post/${post.$id}`}>
            //     <Button bgColor="bg-green-500" className="flex items-center mr-3 mb-2 sm:mb-0">
            //       Edit
            //     <FontAwesomeIcon icon={faPen} className="ml-1 block"/>
            //     </Button>
            //   </Link>
            //   <Button bgColor="bg-red-500" onClick={deletePost}  className="flex items-center mb-2 sm:mb-0">
            //     Delete
            //   <FontAwesomeIcon icon={faTrash} className="ml-1 block" />
            //   </Button>
            // </div>
            <div className="flex absolute right-6 top-6 sm:items-start">
              {/* Edit Button */}
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="flex items-center mr-3 mb-2 sm:mb-0 text-sm sm:p-3 sm:text-base"
                >
                  <span className="hidden sm:block">Edit</span>{" "}
                  {/* Text hidden on mobile */}
                  <FontAwesomeIcon
                    icon={faPen}
                    className="ml-1 block text-sm sm:text-2xl"
                  />
                </Button>
              </Link>

              {/* Delete Button */}
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                className="flex items-center mb-2 sm:mb-0 text-sm sm:p-3 sm:text-base"
              >
                <span className="hidden sm:block">Delete</span>{" "}
                {/* Text hidden on mobile */}
                <FontAwesomeIcon
                  icon={faTrash}
                  className="ml-1 block text-sm sm:text-2xl"
                />
              </Button>
            </div>
          )}
        </div>

        <div className="w-full text-left pl-5 sm:pl-10 md:pl-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            {post.title}:
          </h1>
          <div className="px-4 sm:px-7 text-left text-base sm:text-lg md:text-xl lg:text-2xl">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
