import React, { useState, useEffect } from "react";
import axios from "axios";
const Form = () => {
  const [catData, setCatData] = useState([]);
  const [message, setMessage] = useState(null);
  const [result, setResult] = useState({
    name: null,
    category: null,
  });
  const [data, setData] = useState({
    name: "",
    category: "",
  });
  useEffect(() => {
    const getCategories = () => {
      const uri = "http://questence.tqfe.net/api/v1/categories";
      axios
        .get(uri)
        .then(({ data }) => {
          console.log("data ", data);
          setCatData(data.data);
        })
        .catch((err) => setMessage("An error occured"));
    };
    getCategories();
  }, []);
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name.trim().length > 0 || data.category.trim().length > 0) {
      setMessage("Check your input");
      return;
    }
    setResult((prevState) => ({
      ...prevState,
      ...data,
    }));
  };
  const { name } = data;
  return (
    <form onSubmit={handleSubmit}>
      {result.name && result.name}
      {result.category && result.category}
      {message && <span> {message} </span>}
      <input name="name" value={name} onChange={handleChange} />
      <select name="category" onChange={handleChange}>
        <option value=""> --select--- </option>
        {catData.length > 0 &&
          catData.map((cat) => {
            return (
              <option value={cat.name} key={cat.id}>
                {" "}
                {cat.name}{" "}
              </option>
            );
          })}
      </select>
      <button type="submit"> Submit </button>
    </form>
  );
};

export default Form;
