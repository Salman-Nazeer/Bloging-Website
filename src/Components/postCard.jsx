import React from "react";
import DatabaseService from "../Services/database_services";
import { Link } from "react-router-dom";

const postCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={DatabaseService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-48 object
                  cover rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default postCard;