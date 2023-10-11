import type { ReactNode } from "react";
import React from "react";

import styled from "styled-components";

import FlexContainer from "src/components/FlexContainer";
import ChevronDownIcon from "src/assets/chevron-down.svg";

interface IPropType {
  mainComponent: ReactNode;
  dropdownComponent: ReactNode;
  dropdownOpen: boolean;
  setDropdownOpen: (state: boolean) => void;
  id?: string;
  dropdownTopOffset?: string;
  showDropdownArrow?: boolean;
  width?: string;
  dropdownAlignment?: "left" | "right";
  disabled?: boolean;
}

interface IDropdownComponentPropType {
  dropdownOpen: boolean;
  dropdownTopOffset?: string;
  dropdownAlignment?: "left" | "right";
}

const Container = styled(FlexContainer)<{ width?: string }>`
  width: ${({ width }) => width || "fit-content"};
  position: relative;
  .main-wrapper {
    cursor: pointer;
    position: relative;
    width: 100%;
  }
`;

const DropdownComponent = styled(FlexContainer)<IDropdownComponentPropType>`
  position: absolute;
  top: ${({ dropdownTopOffset }) => dropdownTopOffset || "45px"};
  left: ${({ dropdownAlignment }) =>
    dropdownAlignment === "left" ? 0 : "none"};
  right: ${({ dropdownAlignment }) =>
    dropdownAlignment === "right" ? 0 : "none"};
  width: fit-content;
  z-index: 10;
  box-shadow: 0px 2px 18.999px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  overflow: hidden;

  opacity: ${({ dropdownOpen }) => (dropdownOpen ? 1 : 0)};
  visibility: ${({ dropdownOpen }) => (dropdownOpen ? "visible" : "hidden")};

  transition: all 0.3s ease-out;
`;

const Dropdown = (props: IPropType) => {
  const {
    dropdownOpen,
    setDropdownOpen,
    id,
    dropdownTopOffset,
    showDropdownArrow,
    width,
    dropdownAlignment,
    disabled,
  } = props;

  return (
    <Container id={id} width={width}>
      <div
        className="main-wrapper"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        role="presentation"
      >
        {props.mainComponent}
      </div>
      {!disabled ? (
        <DropdownComponent
          dropdownAlignment={dropdownAlignment}
          dropdownOpen={dropdownOpen}
          dropdownTopOffset={dropdownTopOffset}
        >
          {props.dropdownComponent}
        </DropdownComponent>
      ) : null}
    </Container>
  );
};

export default Dropdown;
