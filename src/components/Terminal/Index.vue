<template>
  <div class='terminal'>
    <div id="xterm" class="xterm" />
    <div class="input-content" v-if="visibleInput">
      <h4> 输入端  <el-button type="primary" size="mini" @click="onReconnect">重连</el-button></h4>
      <div class="input-action">
        <el-input v-model="inputVal" placeholder="请输入"></el-input>
        <el-button type="primary"  size="mini" @click="onClick">发送</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import { debounce } from 'lodash'

export default {
  name: 'Terminal',
  props: {
    socketURI: {
      type: String,
      default: ''
    },
    visibleInput: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      inputVal: '',
      term: null,
      terminalOptions: {
        rendererType: 'canvas', // 渲染类型
        rows: 40, // 行数
        cols: 100, // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, // 启用时，光标将设置为下一行的开头
        scrollback: 50, // 终端中的回滚量
        disableStdin: false, // 是否应禁用输入
        windowsMode: true, // 根据窗口换行
        cursorStyle: 'bar', // 光标样式
        cursorWidth: 2, // 光标宽度
        cursorBlink: true, // 光标闪烁
        theme: {
          foreground: '#ECECEC', // 字体
          background: '#000000', // 背景色
          cursor: 'help'// 设置光标
        }
      },
      socket: '',
      accessToken: 'token',
      heartCheck: {
        timeout: 5000,
        timeoutObj: null,
        message: 'h'
      },
      onResize: null
    }
  },
  mounted () {
    if (this.term) { this.term.dispose() }
    this.initTerm()
  },
  beforeDestroy () {
    this.socket && this.socket.close()
    this.term && this.term.dispose()
    this.clearHeartCheck()
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    initTerm () {
      const term = new Terminal({ ...this.terminalOptions })
      if (!this.socketURI) return
      this.initSocket()
      const attachAddon = new AttachAddon(this.socket)
      const fitAddon = new FitAddon()
      term.loadAddon(attachAddon)
      term.loadAddon(fitAddon)
      term.open(document.getElementById('xterm'))
      fitAddon.fit()
      term.focus()
      function onResize () {
        try {
          fitAddon.fit()
          // 窗口大小改变时触发xterm的resize方法，向后端发送行列数，格式由后端决定
          term.onResize(size => {
            const prompt = { Op: 'resize', Cols: size.cols, Rows: size.rows }
            if (this.socket) {
              this.socket.send(JSON.stringify(prompt))
            }
          })
        } catch (err) {
          console.log('err', err.message)
        }
      }
      window.addEventListener('resize', debounce(onResize, 100))
      this.term = term
    },
    initSocket () {
      // this.socket = new WebSocket(this.socketURI, 'websockt')
      this.socket = new WebSocket(this.socketURI)

      this.socketOnClose()
      this.socketOnOpen()
      this.socketOnMessage()
      this.socketOnError()
    },
    socketOnOpen () {
      this.socket.onopen = () => {
        // 链接成功后
        console.log('websocket链接成功---')
        this.startHeartCheck()
      }
    },
    socketOnMessage () {
      this.socket.onmessage = (msg) => {
        // this.term.write(msg?.data)
        console.log('this.msg', msg)
      }
    },
    socketOnClose () {
      this.socket.onclose = (event) => {
        if (event.wasClean) {
          console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
        } else {
          // 例如服务器进程被杀死或网络中断
          // 在这种情况下，event.code 通常为 1006
          console.log('[close] Connection died')
        }
        this.clearHeartCheck()
      }
    },
    socketOnError () {
      this.socket.onerror = () => {
        this.$message.error('websoket连接失败，请刷新！')
      }
    },
    startHeartCheck () {
      if (this.socket) {
        this.heartCheck.timeoutObj = setInterval(() => {
          if (this.socket && this.socket?.readyState === 1) {
            this.socket.send(this.heartCheck.message) // 开始发送特殊标识,后端返回当前用户的工作路径
          }
        }, this.heartCheck.timeout)
      }
    },
    clearHeartCheck () {
      clearInterval(this.heartCheck.timeoutObj)
    },
    onReconnect(){
      this.initSocket()
    },
    onClick () {
      this.socket.send(this.inputVal)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss'
</style>
