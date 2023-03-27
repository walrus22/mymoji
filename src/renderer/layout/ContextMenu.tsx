// import './ContextMenu.css';

const ContextMenu = ({ top, left, children }) => {
  return (
    <div className="context-menu" style={{ top: top, left: left }} onClick={}>
      {children}
    </div>
  );
};

export default ContextMenu;
