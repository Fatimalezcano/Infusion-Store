import axios from "axios";

const urlBase = "https://proyecto-final-gp1.herokuapp.com/";
const productos = "productos";
const categorias = "categorias";

export function getProductos() {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${urlBase}${productos}`);

      if (resp) {
        dispatch({ type: "GET_PRODUCTOS", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error productos");
    }
  };
}

export function getDetail(id) {
  return function (dispatch) {
    console.log(urlBase + "producto" + "/" + id);
    axios(`${urlBase}producto/${id}`).then((res) =>
      dispatch({ type: "GET_DETAIL", payload: res.data })
    );
  };
}

export function getFilterProds(filteredProds) {
  return function (dispatch) {
    dispatch({ type: "GET_FILTERED_PRODS", payload: filteredProds });
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
    let json = await axios.get(`${urlBase}${productos}+?name=${name}`);
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

export function ordenarPorNombre(payload) {
  return {
    type: "ORDENAR_POR_NOMBRE",
    payload,
  };
}
export function ordenarPorPrecio(payload) {
  return {
    type: "ORDENAR_POR_PRECIO",
    payload,
  };
}

export function getReviews(id) {
  return async function (dispatch) {
    let json = await axios
      .get(`${urlBase}ratings/${id}`)
      .then((res) => dispatch({ type: "GET_REVIEWS", payload: json }));
  };
}
