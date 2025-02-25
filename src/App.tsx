import { useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import GlobalContextMenu from "./components/globalContextMenu/GlobalContextMenu";
import { ControlType, ShapeType } from "./types";
import Konva from "konva";

function App() {
  const [tool, setTool] = useState<ControlType["id"]>("cursor");
  const stageRef = useRef<Konva.Stage>(null);

  const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const [fillColor, setFillColor] = useState<string>("#ffffff");
  const [strokeColor, setStrokeColor] = useState<string>("#000000");

  const handleContextMenu = (x: number, y: number, shapeId: string) => {
    if (tool === "shape") return;
    setContextMenuPosition({ x, y });
    setContextMenuVisible(true);
    setSelectedShapeId(shapeId);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
    setSelectedShapeId(null);
  };

  const handleChangeShape = (shape: ShapeType["shapeType"]) => {
    setShapes((prevShapes) =>
      prevShapes.map((s) =>
        s.id === selectedShapeId ? { ...s, shapeType: shape } : s
      )
    );
    handleCloseContextMenu();
  };

  const handleChangeFillColor = (color: string) => {
    setFillColor(color);
    setShapes((prevShapes) =>
      prevShapes.map((s) =>
        s.id === selectedShapeId ? { ...s, fillColor: color } : s
      )
    );
  };

  const handleChangeStrokeColor = (color: string) => {
    setStrokeColor(color);
    setShapes((prevShapes) =>
      prevShapes.map((s) =>
        s.id === selectedShapeId ? { ...s, strokeColor: color } : s
      )
    );
  };

  return (
    <>
      <Canvas
        tool={tool}
        stageRef={stageRef}
        shapes={shapes}
        setShapes={setShapes}
        onContextMenu={handleContextMenu}
      />
      <Control tool={tool} setTool={setTool} />
      <GlobalContextMenu
        x={contextMenuPosition.x}
        y={contextMenuPosition.y}
        visible={contextMenuVisible}
        fillColor={fillColor}
        strokeColor={strokeColor}
        onChangeShape={handleChangeShape}
        onChangeFillColor={handleChangeFillColor}
        onChangeStrokeColor={handleChangeStrokeColor}
        onClose={handleCloseContextMenu}
      />
    </>
  );
}

export default App;
