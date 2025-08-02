import React from 'react';
import styled from 'styled-components';

const Switch = ({ isDarkTheme, toggleTheme }) => {
  return (
    <StyledWrapper>
      <div className="toggleWrapper">
        <input 
          className="input" 
          id="dn" 
          type="checkbox" 
          checked={isDarkTheme}
          onChange={toggleTheme}
        />
        <label className="toggle" htmlFor="dn">
          <span className="toggle__handler">
            <span className="crater crater--1" />
            <span className="crater crater--2" />
            <span className="crater crater--3" />
          </span>
          <span className="star star--1" />
          <span className="star star--2" />
          <span className="star star--3" />
          <span className="star star--4" />
          <span className="star star--5" />
          <span className="star star--6" />
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .toggleWrapper {
    position: relative; /* Changed from absolute */
    overflow: hidden;
    // display: inline-block;
    margin-left: 6px; /* Adjust spacing as needed */
  }

  .toggleWrapper .input {
    position: absolute;
    left: -99em;
  }

  .toggle {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 70px; /* Slightly smaller for navbar */
    height: 35px; /* Slightly smaller for navbar */
    background-color: #83d8ff;
    border-radius: 50px;
    transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .toggle:before {
    content: "AM";
    position: absolute;
    left: -40px;
    top: 8px;
    font-size: 14px;
    color: #749ed7;
  }

  .toggle:after {
    content: "PM";
    position: absolute;
    right: -38px;
    top: 8px;
    font-size: 14px;
    color: white;
  }

  .toggle__handler {
    display: inline-block;
    position: relative;
    z-index: 1;
    top: 2px;
    left: 2px;
    width: 31px;
    height: 31px;
    background-color: #ffcf96;
    border-radius: 50px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: rotate(-45deg);
  }

  .toggle__handler .crater {
    position: absolute;
    background-color: #e8cda5;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    border-radius: 100%;
  }

  .toggle__handler .crater--1 {
    top: 12px;
    left: 7px;
    width: 3px;
    height: 3px;
  }

  .toggle__handler .crater--2 {
    top: 20px;
    left: 15px;
    width: 4px;
    height: 4px;
  }

  .toggle__handler .crater--3 {
    top: 7px;
    left: 17px;
    width: 5px;
    height: 5px;
  }

  .star {
    position: absolute;
    background-color: #fff;
    transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    border-radius: 50%;
  }

  .star--1 {
    top: 7px;
    left: 25px;
    z-index: 0;
    width: 20px;
    height: 2px;
  }

  .star--2 {
    top: 13px;
    left: 20px;
    z-index: 1;
    width: 20px;
    height: 2px;
  }

  .star--3 {
    top: 19px;
    left: 28px;
    z-index: 0;
    width: 20px;
    height: 2px;
  }

  .star--4,
  .star--5,
  .star--6 {
    opacity: 0;
    transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .star--4 {
    top: 11px;
    left: 8px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  .star--5 {
    top: 22px;
    left: 12px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  .star--6 {
    top: 25px;
    left: 20px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  .input:checked + .toggle {
    background-color: #749dd6;
  }

  .input:checked + .toggle:before {
    color: #fff;
  }

  .input:checked + .toggle:after {
    color: #749ed7;
  }

  .input:checked + .toggle .toggle__handler {
    background-color: #ffe5b5;
    transform: translate3d(32px, 0, 0) rotate(0);
  }

  .input:checked + .toggle .toggle__handler .crater {
    opacity: 1;
  }

  .input:checked + .toggle .star--1 {
    width: 2px;
    height: 2px;
  }

  .input:checked + .toggle .star--2 {
    width: 3px;
    height: 3px;
    transform: translate3d(-4px, 0, 0);
  }

  .input:checked + .toggle .star--3 {
    width: 2px;
    height: 2px;
    transform: translate3d(-5px, 0, 0);
  }

  .input:checked + .toggle .star--4,
  .input:checked + .toggle .star--5,
  .input:checked + .toggle .star--6 {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .input:checked + .toggle .star--4 {
    transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .input:checked + .toggle .star--5 {
    transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .input:checked + .toggle .star--6 {
    transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
`;

export default Switch;