import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from "antd";
import { toast } from 'react-hot-toast';
import { Prices } from '../Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import ImgHeader from './ImgHeader';


const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useCart();

  //2) get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //1) getall products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      // const { data } = await axios.get("/api/v1/product/get-product");
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something Went Wrong");
    }
  };

  // //lifecycle method
  // useEffect(() => {
  //   getAllProducts();
  // }, []);

   //getTOtal COunt
   const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //5)
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  //3) filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    // getAllProducts();
    //4.2
    if (!checked.length || !radio.length) getAllProducts();
  },  [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
     // eslint-disable-next-line
  }, [checked, radio]);


  //4.1) get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <Layout title={"Best offers"}>
      <div className='row'>
        <ImgHeader/>
        <div className='col-md-2'>
          <h4 className='text-center'>Filter By catgeory</h4>
          <div className="d-flex flex-column">
          {categories?.map((categorie) => (
              <Checkbox
                key={categorie._id}
                onChange={(e) => handleFilter(e.target.checked, categorie._id)}
              >
                {categorie.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className='text-center'>Filter By Prices</h4>
          <div className="d-flex flex-column">
           <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div>
                  <Radio value={p.array} key={p._id}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className='col-md-10'>
          <h1 className='text-center'>All Products</h1>
          {/*check*/}
          {/* {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)} */}
          <div className='d-flex flex-wrap'>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    style={{ height: "16rem" }}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ?  "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage