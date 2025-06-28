import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>User Profile {id}</h1>
    </div>
  );
};

export default UserProfile;
