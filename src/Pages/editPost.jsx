import React from "react";
import { Container, PostForm } from "../Components";
import Database from "../Services/database_services";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const editPost = () => {
  const [post, setPosts] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      Database.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default editPost;
