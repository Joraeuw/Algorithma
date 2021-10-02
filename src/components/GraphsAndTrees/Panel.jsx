import Bezier from './node/BezierCurves';
const Panel = () => {
  return (
    <div className="panelDiv">
      <Bezier viewBoxWidth="1800" viewBoxHeight="1800" />
    </div>
  );
};

export default Panel;
