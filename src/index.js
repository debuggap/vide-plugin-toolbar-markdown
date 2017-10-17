import App from './App.vue'
import path from 'path'
// var hljs = require('highlight.js')
var md = require('markdown-it')({
  html: true
})
.use(require('markdown-it-highlightjs'))

export default ({editor, store, view, packageInfo, baseClass}) => {
  let isCreated = false
  // add item to toolbar
  store.dispatch('toolbar/addItem', {
    name: 'vide-plugin-toolbar-markdown',
    desc: 'transform markdown to html',
    key: 'videPluginToolbarMarkdownItem',
    icon: 'data:image/png;base64,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',
    func: 'videPluginToolbarMarkdown:click'
    // longTap: 'videPluginToolbarMarkdown:longTap'//工具栏按钮支持长按事件
  })
  // return execute class
  return class videPluginToolbarMarkdown extends baseClass {
    click () {
      if (isCreated) {
        this.$destroy()
        isCreated = false
      } else if (!/\.md$/i.test(store.state.editor.currentFile)) {
        alert('It is not a markdown file')
        return
      } else {
        isCreated = true
        let props = {
          propsData: {
            packagePath: packageInfo.path
          }
        }
        let stylePath = path.join(packageInfo.path, './dist/index.css')
        this.$mount({app: App, props, stylePath})
        this.vm.content = md.render(editor.getValue())
      }
    }
    $clean () {
      store.dispatch('toolbar/deleteItem', 'videPluginToolbarMarkdownItem')
    }
  }
}
