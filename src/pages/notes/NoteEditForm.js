import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/NotesCreateEditForm.module.css";

function NoteEditForm(props) {
  const { id, content, setShowEditForm, setNotes } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/notes/${id}/`, {
        content: formContent.trim(),
      });
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: prevNotes.results.map((note) => {
          return note.id === id
            ? {
                ...note,
                content: formContent.trim(),
                updated_at: "now",
              }
            : note;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default NoteEditForm;