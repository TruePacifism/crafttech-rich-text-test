import html2canvas from "html2canvas";
import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Group, Rect, Circle, RegularPolygon, Ellipse } from "react-konva";
import { Html } from "react-konva-utils";
import HtmlText from "../htmlText/HtmlText";
import { ControlType, ShapeType } from "../../types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type propsType = ShapeType & {
  tool: ControlType["id"];
  onContextMenu: (x: number, y: number, shapeId: string) => void;
};

const Shape = (props: propsType) => {
  const {
    x,
    y,
    width,
    height,
    tool,
    html,
    id,
    text,
    shapeType,
    fillColor,
    strokeColor,
    onContextMenu,
  } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);

  const groupRef = useRef<Konva.Group>(null);
  const [image, setImage] = useState<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<HTMLDivElement>(null);

  const renderImage = async () => {
    const htmltext = document.getElementById(`htmltext_${id}`);
    if (htmltext) {
      const innerhtml = htmltext.innerHTML;
      if (innerhtml) {
        try {
          const canvas = await html2canvas(htmltext, {
            backgroundColor: "rgba(0,0,0,0)",
          });
          if (canvas.width > 0 && canvas.height > 0) {
            const shape = new Konva.Image({
              x: 0,
              y: 0,
              scaleX: 1 / window.devicePixelRatio,
              scaleY: 1 / window.devicePixelRatio,
              image: canvas,
            });
            if (groupRef.current) {
              groupRef.current.add(shape);
            }
            setImage(shape);
          } else {
            console.error("Canvas has invalid dimensions");
          }
        } catch (error) {
          console.error("Error rendering image:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (!isEditing) {
      if (image) {
        image.destroy();
        setImage(null);
      }
      if (value.trim()) {
        renderImage();
      }
    }
  }, [isEditing, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quillRef.current &&
        !quillRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const handleClick = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === "shape" || event.evt.button === 2) {
      return;
    } else {
      setIsEditing((prev) => !prev);
      if (groupRef.current) {
        if (isEditing) {
          if (image) {
            image.show();
          }
        } else {
          if (image) {
            image.hide();
          }
        }
      }
    }
  };

  const handleInput = (content: string) => {
    setValue(content);
  };

  const handleContextMenu = (event: Konva.KonvaEventObject<PointerEvent>) => {
    event.evt.preventDefault();
    onContextMenu(event.evt.clientX, event.evt.clientY, id);
  };

  return (
    <>
      <Group
        x={x}
        y={y}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        ref={groupRef}
        draggable
      >
        {shapeType === "rect" && (
          <Rect
            stroke={strokeColor}
            fill={fillColor}
            width={width}
            height={height}
          />
        )}
        {shapeType === "circle" && (
          <Circle stroke={strokeColor} fill={fillColor} radius={width / 2} />
        )}
        {shapeType === "triangle" && (
          <RegularPolygon
            stroke={strokeColor}
            fill={fillColor}
            sides={3}
            radius={width / 2}
          />
        )}
        {isEditing && (
          <Html>
            <div ref={quillRef}>
              <ReactQuill value={value} onChange={handleInput} />
            </div>
          </Html>
        )}
      </Group>
      <Html>
        <HtmlText ref={htmlRef} html={value} id={id} />
      </Html>
    </>
  );
};

export default Shape;
