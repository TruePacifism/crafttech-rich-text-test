import styled from "styled-components";
import { Controls } from "../../enums";
import { ControlType } from "../../types";

type propsType = {
  tool: ControlType["id"];
  setTool: React.Dispatch<React.SetStateAction<string>>;
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ControlItem = styled.div`
  margin-bottom: 8px;
`;

const RadioInput = styled.input`
  margin-right: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
`;

const Control = ({ tool, setTool }: propsType) => {
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTool(e.target.value);
  };

  return (
    <Container>
      {Object.values(Controls).map((control) => (
        <ControlItem key={control.id}>
          <RadioInput
            type="radio"
            id={control.id}
            name="control"
            value={control.id}
            checked={tool === control.id}
            onChange={handleOnChange}
          />
          <Label htmlFor={control.id}>{control.label}</Label>
        </ControlItem>
      ))}
    </Container>
  );
};

export default Control;
