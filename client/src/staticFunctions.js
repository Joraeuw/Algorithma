const getStartPoint = ({ x, y }, r, theta) => {
  theta *= Math.PI / 180;
  const result = { x: x + r * Math.cos(theta), y: y - r * Math.sin(theta) };
  return result;
};

//Calculating the angle at which the arrow must be displayed
// 1. Evaluate the derivative at end point
// 2. calculate the roration angle
const ArrowAngle = (crl, end) => {
  //Full bezie curve term
  //const by =
  //3 * (1 - t) ** 2 * (crl1.y - start.y) +
  //6 * (1 - t) * t * (crl2.y - crl1.y) +
  //3 * t ** 2 * (end.y - crl2.y);

  // Fix at crl2.x === end.x
  if (crl.x === end.x) return crl.y > end.y ? -30 : 30;

  //determine in which quadrant the point is:
  //Q stands for quadrant
  //Q1 adds 0 deg
  let additional = 0;
  //Q4 add 360 deg
  if (crl.y > end.y && crl.x > end.x) additional = 360;
  //Q2 and Q3 add 180 deg
  else if (crl.x < end.x) additional = 180;

  const unitVelocityVector = {
    x: end.x - crl.x,
    y: end.y - crl.y,
  };

  const theta =
    (Math.atan(unitVelocityVector.y / unitVelocityVector.x) * 180) / Math.PI;

  return theta + additional;
};
export { getStartPoint, ArrowAngle };
