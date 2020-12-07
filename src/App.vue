
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand"> Vue Tutorial from bezkoder.com </a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/tutorials" class="nav-link"> Tutorials </a>
        </li>
        <li class="nav-item">
          <a href="/add" class="nav-link"> Add </a>
        </li>
      </div>
      <div class="container-my-3">
        <router-view />
      </div>
    </nav>
  </div>
</template>

<script src="./app.ts"></script>
