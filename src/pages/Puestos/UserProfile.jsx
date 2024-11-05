import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();

  return (
    <div>
      <h1>Perfil de usuario</h1>
      <p>ID de usuario: {id}</p>
    </div>
  );
}

export default UserProfile;
