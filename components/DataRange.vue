<template>
  <div class="absolute e:left-[78%] e:top-[78%] left-[90%] top-[72%]">
    <div class="lefter group">
      <span class="animate-2nd duration-200 block group-hover:hidden" />
      <div
        class="bg-[#DA6B3B] h-max w-max p-[12px] rounded-full cursor-pointer z-[3] relative"
      >
        <svg
          class="image"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 16.4999H13.5V19.4999H10.5V16.4999ZM31.5 8.99994V29.9999C31.5 31.6499 30.15 32.9999 28.5 32.9999H7.5C5.835 32.9999 4.5 31.6499 4.5 29.9999L4.515 8.99994C4.515 7.34994 5.835 5.99994 7.5 5.99994H9V2.99994H12V5.99994H24V2.99994H27V5.99994H28.5C30.15 5.99994 31.5 7.34994 31.5 8.99994ZM7.5 11.9999H28.5V8.99994H7.5V11.9999ZM28.5 29.9999V14.9999H7.5V29.9999H28.5ZM22.5 19.4999H25.5V16.4999H22.5V19.4999ZM16.5 19.4999H19.5V16.4999H16.5V19.4999Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="overlay">
        <div
          class="text text-white font-semibold pl-[12px] text-[16px] e:text-[20px]"
        >
          {{ $t('urgent_event') }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.animate-2nd {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  position: absolute;
  width: 90px;
  height: 90px;
  z-index: 3;
  animation: pulse 2s infinite;
  pointer-events: none !important;
  top: -15px;
  left: -15px;
}

@keyframes pulse {
  0% {
    transform: scale(0.7);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.7);
  }
}

.group-hover {
  &.hidden {
    opacity: 0;
    visibility: hidden;
  }

  &.block {
    opacity: 1;
    visibility: visible;
  }
}

.image {
  display: block;
}

.overlay {
  position: absolute;
  bottom: 0;
  margin-right: 15px;
  right: 0;
  background-color: #da6b3b;
  border-radius: 46px !important;
  overflow: hidden;
  width: 0;
  height: 100%;
  transition: 0.5s ease;
}

.lefter:hover .overlay {
  width: 300px;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 47%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
</style>
