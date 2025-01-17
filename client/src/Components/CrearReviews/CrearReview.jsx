import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReviews } from "../../Redux/actions";
import { StarRating } from "../index";
import styled from "styled-components";
import send from "../../Images/Send.png";
import Swal from "sweetalert2";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 184px;
  justify-content: space-around;
  align-items: start;
  position: relative;
  @media screen and (max-width: 960px) {
    width: 90%;
  }
`;

const Comprar = styled.div`
  display: flex;
  flex-direction: column;

  align-items: start;
  justify-content: space-around;

  height: 144px;
  width: 292px;

  margin: 0.5rem;
  padding: 10px 20px;
  background-color: #1b1919ed;
  border-radius: 10px;
  text-align: center;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: start;
  justify-content: space-around;
  height: 144px;
  width: 292px;
  margin: 0.5rem;
  padding: 10px 20px;
  background-color: #1b1919ed;
  border-radius: 10px;
  text-align: center;
`;

const Comentario = styled.input`
  color: black;
  width: 80%;
  border: none;
  border-radius: 5px;
  background-color: white;
  padding: 2px 6px;
  font-size: 13px;
`;

const ComentarioDetallado = styled.textarea`
  color: black;
  padding: 3px 6px;
  height: 74px;
  width: 252px;
  text-align: justify;
  border-radius: 10px;
  border: none;
  resize: none;
  font-size: 13px;
  font-family: sans-serif;
  background-color: white;
`;

const Titulo = styled.span`
  margin-left: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const Image = styled.img`
  position: absolute;
  object-fit: contain;
  top: 7px;
  right: 7px;
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 15px;
  padding: 2px 2px 2px 5px;
  margin: 3px;
  cursor: pointer;
  &: hover {
    width: 32px;
    height: 32px;
    border-radius: 50px;
  }
`;

export default function CrearReview({ id }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userInfo);
  const pedidos = useSelector((state) => state.pedidosUsuario);
  const [comprado, setComprado] = useState(false);

  useEffect(() => {
    pedidos.map((pedido) =>
      //eslint-disable-next-line
      pedido.productos.map((producto) => {
        if (producto.compra.productoId === Number(id)) {
          setComprado(true);
        }
      })
    );
    //eslint-disable-next-line
  }, [user, pedidos]);

  const [input, setInput] = useState({
    puntaje: "",
    comentario: "",
    titulo: "",
    usuarioId: user.uid,
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Enviar Reseña",
      text: "¿Estas seguro de enviar esta reseña?",
      icon: "warning",
      iconColor: "grey",
      color: "#222",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "green",
      cancelButtonColor: "darkgrey",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "¡Opinion enviada con exito!",
          icon: "success",
          iconColor: "green",
          color: "#222",
          showConfirmButton: false,
          timer: "1500",
          toast: true,
        });

        dispatch(postReviews(id, input));

        // Vaciar inputs
        setInput({
          ...input,
          puntaje: "",
          comentario: "",
          titulo: "",
        });
      }
    });
  };

  return (
    <Container>
      <Titulo>Crea tu reseña</Titulo>

      {!comprado ? (
        <Comprar>
          <p style={{ color: "white" }}>
            {
              "No se puede añadir una reseña si aún no has adquirido el producto"
            }
          </p>
        </Comprar>
      ) : (
        <Formulario onSubmit={handleSubmit}>
          <Image
            title="Enviar reseña"
            src={send}
            onClick={(e) => handleSubmit(e)}
          ></Image>

          <Comentario
            type={"text"}
            name="titulo"
            value={input.titulo}
            placeholder="Titulo"
            onChange={handleInputChange}
          ></Comentario>

          <StarRating inputs={input} setInputs={setInput}></StarRating>

          <ComentarioDetallado
            name="comentario"
            placeholder="Opina sobre este producto"
            onChange={handleInputChange}
            value={input.comentario}
            cols="30"
            rows="10"
          ></ComentarioDetallado>
        </Formulario>
      )}
    </Container>
  );
}
