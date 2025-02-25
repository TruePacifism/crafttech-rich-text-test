import React from "react";
import styled from "styled-components";
import { ShapeType } from "../../types";

type GlobalContextMenuProps = {
  x: number;
  y: number;
  visible: boolean;
  fillColor: string;
  strokeColor: string;
  onChangeShape: (shape: ShapeType["shapeType"]) => void;
  onChangeFillColor: (color: string) => void;
  onChangeStrokeColor: (color: string) => void;
  onClose: () => void;
};

const GlobalContextMenu: React.FC<GlobalContextMenuProps> = ({
  x,
  y,
  visible,
  fillColor,
  strokeColor,
  onChangeShape,
  onChangeFillColor,
  onChangeStrokeColor,
  onClose,
}) => {
  if (!visible) return null;

  const handleFillColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = event.target.value;
    onChangeFillColor(color);
  };

  const handleStrokeColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = event.target.value;
    onChangeStrokeColor(color);
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (
      !event.relatedTarget ||
      !(event.relatedTarget as HTMLElement).closest(".color-picker")
    ) {
      onClose();
    }
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <MenuContainer style={{ top: y, left: x }} onMouseLeave={handleMouseLeave}>
      <MenuItem onClick={() => onChangeShape("rect")}>Rectangle</MenuItem>
      <MenuItem onClick={() => onChangeShape("circle")}>Circle</MenuItem>
      <MenuItem onClick={() => onChangeShape("triangle")}>Triangle</MenuItem>
      <MenuItem className="color-picker" onMouseEnter={handleMouseEnter}>
        Fill Color:{" "}
        <ColorInput
          type="color"
          value={fillColor}
          onChange={handleFillColorChange}
        />
      </MenuItem>
      <MenuItem className="color-picker" onMouseEnter={handleMouseEnter}>
        Stroke Color:{" "}
        <ColorInput
          type="color"
          value={strokeColor}
          onChange={handleStrokeColorChange}
        />
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

const ColorInput = styled.input`
  margin-left: 8px;
`;

export default GlobalContextMenu;
