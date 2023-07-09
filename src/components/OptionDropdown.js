import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../styles/OptionDropdown.module.css";
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const Options = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const OptionDropdown = () => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={Options} />

      <Dropdown.Menu className="text-center">
        <Dropdown.Item 
        className={styles.DropdownItem}
        onClick={() => {}}
        aria-label="edit">
            <i className="fas fa-edit" />
            </Dropdown.Item>
        <Dropdown.Item 
        className={styles.DropdownItem}
        onClick={() => {}}
        aria-label="delete">
        <i className="fas fa-trash" />
        
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
