import axios from "axios";

const urlBase = "https://proyecto-final-gp1.herokuapp.com/";
const productos = "productos";
const categorias = "categorias";
const crear = "crear";
const admin = "admin/";
const ratings = "ratings/";

export function getProductos() {
  return async function (dispatch) {
    const data = JSON.parse(localStorage.getItem("productos"));

    if (data) {
      const resp = await axios.get(`${urlBase}${productos}`);
      dispatch({ type: "GET_PRODUCTOS", payload: data.concat(resp.data) });
    } else {
      const resp = await axios.get(`${urlBase}${productos}`);
      dispatch({ type: "GET_PRODUCTOS", payload: resp.data });
    }
  };
}

export function getProductosFiltrados(productosFiltrados) {
  return function (dispatch) {
    dispatch({ type: "GET_PRODUCTOS_FILTRADOS", payload: productosFiltrados });
  };
}

export function getDetail(id) {
  return function (dispatch) {
    // console.log(urlBase + "producto" + "/" + id);

    axios(`${urlBase}producto/${id}`).then((res) =>
      dispatch({ type: "GET_DETAIL", payload: res.data })
    );
  };
}

export function clearDetail() {
  return function (dispatch) {
    dispatch({ type: "CLEAR_DETAIL" });
  };
}

export function getCategorias() {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${urlBase}${categorias}`);

      if (resp) {
        dispatch({ type: "GET_CATEGORIAS", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error categorias");
    }
  };
}

export function searchProduct(name) {
  return async function (dispatch) {
    let json = await axios.get(`${urlBase}${productos}?name=${name}`);
    return dispatch({
      type: "SEARCH_PRODUCTS",
      payload: json.data,
    });
  };
}

export function filtrarCategorias(payload) {
  return {
    type: "FILTRAR_CATEGORIAS",
    payload,
  };
}

export function getReviews(id) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${urlBase}ratings/${id}`);

      if (resp) {
        dispatch({ type: "GET_REVIEWS", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error reviews");
    }
  };
}

export function postProducto(payload) {
  return async function (dispatch) {
    // let json = await axios.post(`${urlBase}${admin}${crear}`, payload);

    // dispatch({ type: "POST_PRODUCTO", payload: json.data });

    axios.post(`${urlBase}${admin}${crear}`, payload).then((res) => {
      // console.log(res, "uwu");
      dispatch({ type: "POST_PRODUCTO", payload: res.data });
    });
  };
}

export function putProducto(id, body) {
  return function (dispatch) {
    axios.put(`${urlBase}${admin}${id}`, body).then((res) => {
      dispatch({ type: "PUT_PRODUCTO", payload: res.data });
    });
  };
}

export function deleteProducto(id) {
  return function (dispatch) {
    axios
      .delete(`${urlBase}producto/${id}`)
      .then((res) => {
        dispatch({ type: "DELETE_PRODUCTO", payload: res.data });
      })
      .catch((err) => console.log(err, "error delete"));
  };
}

export function postCategoria(payload) {
  return async function (dispatch) {
    let json = await axios.post(`${urlBase}${categorias}/${crear}`, payload);

    dispatch(getCategorias());

    return json;
  };
}

export function deleteCategoria(id) {
  return async function () {
    await axios.delete(`${urlBase}${categorias}/${id}`);
    return function (dispatch) {
      dispatch({ type: "DELETE_CATEGORIA" });
    };
  };
}

export function postReviews(id, payload) {
  return async function (dispatch) {
    await axios.post(`${urlBase}${ratings}${crear}/${id}`, payload);

    dispatch(getReviews(id));

    return dispatch({
      type: "CREAR_REVIEW",
      payload,
    });
  };
}

export const setSort = (value) => (dispatch) => {
  dispatch({ type: "SET_SORT", payload: value });
};

export function agregarCarrito(idProducto, cantidad) {
  return function (dispatch) {
    dispatch({ type: "AGREGAR_CARRITO", payload: { idProducto, cantidad } });
  };
}

export function quitarItem(idProducto) {
  return function (dispatch) {
    dispatch({ type: "QUITAR_ITEM", payload: idProducto });
  };
}

export function getUser(mail) {
  return function (dispatch) {
    try {
      axios(`${urlBase}usuarios`).then((res) =>
        dispatch({ type: "GET_USER", payload: res.data, mail })
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export function setUserInfo(user) {
  return function (dispatch) {
    try {
      dispatch({ type: "SET_USER", payload: user });
    } catch (err) {
      console.log(err);
    }
  };
}
