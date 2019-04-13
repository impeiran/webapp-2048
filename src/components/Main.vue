<script>
import Block from './Block'

const WIN_WIDTH = document.documentElement.clientWidth
const PANEL_MAX_WIDTH = 500

const panelWidth = WIN_WIDTH > PANEL_MAX_WIDTH ? 500 : 0.92 * WIN_WIDTH
const blockSpace = WIN_WIDTH > PANEL_MAX_WIDTH ? 20 : 0.04 * WIN_WIDTH
const blockSideLength = WIN_WIDTH > PANEL_MAX_WIDTH ? 100 : 0.18 * WIN_WIDTH

export default {
  components: {
    Block
  },

  data () {
    return {
      score: 0,
      gridList: [new Array(4), new Array(4), new Array(4), new Array(4)]
    }
  },

  computed: {
    panelStyle () {
      return {
        width: `${panelWidth - 2 * blockSpace}px`,
        height: `${panelWidth - 2 * blockSpace}px`,
        padding: `${blockSpace}px`,
        borderRadius: `${0.02 * panelWidth}px`
      }
    },

    spaceSize () {
      return blockSpace
    },

    blockSize () {
      return blockSideLength
    }
  },

  methods: {
    _initGridBlockLists () {
    }
  },

  created () {
    this._initGridBlockLists()
  }
}
</script>

<template>
  <main class="main-body-2048">

    <header>
      <h1>2048</h1>
      <div class="btn-group">
        <span class="newGameBtn">NewGame</span>
        <span class="about">About</span>
      </div>
      <p>Score：<span class="score">{{score}}</span></p>
    </header>

    <section class="panel" :style="panelStyle">

      <!-- 背景格子 -->
      <template v-for="(item, index) in gridList">
        <Block v-for="(value, innerIndex) in item"
               :key="`${index}-${innerIndex}`"
               :pos="`${index}-${innerIndex}`"
               :size="blockSize"
               :spaceSize="spaceSize" />
      </template>

      <!-- 数字卡片 -->

    </section>

  </main>
</template>

<style lang="scss" scoped>
.main-body-2048 {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: Arial;
  background: #ede0c8;

  header {
    text-align: center;

    .newGameBtn, .about{
      display: inline-block;
      margin: 0 20px;
      width: 80px;
      padding: 10px;
      color: white;
      border-radius: 10px;
      cursor: pointer;
    }

    .newGameBtn {
      background-color: #E6A23C;
      &:hover {
        background-color: #F56C6C;
      }
    }
    .about {
      background-color: #6f5498;
      &:hover {
        background-color: #9f8b77;
      }
    }

    p {
      margin: 20px auto;
      font-size: 25px;
    }
  }

  .panel {
    position: relative;
    margin: 20px auto;
    padding: 20px;
    width: 460px;
    height: 460px;
    background-color: #bbada0;
    border-radius: 10px;
  }
}
</style>
