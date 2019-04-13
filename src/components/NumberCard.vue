<script>
export default {
  props: {
    value: { type: Number, default: 0 },

    size: { type: Number, required: true },
    spaceSize: { type: Number, required: true },

    pos: { type: String, required: true }
  },

  computed: {
    wholeStyle () {
      return {
        color: this.value <= 4 ? '#776e65' : '#fff',
        backgroundColor: this.getNumberBackgroundColor(this.value)
      }
    }
  },

  methods: {
    getNumberColor (value) {

    },

    getNumberBackgroundColor (value) {
      switch (value) {
        case 2:
          return '#eee4da'
        case 4:
          return '#ede0c8'
        case 8:
          return '#f2b179'
        case 16:
          return '#f59563'
        case 32:
          return '#f67c5f'
        case 64:
          return '#f65e3b'
        case 128:
          return '#edcf72'
        case 256:
          return '#edcc61'
        case 512:
          return '#9c0'
        case 1024:
          return '#33b5e5'
        case 2048:
          return '#09c'
        case 4096:
          return '#a6c'
        case 8192:
          return '#93c'
      }
      return '#8cb6c0'
    }
  }
}
</script>

<template>
  <div class="number-card" :style="wholeStyle">
    {{value}}
  </div>
</template>

<style lang="scss" scoped>
.number-card {
  position: absolute;
  font-size: 60%;
  font-weight: bold;
  line-height: 100px;
  text-align: center;
  border-radius: 6px;
}
</style>
