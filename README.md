# v-smoothresize
A smooth resizing directive for vue

[See an example here on codepen](https://codepen.io/JamieCurnow/pen/YjBOmY?editors=1000)

# Contribution
Yes please! This is just the start. If anyone wants to wrap this up into a plugin or for publishing on NPM be my guest! All pull requests more than welcome.

# Usage
Use the directive in your project - see [Vue - Custom Directives](https://vuejs.org/v2/guide/custom-directive.html)

Add the `v-smoothresize` directive to any element that should be resized. Optionally an object can be used to fine-tune the resizing transition length of time and also to add a delay if desired.

```
<div v-smoothresize="{transition: 200, delay: 100}">
  <div>This will always be here</div>
  <div v-if="someCondition">This will appear and the parent will grow smoothly</div>
</div>
```

[Check out the example for a clearer idea of how it works.](https://codepen.io/JamieCurnow/pen/YjBOmY?editors=1000)
