---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---
<style>
.content-container {
  width: fit-content;
}
.text-gradient {
  font-weight: 800;
  color: black;
}


  .text-gradient {
        display: inline-block;
        margin: 0;
        line-height: 1em;
        font-family: Helvetica, Arial, sans-serif;
        font-weight: bold;
        font-size: 200px;
        background: linear-gradient(to left, black 50%, blue 50%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: trsansparent;
        width: fit-content;
  }
  
  .text-gradient::selection {
    color: black;
    background: white;
  }
  

  .flex {
    display: flex;
  }

body {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}  
</style>
<div class="flex">
<h1 class="text-gradient"><span class="text-gradient">Nitin Gradients</span></h1>

</div>