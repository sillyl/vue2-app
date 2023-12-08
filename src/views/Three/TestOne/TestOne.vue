<template>
  <div>
    <div class="experience">
      <canvas class="experience-canvas"></canvas>
    </div>

    <div class="preloader">
      <div class="preloader-wrapper">
        <div class="loading">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
    </div>

    <div class="page" asscroll-container>
      <div class="toggle-bar">
        <div class="sun-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              fill="currentColor"
              d="M12 5Q11.575 5 11.288 4.712Q11 4.425 11 4V2Q11 1.575 11.288 1.287Q11.575 1 12 1Q12.425 1 12.713 1.287Q13 1.575 13 2V4Q13 4.425 12.713 4.712Q12.425 5 12 5ZM16.95 7.05Q16.675 6.775 16.675 6.362Q16.675 5.95 16.95 5.65L18.35 4.225Q18.65 3.925 19.062 3.925Q19.475 3.925 19.775 4.225Q20.05 4.5 20.05 4.925Q20.05 5.35 19.775 5.625L18.35 7.05Q18.075 7.325 17.65 7.325Q17.225 7.325 16.95 7.05ZM20 13Q19.575 13 19.288 12.712Q19 12.425 19 12Q19 11.575 19.288 11.287Q19.575 11 20 11H22Q22.425 11 22.712 11.287Q23 11.575 23 12Q23 12.425 22.712 12.712Q22.425 13 22 13ZM12 23Q11.575 23 11.288 22.712Q11 22.425 11 22V20Q11 19.575 11.288 19.288Q11.575 19 12 19Q12.425 19 12.713 19.288Q13 19.575 13 20V22Q13 22.425 12.713 22.712Q12.425 23 12 23ZM5.65 7.05 4.225 5.65Q3.925 5.35 3.925 4.925Q3.925 4.5 4.225 4.225Q4.5 3.95 4.925 3.95Q5.35 3.95 5.625 4.225L7.05 5.65Q7.325 5.925 7.325 6.35Q7.325 6.775 7.05 7.05Q6.75 7.325 6.35 7.325Q5.95 7.325 5.65 7.05ZM18.35 19.775 16.95 18.35Q16.675 18.05 16.675 17.638Q16.675 17.225 16.95 16.95Q17.225 16.675 17.638 16.675Q18.05 16.675 18.35 16.95L19.775 18.35Q20.075 18.625 20.062 19.05Q20.05 19.475 19.775 19.775Q19.475 20.075 19.05 20.075Q18.625 20.075 18.35 19.775ZM2 13Q1.575 13 1.288 12.712Q1 12.425 1 12Q1 11.575 1.288 11.287Q1.575 11 2 11H4Q4.425 11 4.713 11.287Q5 11.575 5 12Q5 12.425 4.713 12.712Q4.425 13 4 13ZM4.225 19.775Q3.95 19.5 3.95 19.075Q3.95 18.65 4.225 18.375L5.65 16.95Q5.925 16.675 6.338 16.675Q6.75 16.675 7.05 16.95Q7.35 17.25 7.35 17.663Q7.35 18.075 7.05 18.375L5.65 19.775Q5.35 20.075 4.925 20.075Q4.5 20.075 4.225 19.775ZM12 18Q9.5 18 7.75 16.25Q6 14.5 6 12Q6 9.5 7.75 7.75Q9.5 6 12 6Q14.5 6 16.25 7.75Q18 9.5 18 12Q18 14.5 16.25 16.25Q14.5 18 12 18ZM12 16Q13.65 16 14.825 14.825Q16 13.65 16 12Q16 10.35 14.825 9.175Q13.65 8 12 8Q10.35 8 9.175 9.175Q8 10.35 8 12Q8 13.65 9.175 14.825Q10.35 16 12 16Z"
            />
          </svg>
        </div>
        <el-button class="toggle-button">
          <div class="toggle-circle"></div>
        </el-button>
        <div class="moon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              fill="currentColor"
              d="M12 21Q8.25 21 5.625 18.375Q3 15.75 3 12Q3 8.25 5.625 5.625Q8.25 3 12 3Q12.35 3 12.688 3.025Q13.025 3.05 13.35 3.1Q12.325 3.825 11.713 4.987Q11.1 6.15 11.1 7.5Q11.1 9.75 12.675 11.325Q14.25 12.9 16.5 12.9Q17.875 12.9 19.025 12.287Q20.175 11.675 20.9 10.65Q20.95 10.975 20.975 11.312Q21 11.65 21 12Q21 15.75 18.375 18.375Q15.75 21 12 21ZM12 19Q14.2 19 15.95 17.788Q17.7 16.575 18.5 14.625Q18 14.75 17.5 14.825Q17 14.9 16.5 14.9Q13.425 14.9 11.262 12.738Q9.1 10.575 9.1 7.5Q9.1 7 9.175 6.5Q9.25 6 9.375 5.5Q7.425 6.3 6.213 8.05Q5 9.8 5 12Q5 14.9 7.05 16.95Q9.1 19 12 19ZM11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Q11.75 12.25 11.75 12.25Z"
            />
          </svg>
        </div>
      </div>

      <div class="page-wrapper" asscroll>
        <section class="hero">
          <div class="hero-wrapper">
            <!-- Intro Stuff -->
            <div class="intro-text">Welcome to my portfolio!</div>
            <div class="arrow-svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path
                  fill="currentColor"
                  d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z"
                />
              </svg>
            </div>

            <div class="hero-main">
              <h1 class="hero-main-title">Abigail Bloom</h1>
              <p class="hero-main-description">
                Digital Media Student | 3D Artist
              </p>
            </div>

            <div class="hero-second">
              <p class="hero-second-subheading first-sub">AbigailBloom</p>
              <p class="hero-second-subheading second-sub">Portfolio</p>
            </div>
          </div>
        </section>

        <div class="first-move section-margin"></div>

        <section class="first-section section left">
          <div class="progress-wrapper progress-bar-wrapper-left">
            <div class="progress-bar"></div>
          </div>

          <div class="section-intro-wrapper">
            <h1 class="section-title">
              <span class="section-title-text">About Me</span>
              <div class="section-title-decoration styleOne"></div>
              <div class="section-title-decoration styleTwo"></div>
              <div class="section-title-decoration styleThree"></div>
            </h1>
            <span class="section-number">01</span>
          </div>

          <div class="section-detail-wrapper">
            <!-- <h3 class="section-heading">Hello!</h3> -->
            <p class="section-text">
              Hi there 👋! I'm a third-year digital media student from UK
              currently studying in Germany. My dream is to work for Disney or
              Pixar one day.
            </p>
            <p class="section-text">
              I love creating art and playing with my cats! I also like drinking
              bubble tea and going for hikes! Totally hippie lol ✌️. Welcome to
              my portfolio!
            </p>
            <!-- <h3 class="section-heading">Lorem Ipsum</h3>
            <p class="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic expedita qui quae officiis, magni velit iste repellat consequuntur temporibus. Quasi atque officia iste beatae rerum, harum itaque accusamus. At, natus?</p> -->
            <!-- <h3 class="section-heading">Lorem Ipsum</h3>
            <p class="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic expedita qui quae officiis, magni velit iste repellat consequuntur temporibus. Quasi atque officia iste beatae rerum, harum itaque accusamus. At, natus?</p> -->
          </div>
        </section>

        <div class="second-move section-margin"></div>

        <section class="second-section section right">
          <div class="progress-wrapper progress-bar-wrapper-right">
            <div class="progress-bar blue-background"></div>
          </div>

          <div class="section-intro-wrapper blue-text blue-border">
            <h1 class="section-title blue-text blue-border">
              <span class="section-title-text blue-text">My Work</span>
              <div class="section-title-decoration styleOne blue-border"></div>
              <div class="section-title-decoration styleTwo blue-border"></div>
              <div
                class="section-title-decoration styleThree blue-background blue-border"
              ></div>
            </h1>
            <span class="section-number blue-text">02</span>
          </div>

          <div class="section-detail-wrapper">
            <h3 class="section-heading">Candycane Village</h3>
            <p class="section-text">
              This project is in progress but it's about a super colorful
              village where the entire world including the people are candies.
              So far the story is that they are set out to explore their "space"
              only to realize it's a human that will try to destroy them.
            </p>
            <h3 class="section-heading">Rebecca's Reddish Radishes</h3>
            <p class="section-text">
              Oh what's that? Why, it's a red radish! Oop, another one! In this
              playful and comedy animation, Rebecca, a young farmer, decided to
              plant radishes for the first time, but there is a big twist!
            </p>
            <h3 class="section-heading">Flora</h3>
            <p class="section-text">
              A heartwarming story about a little orphan girl who tries to find
              her way back home.
            </p>
          </div>
        </section>

        <div class="third-move section-margin"></div>

        <section class="third-section section left">
          <div class="progress-wrapper progress-bar-wrapper-left">
            <div class="progress-bar green-background"></div>
          </div>

          <div class="section-intro-wrapper green-text green-border">
            <h1 class="section-title green-text green-border">
              <span class="section-title-text green-text">Contact Me</span>
              <div class="section-title-decoration styleOne green-border"></div>
              <div class="section-title-decoration styleTwo green-border"></div>
              <div
                class="section-title-decoration styleThree green-background green-border"
              ></div>
            </h1>
            <span class="section-number green-text">03</span>
          </div>

          <div class="section-detail-wrapper">
            <h3 class="section-heading">ArtStation</h3>
            <p class="section-text">
              I post all my work here. I don't want to link it yet because I
              want to sort it out a little bit!
            </p>
            <h3 class="section-heading">Instagram</h3>
            <p class="section-text">
              Check out my personal instagram for travel pics and food and
              stuff.
            </p>
            <h3 class="section-heading">LinkedIn</h3>
            <p class="section-text">Career updates and so much more!</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Experience from "./Experience/Experience";
export default {
  mounted() {
    const experience = new Experience(
      document.querySelector(".experience-canvas")
    );
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: "Montserrat", sans-serif;
}

/* body{
  overflow: hidden;
} */

h1,
section,
p,
span,
svg {
  transition: background-color 0.5s, color 0.5s;
}

:root {
  /* Light Theme Variables */
  --color-text-light: #333332;
  --color-background-light: #faf4e5;
  --color-pink-light: #e5a1aa;
  --color-green-light: #7ad0ac;
  --color-blue-light: #8395cd;

  /* Dark Theme Variables */
  --color-text-dark: #faf4e5;
  --color-background-dark: #8395cd;
}

.light-theme {
  --color-text: var(--color-text-light);
  --color-background: var(--color-background-light);
  --color-pink: var(--color-pink-light);
  --color-green: var(--color-green-light);
  --color-blue: var(--color-blue-light);
}

.dark-theme {
  --color-text: var(--color-text-dark);
  --color-background: var(--color-background-dark);
  --color-pink: var(--color-text-dark);
  --color-green: var(--color-text-dark);
  --color-blue: var(--color-text-dark);
}

/* Experience --------------------------------------------- */

.experience {
  position: fixed;
  width: 100vw;
  height: 100vh;
}

.experience-canvas {
  width: 100%;
  height: 100%;
}

.hidden {
  display: none;
}

/* Preloader */
.preloader {
  background-color: var(--color-background-light);
  width: 100%;
  height: 100vh;
  position: fixed;
  opacity: 1;
  z-index: 99999999999999999;
}

.preloader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 6px;
  background-color: var(--color-pink-light);
  animation: load 1s ease-in-out infinite;
}

.circle:nth-child(2) {
  animation-delay: 0.1s;
}

.circle:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes load {
  0% {
    transform: translateY(0);
  }

  20% {
    transform: translateY(-12px);
  }

  40% {
    transform: translateY(0);
  }
}

/* Page Itself --------------------------------------------- */
.page {
  z-index: 99999;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.page-wrapper {
  position: relative;
}

/* Preloader Stuff */
.animatedis {
  display: inline-block;
  transform: translateY(100%);
}

.intro-text {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  font-weight: 500;
  font-size: 16px;
  color: var(--color-text);
  transform: translate(-50%, -50%);
}

.arrow-svg-wrapper {
  position: absolute;
  top: 90%;
  left: 50%;
  opacity: 0;
  color: var(--color-text);
  transform: translate(-50%, -50%);
  animation: bounce 0.5s ease-in alternate infinite;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(8px);
  }
}

/* Toggle Bar --------------------------------------------- */
.toggle-bar {
  position: fixed;
  display: flex;
  opacity: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 48px;
  right: 48px;
  z-index: 99999999999999;
}

.sun-wrapper,
.moon-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: var(--color-text);
}

.toggle-button {
  cursor: pointer;
  position: relative;
  width: 56px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-pink);
  border-radius: 999px;
  margin: 0px 16px;
  border: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.toggle-circle {
  position: absolute;
  left: 6px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: var(--color-background);
  transition: all 0.2s ease-in-out;
}

.toggle-button:hover .toggle-circle {
  transform: scale(0.9);
}

.slide {
  left: 31px;
}

/* Section Formatting --------------------------------------------- */
.section-margin {
  height: 3000px;
  width: 100%;
}

.section {
  position: relative;
  width: 50%;
  padding: 1000px 4%;
  margin: 0;
  background-color: var(--color-background);
  overflow: hidden;
}

.left {
  margin-right: auto;
  border-top-right-radius: 700px 700px;
  border-bottom-right-radius: 0px 0px;
}

.right {
  margin-left: auto;
  border-top-left-radius: 700px 700px;
  border-bottom-left-radius: 0px 0px;
}

/* Progress bars */
.progress-wrapper {
  height: 0;
  width: 12px;
  z-index: 9999;
}

.progress-bar-wrapper-left {
  position: absolute;
  top: 0;
  left: 0;
}

.progress-bar-wrapper-right {
  position: absolute;
  top: 0;
  right: 0;
}

.progress-bar {
  height: 100vh;
  width: 100%;
  background-color: var(--color-pink);
  transform-origin: top center;
  transform: scaleY(1);
}

/* Sections -------------- */

.section-intro-wrapper {
  position: relative;
  padding: 20% 5%;
  border-bottom: 2px solid var(--color-pink);
  padding-bottom: 400px;
}

.section-intro-wrapper:nth-child(3) {
  border-bottom: 2px solid var(--color-green);
}

.section-detail-wrapper {
  position: relative;
  padding: 20% 5%;
}

.section-heading {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.8;
  margin-top: 64px;
  color: var(--color-text);
}

.section-text {
  line-height: 2;
  margin-top: 18px;
  font-size: 16px;
  color: var(--color-text);
}

/* Fancy Decoration Part of Section */
.section-title {
  position: relative;
  color: var(--color-pink);
}

.section-title-text {
  display: block;
  font-size: 40px;
  font-weight: 500;
  transform-origin: left;
  transform: skewY(25deg);
  z-index: 5;
  text-transform: uppercase;
  color: var(--color-pink);
}

.styleOne,
.styleTwo,
.styleThree {
  position: absolute;
  display: block;
  width: 100%;
  max-width: 278px;
  height: 60px;
  border: 1px solid var(--color-pink);
  transform-origin: left;
  transform: skewY(-25deg);
}

.styleOne {
  top: 0px;
}

.styleTwo {
  top: 80px;
}

.styleThree {
  top: 80px;
  transform: skewY(25deg);
  background-color: var(--color-pink);
}

.section-number {
  position: absolute;
  bottom: 15px;
  right: 0;
  color: var(--color-pink);
  font-size: 24px;
}

/* Hero section -------------------------------- */

.hero {
  width: 100vw;
  height: 100vh;
}

.hero-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  max-width: 1100px;
}

.hero-main {
  position: absolute;
  bottom: 168px;
  left: 0;
  color: var(--color-text);
}

.hero-second {
  position: absolute;
  top: calc(50% - 120px);
  right: 0;
  color: var(--color-text);
}

.hero-main-title {
  font-size: 64px;
  color: var(--color-text);
}

.hero-main-description {
  font-size: 18px;
  color: var(--color-text);
}

.hero-second-subheading {
  font-size: 32px;
  text-transform: uppercase;
  color: var(--color-text);
}

/* Other colors override */

.blue-text {
  color: var(--color-blue);
}

.blue-border {
  border-color: var(--color-blue);
}

.blue-background {
  background-color: var(--color-blue);
}

.green-text {
  color: var(--color-green);
}

.green-border {
  border-color: var(--color-green);
}

.green-background {
  background-color: var(--color-green);
}

/* Media Queries */

@media (max-width: 968px) {
  .section {
    width: 100%;
  }
  .progress-bar-wrapper-left {
    right: 0;
    left: auto;
  }
  .hero-main {
    bottom: 120px;
  }
  .hero-second {
    top: 160px;
  }
  .hero-wrapper {
    width: calc(100% - 60px);
  }
  .hero-main-title {
    font-size: 32px;
  }
  .hero-main-description {
    font-size: 18px;
  }
  .hero-second-subheading {
    font-size: 18px;
  }
}
</style>
