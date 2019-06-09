const numStars = 375;
const starX = [];
const starY = [];

function intersects(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  am = (ay2 - ay1) / (ax2 - ax1);
  bm = (by2 - by1) / (bx2 - bx1);
  if (am === bm) return false;

  ab = ay1 - (am * ax1);
  bb = by1 - (bm * bx1);

  min_x = Math.min(ax1, ax2, bx1, bx2);
  max_x = Math.max(ax1, ax2, bx1, bx2);

  x_sol = (bb - ab) / (am - bm)
  return min_x < x_sol && x_sol < max_x && ![ax1, ax2, bx1, bx2].includes(x_sol)
}

function setup() {
  createCanvas(displayWidth, displayHeight * .9);
  //TODO: add gradient to sky color
  for (let i = 0; i < numStars; i++) {
    starX[i] = random(0, width)
    starY[i] = random(0, height * .95)
  }
  frameRate(12)
}
function draw() {
  clear()
  background(20, 37, 66)

  stroke(20, 37, 66, 255)
  strokeWeight(1)
  for (let i = 0; i < numStars; i++) {
    //TODO: get some stars to be silver
    fill(247, 233, 44, random(150, 255))
    const randomSize = random(3, 4.5)
    ellipse(starX[i], starY[i], randomSize, randomSize)
  }

  stroke(154, 211, 244, random(25, 50))
  strokeWeight(.8)

  for (let i = 0; i < numStars; i++) {
    if (dist(mouseX, mouseY, starX[i], starY[i]) < 100) {
      for (let j = 0; j < numStars; j++) {
        //loop through neighboring stars
        if (dist(starX[i], starY[i], starX[j], starY[j]) < 75) {
          line(starX[i], starY[i], starX[j], starY[j])
        }
      }
    }
  }
}
