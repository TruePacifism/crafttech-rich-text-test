import React from "react";
import styled from "styled-components";

type ContextMenuProps = {
  x: number;
  y: number;
  onChangeShape: (shape: string) => void;
  onChangeFillColor: (color: string) => void;
  onChangeStrokeColor: (color: string) => void;
};

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onChangeShape,
  onChangeFillColor,
  onChangeStrokeColor,
}) => {
  return (
    <MenuContainer style={{ top: y, left: x }}>
      <MenuItem onClick={() => onChangeShape("rect")}>Rectangle</MenuItem>
      <MenuItem onClick={() => onChangeShape("circle")}>Circle</MenuItem>
      <MenuItem onClick={() => onChangeFillColor("red")}>Fill Red</MenuItem>
      <MenuItem onClick={() => onChangeFillColor("green")}>Fill Green</MenuItem>
      <MenuItem onClick={() => onChangeStrokeColor("blue")}>
        Stroke Blue
      </MenuItem>
      <MenuItem onClick={() => onChangeStrokeColor("black")}>
        Stroke Black
      </MenuItem>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default ContextMenu;
