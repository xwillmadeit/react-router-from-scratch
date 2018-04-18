## Build react-router from scratch

1.  children 可直接通过 props 传，无需使用 closing tag

```js
<a {...this.props} />

// no need to do this...
<a {...this.props}>{this.props.children}</a>
```
