import axios from 'axios';
import React from 'react'
import { useSearch } from '../context/search';
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <div>
            <Form className="d-flex"  onSubmit={handleSubmit}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    style={{ width: "16rem", marginLeft: "2rem" }}
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <Button variant="secondary"  type="submit">Search</Button>
            </Form>
        </div>
    )
}

export default SearchInput