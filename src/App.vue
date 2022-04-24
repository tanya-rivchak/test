<template>
  <nav>
    <router-link to="/">Banks List</router-link> |
    <router-link to="/calculator">Calculator</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
:root{
  --black: #1E1E1E;
  --white: #fff;
  --gray: #F7F6F9;
  --smoky: #7A7A7A;
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  &::selection{
    color: var(--white);
    background: var(--black);
  }
  &:focus, &:active{
    outline: none;
    outline-width: 0;
  }
}
body{
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column nowrap;
  color: var(--black);
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  flex: 1;
  min-height: 100%;
  width: 100%;
  max-width: 920px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
}
.title{
  text-align: left;
  margin: 20px 0 40px;
}
nav {
  padding: 20px 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;

  a {
    font-weight: 400;
    color: var(--smoky);
    margin-left: 10px;
    margin-right: 10px;
    text-decoration: none;
    position: relative;
    transition: all .3s ease-in;

    &:last-child{
      margin-right: 0;
    }

    &:not(.router-link-exact-active):hover{
      color: var(--black)
    }

    &.router-link-exact-active {
      color: var(--black);
    }
  }
}

.btn{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5px 20px;
  border-radius: 5px;
  background: transparent;
  color: var(--smoky);
  position: relative;
  border: none;
  cursor: pointer;
  transition: color .3s ease-in;
  &::after, &::before{
    content: '';
    display: block;
    position: absolute;
    width: 9px;
    height: 9px;
    box-sizing: border-box;
    transition: border-color .3s ease-in;
    border-top: 3px solid  var(--smoky);
  }
  &::before{
    top: 0;
    left: 0;
    border-top-left-radius: 5px;
    border-left: 3px solid var(--smoky);
  }
  &::after{
    top: 0;
    right: 0;
    border-top-right-radius: 5px;
    border-right: 3px solid var(--smoky);
  }
  >span{
    &::after, &::before{
      content: '';
      display: block;
      position: absolute;
      width: 9px;
      height: 9px;
      box-sizing: border-box;
      transition: border-color .3s ease-in;
      border-bottom: 3px solid  var(--smoky);
    }
    &::before{
      bottom: 0;
      left: 0;
      border-bottom-left-radius: 5px;
      border-left: 3px solid var(--smoky);
    }
    &::after{
      bottom: 0;
      right: 0;
      border-bottom-right-radius: 5px;
      border-right: 3px solid var(--smoky);
    }
  }
}
.btn-primary:hover{
  color: var(--black);

  &::after, &::before{
    border-color: var(--black);   
  }

  >span{
    &::after, &::before{
      border-color: var(--black);   
    }
  }
}
.btn-error:hover{
  color: crimson;

  &::after, &::before{
    border-color: crimson;   
  }

  >span{
    &::after, &::before{
      border-color: crimson;   
    }
  }
}

.input{
  border: none;
  border-bottom: 1px solid rgba(0,0,0,.15);
  text-align: left;
  text-overflow: ellipsis;
  transition: border-color .3s ease-in;
  &_error{
    border-bottom-color: rgba(crimson, .75)
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
    -webkit-appearance: none;
}

form{
  position: relative;
}
.error{
  font-size: .7em;
  color: crimson;
  width: 100%;
  text-align: left;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
}
</style>
