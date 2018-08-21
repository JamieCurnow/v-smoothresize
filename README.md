# v-smooth-resize
A smooth resizing directive for vue

[See an example here on codepen](https://codepen.io/JamieCurnow/full/YjBOmY/)

# Contribution
Yes please! This is just the start. If anyone wants to wrap this up into a plugin or for publishing on NPM be my guest! All pull requests more than welcome.

# Usage
Use the directive in your project - see [Vue - Custom Directives](https://vuejs.org/v2/guide/custom-directive.html)

Add the `v-smooth-resize` directive to any element that should be resized smoothly when child nodes are updated. Optionally an object can be used to fine-tune the resizing, change the transition length of time and also to add a delay if desired.

`fineTune` = the amount of browser repaints to wait for before we abandon the smooth resize. Useful if the children have transitions that last more than 20 browser repaints. Default is `20`, creep up from there - if it's too high, it will max the call stack.

`transition` = set the transition time for the change of height in `ms`. Useful for elements with large children so that the resize animation doesn't seem really fast. Default is `300`

`delay` = set a delay time in `ms` once we have caught the resize event and before actually changing the size of the element. This could be useful for children that take time to load once mounted. Default is `0`.

```
<div v-smoothresize="{fineTune: 27, transition: 400, delay: 100}">
  <div>This will always be here</div>
  <div v-if="someCondition">This will appear and the parent will grow smoothly</div>
</div>
```

[Check out the example for a clearer idea of how it works.](https://codepen.io/JamieCurnow/full/YjBOmY/)
