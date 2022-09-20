const localStorage = Window.localStorage;

let downloadFullResume = () => {
    
};

/** Switch site from terminal to normal page and back again */
let switchBasis = (terminal = false) => {
  // todo: switching functionality
  localStorage.setItem("nc-basis", localStorage.getItem("nc-basis") === "page" || terminal ? "terminal" : "page");
};

let initializeCanvas = () => {
  const canvas = document.getElementById("header-canvas");
  if(canvas.getContext) {
    const ctx = canvas.getContext('2d');
      
    const circle = new Path2D();
    circle.arc(100, 100, 100, 0, 2 * Math.PI);
    ctx.stroke(circle);
  }
 
};


/** Startup */
(() => {
  if (Window.localStorage?.getItem("nc-basis") === "page") {
    switchBasis(true);
  }
})();
