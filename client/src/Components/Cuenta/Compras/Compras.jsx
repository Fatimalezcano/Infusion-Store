import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../../Redux/actions";
import { Pedido } from "../..";
import styled from "styled-components";

const Contenedor = styled.div`
  min-height: 100vh;
  background-color: white;
  @media screen and (max-width: 560px) {
    display: absolute;
    z-index: 1;
    margin: 0;
  }
`;

const Container = styled.div`
  padding-top: 20px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px 12px;

  // justify-content: center;
  // align-items: center;

  width: 100%;
  height: auto;

  margin: 15px;
  padding: 5px;
  // border: 1px solid darkgrey;
  border-radius: 8px;
  // box-shadow: 0 2px 2px 0 darkgrey, 0 2px 2px 0 #222;
`;

const Boton = styled.button`
  position: absolute;
  margin-top: 20px;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #36885ed1;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  background-color: ;
`;

export default function Compras() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const pedidos = useSelector((state) => state.pedidos);
  const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(getPedidos());
  }, [dispatch]);

  const filterByUser = (pedido) => {
    if (pedido.usuarioId === userInfo.uid) return pedido;
  };

  function handleClick() {
    setShow((current) => !current);
  }
  return (
    <Contenedor style={{ display: show ? "absolute" : "none" }}>
      <Boton onClick={handleClick}>X</Boton>
      <Container>
        {pedidos?.filter(filterByUser).map((pedido) => (
          <Pedido key={pedido.id} producto={pedido} />
        ))}
      </Container>
    </Contenedor>
  );
}
