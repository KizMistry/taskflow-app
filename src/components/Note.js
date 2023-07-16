import React, { useState } from "react";
import styles from "../styles/Note.module.css";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "./Avatar";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { OptionDropdown } from "./OptionDropdown";
import { axiosRes } from "../api/axiosDefaults";
import NoteEditForm from "../pages/notes/NoteEditForm";

const Note = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setProject,
    setNotes,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/notes/${id}/`);
      setProject((prevProject) => ({
        results: [
          {
            ...prevProject.results[0],
            notes_count: prevProject.results[0].notes_count - 1,
          },
        ],
      }));

      setNotes((prevNotes) => ({
        ...prevNotes,
        results: prevNotes.results.filter((note) => note.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <NoteEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setNotes={setNotes}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <OptionDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};
export default Note;
