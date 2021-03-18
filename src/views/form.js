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
        .catch((err) => {
          console.log("err ", { err });
          if (!err.response && err.isAxiosError)
            return setMessage(err.message || "A Network error has occurred");
          if (err.response && err.response.data.error.message)
            return setMessage(err.response.data.error.message || err.message);
        });
    };
    getCategories();
  }, []);
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name.trim().length < 1 || data.category.trim().length < 1) {
      setMessage("Check your input");
      return null;
    }
    setResult((prevState) => ({
      ...prevState,
      ...data,
    }));
  };
  const { name } = data;
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "1rem",
        padding: "1.2rem",
      }}
    >
      <h3> Samuel Chibueze - Assessment work</h3>
      <div className="data">
        {result.name && <span> Name: {result.name} </span>} <br />
        {result.category && <span> Category: {result.category} </span>}
      </div>
      <div className="messages">{message && <span> {message} </span>}</div>

      <div
        className="form-group"
        style={{
          marginBottom: ".8rem",
        }}
      >
        <label htmlFor="name"> Name </label> <br />
        <input
          name="name"
          value={name}
          id="name"
          onChange={handleChange}
          className="form-control"
          style={{
            width: "100%",
            padding: ".3rem",
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category"> Choose catgory </label> <br />
        <select
          name="category"
          onChange={handleChange}
          id="category"
          style={{
            width: "100%",
            padding: ".3rem",
          }}
        >
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
      </div>

      <button
        type="submit"
        style={{
          padding: ".4rem",
          margin: "1rem",
          color: "#FFF",
          backgroundColor: "green",
        }}
      >
        {" "}
        Submit{" "}
      </button>
    </form>
  );
};

export default Form;
