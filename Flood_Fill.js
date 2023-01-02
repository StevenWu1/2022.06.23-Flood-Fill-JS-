
////////////////////////////////////////////////////////////
// CHOOSE A PANCAKE STACK
//
// To choose which of the four pancake stacks you are
// currently working on, adjust the slider at the top
// of the canvas. The value of the `img` object will
// be updated appropriately. You will not edit this.

let slider;
let currentPancakeStack;
let img;


////////////////////////////////////////////////////////////
// IMAGE INFO
//
// The four _object literals_ contain the URL size
// for each image. Do not edit these four values.

function imageUrl(s) {
  const url =
    "https://raw.githubusercontent.com/UChicago-PL/" +
      "cs11111-assets/main/counting-pancakes/" +
      s + ".png";
  return url;
}

const shortStack = {
  url: imageUrl("short-stack"),
  width: 200,
  height: 200,
  seeds: [
    [[79, 79]],
    [[156, 109]],
    [[143, 131]],
    [[141, 156]]
  ]
};

const mediumStack = {
  url: imageUrl("medium-stack"),
  width: 200,
  height: 200,
  seeds: [] // Update this at bottom of file (Step 3)
};

const tallStack = {
  url: imageUrl("tall-stack"),
  width: 500,
  height: 429,
  seeds: [] // Update this at bottom of file (Step 3)
};

const towerStack = {
  url: imageUrl("tower-stack"),
  width: 340,
  height: 1000,
  seeds: [] // Update this at bottom of file (Step 3)
};

const allPancakeStacks = [
  shortStack,
  mediumStack,
  tallStack,
  towerStack
];

let allImages;


////////////////////////////////////////////////////////////
// SKETCH ARCHITECTURE
//
// You do _not_ need to edit any of these.

const captionTextSize = 20;
const captionHeight = 1.5 * captionTextSize;

function preload() {
  allImages = [];
  for (let i = 0; i < allPancakeStacks.length; i++) {
    allImages[i] = loadImage(allPancakeStacks[i].url);
  }
}

function setCurrentPancakeStack() {
  let i = slider.value() - 1;
  currentPancakeStack = allPancakeStacks[i];
  img = allImages[i];
}

function setup() {

  slider = createSlider(1, 4, 1);
  slider.position(0, 0);
  slider.style("width", "60px");

  setCurrentPancakeStack();
  createCanvas(
    currentPancakeStack.width,
    currentPancakeStack.height + captionHeight
  );

  frameRate(1);
}

function draw() {
  setCurrentPancakeStack();
  resizeCanvas(
    currentPancakeStack.width,
    currentPancakeStack.height + captionHeight
  );
  image(img, 0, 0);
  colorThePancakes();
  drawCaption();
}

function drawCaption() {
  const str = `${currentPancakeStack.seeds.length} pancakes!`;

  noStroke();
  fill("#888888");
  rect(0, img.height, img.width, captionHeight);

  fill("white");
  textFont("Garamond");
  textSize(captionTextSize);
  textAlign(CENTER, CENTER);
  text(str, 0, img.height, img.width, captionHeight);
}

function mouseClicked() {
  const x = Math.round(mouseX);
  const y = Math.round(mouseY);

  if (x < 60 && y < 20) {
    // top-left region is occupied by slider

  } else {
    floodFill(x, y, color("red"));
    const s = `[${x}, ${y}]`;
    console.log(`Copied to clipboard: ${s}`);
    navigator.clipboard.writeText(s);
  }
}


////////////////////////////////////////////////////////////
// STEP 1: Finish implementing `floodFill()`.

function floodFill(xSeed, ySeed, fillColor) {

  let alreadyFilled = [];
  for(i = 0; i < width; i++){
    alreadyFilled.push([]);
    for(j = 0; j < height; j++){
      alreadyFilled[i].push(false);
    }
    }  
  
  // TODO: Initialize alreadyFilled to be a nested array
  // booleans, such that alreadyFilled[x][y] = false for
  // all valid (x,y) positions in the image.
  
  img.loadPixels();

  // Initialize worklist with the seed location
  let worklist = [[xSeed, ySeed]];

  // A counter to help safeguard against infinite loops
  // during development. TODO: Adjust this value to
  // allow more flooding.
  let fuel = 100000;

  while (worklist.length > 0 && fuel > 0) {

    // Remove a position from the worklist
    const [x, y] = worklist.shift();           // TODO: replace undefined
    
    const withinBounds = x >= 0 && x < width;

    const notAlreadyFilled = (alreadyFilled[x][y] === false);  // TODO: replace false
    
    if (withinBounds && notAlreadyFilled) {
      const c = img.get(x, y);
      const [r, g, b, a] = c;
      
      const isWhitish = r === 255 && g === 255 && b === 255;       // TODO: replace false
      const isTransparent = a === 0;   // TODO: replace false
      if (isWhitish || isTransparent) {
        img.set(x, y, fillColor);
        alreadyFilled[x][y] = true;
        append(worklist, [x + 1, y]);
        append(worklist, [x - 1, y]);
        append(worklist, [x, y + 1]);
        append(worklist, [x, y - 1]);
        // TODO: update color of this pixel
        // TODO: update alreadyFilled[x][y] for this pixel
        // TODO: add four neighboring pixels to worklist
      }
    }

    fuel--;
  }

  img.updatePixels();
}


////////////////////////////////////////////////////////////
// STEP 2: Implement `colorThePancakes()`.

function colorThePancakes() {
  const accentColors = [
    "#7fc97f",
    "#beaed4",
    "#fdc086",
    "#ffff99",
    "#386cb0",
    "#f0027f",
    "#bf5b17",
    "#666666"
  ];

  // TODO:
  // iterate over the seed values in the (nested) array
  // currentPancakeStack.seeds, and call floodFill
}
