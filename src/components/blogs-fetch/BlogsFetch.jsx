import React, { useEffect, useState } from "react";
import "./BlogFetch.css";
const API = "http://localhost:4000/blogs";

const BlogsFetch = () => {
  const [reload, setReload] = useState(false);
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [reload]);

  // C //
  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let user = Object.fromEntries(formData.entries());

    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      e.target.reset();
      setReload((p) => !p);
    });
  };

  // R //
  const handleEdit = (id) => {
    const editItem = data.find((item) => item.id === id);
    setEditing(true);
    setEditData(editItem);
    setEditId(id);
  };

  // U //
  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        setReload((prev) => !prev);
        setEditing(false);
        setEditData(null);
        setEditId(null);
        e.target.reset();
      });
  };

  // D //
  const handleDelete = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setReload((p) => !p);
    });
  };

  let users = data?.map((el) => (
    <div className="user-card" key={el.id}>
      <img src={el.img} alt={el.title} />
      <h3>{el.title}</h3>
      <p>{el.par}</p>
      <button onClick={() => handleDelete(el.id)}>Delete</button>
      <button onClick={() => handleEdit(el.id)}>
        {editing && el.id === editId ? "Update" : "Edit"}
      </button>
    </div>
  ));

  return (
    <div>
      <section className="blog-fetch">
        <div className="container">
          <form
            onSubmit={editing ? handleUpdate : handleSubmit}
            className="hero__form"
          >
            <input
              required
              type="text"
              name="title"
              placeholder="Title"
              defaultValue={editing ? editData.title : ""}
            />
            <input
              required
              type="text"
              name="par"
              placeholder="Paragraph"
              defaultValue={editing ? editData.par : ""}
            />
            <button>{editing ? "Update" : "Create"}</button>
          </form>
          <div className="user-cards">{users}</div>
        </div>
      </section>
    </div>
  );
};

export default BlogsFetch;
