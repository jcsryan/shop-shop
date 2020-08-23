import React, {useEffect} from "react";
import { useQuery } from '@apollo/react-hooks';
// import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import {idbPromise} from '../../utils/helpers';
import { useDispatch, useSelector } from "react-redux";
import spinner from "../../assets/spinner.gif"


function ProductList() {
  // const [state, dispatch] = useStoreContext();
 
const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  

  const currentCategory = useSelector(state => state.currentCategory);

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // const products = data?.products || [];
 useEffect(() => {
  if (data) {
    dispatch({
      type: UPDATE_PRODUCTS,
      products: data.products
    });
    // also save to idb
    data.products.forEach((product) => {
      idbPromise('products', 'put', product);
    });
    //else if loading not defined 
  }else if (!loading) {
    // since ofline get all data from products store
    idbPromise('products', 'get').then((products) => {
      //use retrieved data to set offline global state
      dispatch({
        type: UPDATE_PRODUCTS,
        products: products
      });
    });
  }
}, [data,loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;