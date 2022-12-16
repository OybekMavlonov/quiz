<template>
  <div class="auth-layout">
    <div class="bg-image-block">
      <div class="embla embla__viewport" ref="emblaNode">
        <div class="embla__container">
          <div class="embla__slide">
            <div class="embla__slide__inner" id="slide-1">
            </div>
          </div>
          <div class="embla__slide">
            <div class="embla__slide__inner" id="slide-2">
            </div>
          </div>
          <div class="embla__slide">
            <div class="embla__slide__inner" id="slide-3">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="auth-side ml-auto"
      style="background-color: white"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const [emblaNode] = emblaCarouselVue({ loop: false }, [Autoplay()])

</script>

<style scoped lang="scss">
.auth-layout {
  display: flex;
  .bg-image-block {
    width: 70%;
  }
  .auth-side {
    width: 30%;
  }
}
#slide-1 {
  background-image: url('../assets/img/bg.jpg');
}
#slide-2 {
  background-image: url('../assets/img/bg1.jpg');
}
#slide-3 {
  background-image: url('../assets/img/bg2.jpg');
}

.embla {
  position: relative;
}

.embla__viewport {
  overflow: hidden;
}

.embla__viewport.is-draggable {
  cursor: move;
  cursor: grab;
}

.embla__viewport.is-dragging {
  cursor: grabbing;
}

.embla__container {
  display: flex;
  will-change: transform;
  margin-left: -1rem;
}

.embla__slide {
  flex: 0 0 auto;
  width: 100%;
  position: relative;
  padding-left: 1rem;
  counter-increment: embla;
}

.embla__slide__inner {
  position: relative;
  height: 100vh;

  width: 100%;
  background-size: cover;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to left, #006690, #003452);
    opacity: 0.4;
    z-index: 0;
  }
  img {
    width: 100%;
  }
}

</style>