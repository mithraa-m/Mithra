function checkPassword() {
  let input = document.getElementById("password").value;
  let lock = document.getElementById("lock-screen");
  let secret = document.getElementById("secret-screen");
  let hint = document.getElementById("hint");

  if (input.toLowerCase() === "mithra") {
    lock.style.display = "none";
    secret.style.display = "block";
    startHearts();
  } else {
    hint.innerHTML = "❌ Wrong password! Hint: Starts with 'm' and ends with 'a'";
  }
}

// Hearts Rain Effect
function startHearts() {
  const canvas = document.getElementById("hearts-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let hearts = [];

  function Heart(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.color = "rgba(255, 105, 180, 0.8)";
  }

  function drawHeart(x, y, size) {
    ctx.beginPath();
    let topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(
      x, y,
      x - size / 2, y,
      x - size / 2, y + topCurveHeight
    );
    ctx.bezierCurveTo(
      x - size / 2, y + (size + topCurveHeight) / 2,
      x, y + (size + topCurveHeight) / 2,
      x, y + size
    );
    ctx.bezierCurveTo(
      x, y + (size + topCurveHeight) / 2,
      x + size / 2, y + (size + topCurveHeight) / 2,
      x + size / 2, y + topCurveHeight
    );
    ctx.bezierCurveTo(
      x + size / 2, y,
      x, y,
      x, y + topCurveHeight
    );
    ctx.closePath();
    ctx.fillStyle = "pink";
    ctx.fill();
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.05) {
      hearts.push(new Heart(Math.random() * canvas.width, 0, 20, 2 + Math.random() * 3));
    }
    hearts.forEach((heart, index) => {
      drawHeart(heart.x, heart.y, heart.size);
      heart.y += heart.speed;
      if (heart.y > canvas.height) {
        hearts.splice(index, 1);
      }
    });
    requestAnimationFrame(update);
  }

  update();
}
