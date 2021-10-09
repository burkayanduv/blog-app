import { Link } from 'react-router-dom';
import '../styles/componentStyles/post.scss';

interface Props {
  post: {
    _id: string;
    title: string;
    desc: string;
    photo: string;
    username: string;
    categories: string[];
    createdAt: Date;
  };
}

function Post({ post }: Props) {
  const PF = process.env.REACT_APP_PF_URL;
  return (
    <div className="post">
      <img
        className="postImg"
        src={post.photo ? `${PF}/${post.photo}` : `${PF}/blank-photo.png`}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c: string) => (
            <span key={c} className="postCat">
              {c}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}

export default Post;
