import React, { PureComponent } from 'react';

class Bezier extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // 4 Bézier points, stored in state
      startPoint: { x: 10, y: 10 },
      controlPoint1: { x: 190, y: 100 },
      controlPoint2: { x: 150, y: 50 },
      endPoint: { x: 10, y: 190 },

      // keep track of which point is currently being dragged
      draggingPointId: null,
    };
  }

  handleMouseDown(pointId) {
    this.setState({ draggingPointId: pointId });
  }

  handleMouseUp() {
    this.setState({ draggingPointId: null });
  }

  handleMouseMove({ clientX, clientY }) {
    const { viewBoxWidth, viewBoxHeight } = this.props;
    const { draggingPointId } = this.state;

    // If we're not currently dragging a point, this is
    // a no-op. Nothing needs to be done.
    if (!draggingPointId) {
      return;
    }

    // During render, we capture a reference to the SVG
    // we're drawing, and store it on the instance with
    // `this.node`.
    // If we were to `console.log(this.node)`, we'd see a
    // reference to the underlying HTML element.
    // eg. `<svg viewBox="0 0 250 250"
    const svgRect = this.node.getBoundingClientRect();

    /*
      Ok, this next bit requires some explanation.
  
      The SVG rect gives us the element's position relative
      to the viewport.
  
      The user's mouse position with `clientX` and `clientY`
      is also relative to the viewport.
  
      What we actually care about, though, is the cursor's
      position relative to the SVG itself.
  
      Let's use a diagram! Imagine if ⬁ is the user's cursor:
  
  
      ------------------------------------------------------
      | viewport            ______________                 |
      |                    |              |                |
      |                    |       ⬁      | <- SVG         |
      |                    |______________|                |
      |____________________________________________________|
  
      ^----------------------------^ This is the `clientX`;
                                     the distance between the
                                     viewport and the cursor.
  
      ^-------------------^          This is the `svgRect`
                                     `left` value. Distance
                                     between the viewport and
                                     the SVG's left edge.
  
                          ^--------^ This is the distance we
                                     care about; the distance
                                     between the SVG's left
                                     edge, and the cursor.
  
      We can get that value with subtraction!
      */
    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;

    /*
      The next problem is that our SVG has a different
      coordinate system: Our SVG's `viewBox` might be 250x250,
      while in terms of the screen real-estate it might
      actually take up 500x500 pixels!
  
      To solve for this, I used cross-multiplication. Here are
      the variables we need:
  
      - svgX            The value we just calculated. The
                        cursor's `x` position within the SVG.
  
      - viewBoxWidth    The width of the SVG's internal
                        coordinate system. Specified via
                        props to this component.
  
      - svgRect.width   The on-screen width of the DOM element
                        Returned from `getBoundingClientRect`.
  
      Armed with that data, we can cross-multiply as follows:
  
           svgX               viewBoxX (unknown)
      --------------    =    --------------------
       viewBoxWidth             svgRect.width
  
      The left side of this equation is in terms of the screen
      real-estate: our cursor might be 250px into a 500px-wide
      svg.
  
      The right side is the SVG's viewBox coordinate system.
      We're `X` pixels into a 250px-wide viewBox.
  
      When we re-arrange the formula to solve for `viewBoxX`,
      we wind up with:
      */
    const viewBoxX = (svgX * viewBoxWidth) / svgRect.width;

    // We do the same thing for the vertical direction:
    const viewBoxY = (svgY * viewBoxHeight) / svgRect.height;

    // Phew! That was a lot of stuff, but in the end we
    // wind up with the user's mouse position within the
    // SVG's viewBox, and can update React state so that it
    // re-renders in this new position!
    this.setState({
      [draggingPointId]: { x: viewBoxX, y: viewBoxY },
    });
  }

  render() {
    const { viewBoxWidth, viewBoxHeight } = this.props;
    const { startPoint, controlPoint1, controlPoint2, endPoint } = this.state;

    // As we've seen before, the quadratic Bézier curve
    // involves moving to the starting point, and then
    // specifying the control and end points with `Q`
    const instructions = `
        M ${startPoint.x},${startPoint.y}
        C ${controlPoint1.x},${controlPoint1.y}
          ${controlPoint2.x},${controlPoint2.y}
          ${endPoint.x},${endPoint.y}
      `;
    return (
      <svg
        ref={(node) => (this.node = node)}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        onMouseMove={(ev) => this.handleMouseMove(ev)}
        onMouseUp={() => this.handleMouseUp()}
        onMouseLeave={() => this.handleMouseUp()}
        style={{
          overflow: 'visible',
          width: '100%',
          border: '1px solid',
        }}
      >
        <ConnectingLine from={startPoint} to={controlPoint1} />
        {/*<ConnectingLine from={controlPoint1} to={endPoint} />*/}

        {/*<ConnectingLine from={startPoint} to={controlPoint2} />*/}
        <ConnectingLine from={controlPoint2} to={endPoint} />

        <Curve instructions={instructions} />

        <TailHandle
          coordinates={startPoint}
          onMouseDown={() => this.handleMouseDown('startPoint')}
        />

        <HeadHandle
          coordinates={endPoint}
          crl2={controlPoint2}
          onMouseDown={() => this.handleMouseDown('endPoint')}
        />

        <SmallHandle
          coordinates={controlPoint1}
          onMouseDown={() => this.handleMouseDown('controlPoint1')}
        />

        <SmallHandle
          coordinates={controlPoint2}
          onMouseDown={() => this.handleMouseDown('controlPoint2')}
        />
      </svg>
    );
  }
}

// These helper stateless-functional-components allow us
// to reuse styles, and give each shape a meaningful name.

const ConnectingLine = ({ from, to }) => (
  <line
    x1={from.x}
    y1={from.y}
    x2={to.x}
    y2={to.y}
    stroke="rgb(200, 200, 200)"
    strokeDasharray="5,5"
    strokeWidth={2}
  />
);

const Curve = ({ instructions }) => (
  <path
    d={instructions}
    fill="none"
    stroke="rgb(213, 0, 249)"
    strokeWidth={5}
  />
);

const TailHandle = ({ coordinates, onMouseDown }) => (
  <ellipse
    cx={coordinates.x}
    cy={coordinates.y}
    rx={15}
    ry={15}
    fill="rgb(244, 0, 137)"
    onMouseDown={onMouseDown}
    style={{ cursor: '-webkit-grab' }}
  />
);
const HeadHandle = ({ coordinates, onMouseDown, crl2 }) => {
  const { x, y } = coordinates;
  const h = 30;
  const point1 = {
    x: x + h / 3,
    y: y - (Math.sqrt(3) / 3) * h,
  };
  const point2 = {
    x: x + h / 3,
    y: y + (Math.sqrt(3) / 3) * h,
  };
  const point3 = {
    x: x - (2 * h) / 3,
    y: y,
  };
  const rotation = ArrowAngle(crl2, coordinates);

  return (
    <polygon
      points={`${point1.x},${point1.y} ${point2.x},${point2.y} ${point3.x},${point3.y}`}
      onMouseDown={onMouseDown}
      style={{ cursor: '-webkit-grab' }}
      fill="rgb(244, 0, 137)"
      transform={`rotate(${rotation} ${x} ${y})`}
    />
  );
};

//Calculating the angle at which the arrow must be displayed
// 1. Evaluate the derivative at end point
// 2. calculate the roration angle
const ArrowAngle = (crl2, end) => {
  //Full bezie curve term
  //const by =
  //3 * (1 - t) ** 2 * (crl1.y - start.y) +
  //6 * (1 - t) * t * (crl2.y - crl1.y) +
  //3 * t ** 2 * (end.y - crl2.y);

  // Fix at crl2.x === end.x
  if (crl2.x === end.x) return crl2.y > end.y ? -30 : 30;

  //determine in which quadrant the point is:
  //Q1 adds 0 deg
  let additional = 0;
  //Q4 add 360 deg
  if (crl2.y > end.y && crl2.x > end.x) additional = 360;
  //Q2 and Q3 add 180 deg
  else if (crl2.x < end.x) additional = 180;

  const unitVelocityVector = {
    x: end.x - crl2.x,
    y: end.y - crl2.y,
  };

  const theta =
    (Math.atan(unitVelocityVector.y / unitVelocityVector.x) * 180) / Math.PI;

  return theta + additional;
};

const SmallHandle = ({ coordinates, onMouseDown }) => (
  <ellipse
    cx={coordinates.x}
    cy={coordinates.y}
    rx={8}
    ry={8}
    fill="transparent"
    stroke="rgb(244, 0, 137)"
    strokeWidth={2}
    onMouseDown={onMouseDown}
    style={{ cursor: '-webkit-grab' }}
  />
);

//render(<Bezier viewBoxWidth={250} viewBoxHeight={250} />);
export default Bezier;
