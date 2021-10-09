import Sidebar from '../components/Sidebar';
import SinglePost from '../components/SinglePost';

function Single() {
  return (
    <div className="container-fluid p-0 m-0">
      <div className="row no-gutters mx-0">
        <div className="col-xl-9 px-0">
          <SinglePost />
        </div>
        <div className="col-xl-3 px-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Single;
