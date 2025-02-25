import { forwardRef } from "react";

type propsType = {
  html: string;
  id: string;
};

const HtmlText = forwardRef<HTMLDivElement, propsType>(({ html, id }, ref) => {
  return (
    <div
      id={`htmltext_${id}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        position: "fixed",
        overflow: "hidden",
        left: "100000px",
        top: "100000px",
      }}
      ref={ref}
    ></div>
  );
});

export default HtmlText;
