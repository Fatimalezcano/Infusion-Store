import React, { useState } from "react";

import { useSelector } from "react-redux";

import styled from "styled-components";
import {
  ItemCompra,
  Pedidos,
  AdminProductos,
  EliminarCategoria,
} from "../index";
import Usuarios from "../Usuarios/Usuarios";

const Container = styled.div`
  display: flex;
  // flex-direction: column;
  height: 100vh;
  width: 100%;
  padding-top: 8%;
  background-color: white;
  justify-content: center;
  // align-items: center;
`;

const Informacion = styled.div`
  width: 60%;
  height: 100%;
  // padding-top: 40px;
  position: relative;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  width: 25%;
  height: 80vh;
  background-color: white;
  border-radius: 10px;
  border: 2px solid black;
  // box-shadow: 0 2px 2px 0 #222, 0 2px 2px 0 #222;
  margin-right: 3rem;

  position: relative;
`;

const ContenedorTitulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 60px;
  border: 1px solid #222;
  margin: 15px;
  margin-top: 30px;
  border-radius: 3px;
  // box-shadow: 0 2px 2px 0 #222, 0 2px 2px 0 #222;

  margin-bottom: 40px;
`;

const Titulo = styled.p`
  font-size: 22px;
  font-family: Poppins;
  font-weight: 550;
  padding: 10px;
`;

const Botones = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: start;
  // height: 60%;
  border-bottom: 1px solid black;
  width: 100%;
  // margin-top: 5rem;
`;

const Boton = styled.button`
  width: 100%;
  height: 60px;

  text-align: start;
  padding-left: 15px;

  font-size: 18px;
  font-family: Poppins;

  background-color: white;
  color: black;

  border: none;
  border-top: 1px solid black;
  // border-bottom: 2px solid black;

  &:hover {
    background-color: black;
    color: white;
  }

  cursor: pointer;
`;

const Sesion = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 65px;
  font-size: 20px;
  font-family: Poppins;
  background-color: #222;
  color: white;
  // border: 2px solid black;
  border: none;
  // cursor: pointer;

  border-radius: 0px 0px 8px 8px;

  // &:hover {
  //   background-color: black;
  // }
`;

const Categorias = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 70vh;
  max-height: fit-content;
  width: 100%;
`;

const Categoria = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
`;

const Secciones = styled.p`
  display: flex;
  margin-left: 2rem;
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
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

function Cuenta() {
  const carrito = useSelector((state) => state.carrito);
  const [detalle, setDetalle] = useState("principal");

  return (
    <Container>
      <Options>
        <ContenedorTitulo>
          <Titulo>Infusion Store</Titulo>
        </ContenedorTitulo>
        <Botones>
          <Boton
            style={
              detalle === "usuarios"
                ? { backgroundColor: "#222", color: "white" }
                : null
            }
            onClick={() => {
              setDetalle("usuarios");
            }}
          >
            Usuarios
          </Boton>
          <Boton
            style={
              detalle === "categorias"
                ? { backgroundColor: "#222", color: "white" }
                : null
            }
            onClick={() => {
              setDetalle("categorias");
            }}
          >
            Categorias
          </Boton>
          <Boton
            style={
              detalle === "productos"
                ? { backgroundColor: "#222", color: "white" }
                : null
            }
            onClick={() => {
              setDetalle("productos");
            }}
          >
            Productos
          </Boton>
          <Boton
            style={
              detalle === "pedidos"
                ? { backgroundColor: "#222", color: "white" }
                : null
            }
            onClick={() => {
              setDetalle("pedidos");
            }}
          >
            Pedidos
          </Boton>

          <Boton
            style={
              detalle === "reseñas"
                ? { backgroundColor: "#222", color: "white" }
                : null
            }
            onClick={() => {
              setDetalle("reseñas");
            }}
          >
            Reseñas
          </Boton>
        </Botones>

        <Sesion>Panel de Administrador</Sesion>
      </Options>
      <Informacion>
        {detalle === "usuarios" && <Usuarios />}

        {detalle === "categorias" && <EliminarCategoria />}

        {detalle === "pedidos" && <Pedidos />}

        {detalle === "productos" && <AdminProductos />}

        {detalle === "principal" && (
          <Categorias>
            <Categoria>
              <Secciones>Pedidos a Despachar</Secciones>

              {carrito[0] && (
                <Items>
                  {carrito.map((el) => {
                    return <ItemCompra key={el.id} producto={el} />;
                  })}
                </Items>
              )}
            </Categoria>

            <Categoria>
              {/* <Secciones>Productos recomendados</Secciones> */}
            </Categoria>
          </Categorias>
        )}
      </Informacion>
    </Container>
  );
}

export default Cuenta;