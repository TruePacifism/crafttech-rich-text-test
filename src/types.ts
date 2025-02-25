import Konva from "konva";

export type ControlType = {
  id: string;
  label: string;
};
export type EnumType<ObjType> = {
  [key: string]: ObjType;
};
export type ShapeType = {
  x: number;
  y: number;
  width: number;
  height: number;
  html: string;
  id: string;
  text: string;
  stageRef?: React.RefObject<Konva.Stage>;
  shapeType?: "rect" | "circle" | "triangle";
  fillColor?: string;
  strokeColor?: string;
};
