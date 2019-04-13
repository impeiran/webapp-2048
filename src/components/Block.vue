<script>
export default {
  props: {
    size: { type: Number, required: true },
    spaceSize: { type: Number, required: true },

    pos: { type: String, required: true }
  },

  computed: {
    posRow () {
      return this.pos.split('-')[0]
    },

    posCol () {
      return this.pos.split('-')[1]
    },

    blockBaseInfoStyle () {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        top: `${this.spaceSize + this.posRow * (this.spaceSize + this.size)}px`,
        left: `${this.spaceSize + this.posCol * (this.spaceSize + this.size)}px`
      }
    }
  },

  methods: {

  }
}
</script>

<template>
  <div class="block" :style="blockBaseInfoStyle">
  </div>
</template>

<style lang="scss" scoped>
.block {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 6px;
  background: #ccc0b3;
}
</style>
