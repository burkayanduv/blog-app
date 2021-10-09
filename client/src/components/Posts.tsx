import '../styles/componentStyles/posts.scss';
import Post from './Post';

interface PostInterface {
  _id: string;
  title: string;
  desc: string;
  photo: string;
  username: string;
  categories: string[];
  createdAt: Date;
}
interface Props {
  posts: PostInterface[];
}

function Posts({ posts }: Props) {
  return (
    <div className="posts">
      {posts.map((p: PostInterface) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}

export default Posts;
