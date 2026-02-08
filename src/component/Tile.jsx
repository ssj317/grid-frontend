const Tile = ({ block, onClick, previewColor, isPreview }) => {
  const background =
    block.color || (isPreview ? previewColor : "#e5e5e5");

  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width: "20px",
        height: "20px",
        backgroundColor: background,
        border: "1px solid #d1d1d1",
        cursor: "pointer",
        borderRadius: "3px",
        transition: "transform 0.1s ease, filter 0.15s ease"
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.85)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = "brightness(110%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "brightness(100%)";
        e.currentTarget.style.transform = "scale(1)";
      }}
      title={`Block (${block.x}, ${block.y})${
        block.owner ? ` - Owner: ${block.owner}` : ""
      }`}
    >
      {block.owner && (
        <div
          style={{
            position: "absolute",
            top: "-22px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "black",
            color: "white",
            fontSize: "10px",
            padding: "2px 6px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            pointerEvents: "none"
          }}
        >
          {block.owner}
        </div>
      )}
    </div>
  );
};

export default Tile;
