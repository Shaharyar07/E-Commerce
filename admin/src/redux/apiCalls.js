import { loginStart, loginSuccess, loginFailure } from "./userRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} from "./productRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const response = await userRequest.get("/products/find");
    const { products } = response.data;
    dispatch(getProductSuccess(products));
  } catch (error) {
    dispatch(getProductFailure());
  }
};
export const deleteProduct = async (dispatch, productId) => {
  dispatch(deleteProductStart());
  try {
    // await userRequest.delete(`/products/${productId}`);
    dispatch(deleteProductSuccess(productId));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
export const updateProduct = async (dispatch, id, product) => {
  dispatch(getProductStart());
  try {
    await userRequest.put(`/products/${product._id}`, product);
    dispatch(getProductSuccess({ id: id, product: product }));
  } catch (error) {
    dispatch(getProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.post("/products", product);
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};
