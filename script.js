class Fish {
  constructor(element) {
    this.element = element;
    this.tank = document.getElementById("tank");

    this.images = [
      "fish1.png",
      "fish2.png",
      "fish3.png",
      "fish4.png",
      "fish5.png",
    ];

    let randomFish = Math.floor(Math.random() * this.images.length);
    this.element.src = this.images[randomFish];

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;

    this.x = Math.random() * (this.tank.clientWidth - this.width);
    this.y = Math.random() * (this.tank.clientHeight - this.height);

    this.direction = Math.random() < 0.5 ? -1 : 1;

    this.speed = Math.random() * 2 + 0.5;

    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }

  move() {
    this.x += this.speed * this.direction;

    if (this.x + this.width >= this.tank.clientWidth) {
      this.x = this.tank.clientWidth - this.width;
      this.direction = -1;
    }

    if (this.x <= 0) {
      this.x = 0;
      this.direction = 1;
    }

    this.updatePosition();
  }
  checkDirection() {
    if (Math.random() < 0.5) {
      this.direction *= -1;
    }
    this.scheduleDirectionCheck();
  }

  scheduleDirectionCheck() {
    let delay = Math.random() * 6000 + 2000;

    setTimeout(() => {
      this.checkDirection();
    }, delay);
  }
}

const fishElements = document.querySelectorAll(".fish");

const fishes = [];

fishElements.forEach((element) => {
  let fish = new Fish(element);
  fishes.push(fish);
  fish.scheduleDirectionCheck();
});

function animate() {
  fishes.forEach((fish) => {
    fish.move();
  });
  requestAnimationFrame(animate);
}
animate();
