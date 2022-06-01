import axios from "axios";

export default async function deleteUsuario(id) {
  const resp = await axios.delete(
    `https://proyecto-final-gp1.herokuapp.com/usuario/${id}`
  );

  console.log(resp);
}