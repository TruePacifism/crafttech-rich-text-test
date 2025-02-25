import React from "react";
import { Stage, Layer } from "react-konva";
import Shape from "../shape/Shape";
import { ShapeType } from "../../types";
import Konva from "konva";
import styled from "styled-components";

type propsType = {
  tool: string;
  stageRef: React.RefObject<Konva.Stage>;
  shapes: ShapeType[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeType[]>>;
  onContextMenu: (x: number, y: number, shapeId: string) => void;
};

const Canvas = ({
  tool,
  stageRef,
  shapes,
  setShapes,
  onContextMenu,
}: propsType) => {
  const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === "cursor") return;
    const stage = e.target.getStage();
    if (!stage) return;
    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    if (!point) return;

    const newShape: ShapeType = {
      x: point.x - stageOffset.x,
      y: point.y - stageOffset.y,
      width: 100,
      height: 100,
      html: "",
      id: `shape_${shapes.length + 1}`,
      text: "",
      shapeType: "rect",
      fillColor: "white",
      strokeColor: "black",
    };

    setShapes([...shapes, newShape]);
  };

  return (
    <CanvasContainer>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        draggable={tool === "cursor"}
        onClick={handleOnClick}
        ref={stageRef}
      >
        <Layer>
          {shapes.map((shape) => (
            <Shape
              key={shape.id}
              {...shape}
              tool={tool}
              onContextMenu={onContextMenu}
            />
          ))}
        </Layer>
      </Stage>
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  width: 100%;
  height: calc(100vh - 20px);
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Canvas;
