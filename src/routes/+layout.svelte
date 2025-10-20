<script lang="ts">
  import '../styles/app.css';
  import { resolve } from '$app/paths';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.body.classList.add('dark');
  }

  function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark') ? 'dark' : 'light'
    );
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="navbar-wrap">
  <nav class="navbar">
    <div class="nav-left">
      <a href="{resolve('/')}" class="site-logo-link">
        <div class="site-logo"></div>
      </a>
    </div>

    <div class="nav-center">
      <a class="nav-link" href="{resolve('/leaderboard')}">Leaderboard</a>
      <a class="nav-link" href="{resolve('/datasets')}">Datasets</a>
      <a class="nav-link" href="{resolve('/tools')}">Tools</a>
      <a class="nav-link" href="{resolve('/rules')}">Rules</a>
      <a class="nav-link nav-link-extra" href="{resolve('/submit')}">Submit</a>
      <a class="nav-link" href="{resolve('/about_us')}">About Us</a>

      <!-- <div class="dropdown">
        <button class="dropbtn">Datasets ▼</button>
        <div class="dropdown-content">
          <a href="https://github.com/facebookresearch/TalkingWithHands32M" target="_blank">Talking with Hands</a>
          <a href="https://smpl-x.is.tue.mpg.de/index.html" target="_blank">SMPL-X</a>
          <a href="https://www.projectaria.com/datasets/nymeria/" target="_blank">Nymeria</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="dropbtn">Visualizers ▼</button>
        <div class="dropdown-content">
          <a href="{resolve('/BVHView/bvhview.html' as any)}" target="_blank">BVH View</a>
          <a href="https://github.com/TeoNikolov/genea_visualizer/tree/dev-2025" target="_blank">Blender</a>
        </div>
      </div>

      <a class="nav-link" href="{resolve('/submit')}">Submit</a> -->
    </div>

    <div class="nav-right">
      <button class="theme-toggle" on:click={toggleTheme}>
        🌙 / ☀️
      </button>
    </div>

  </nav>
</div>

<main class="container">
  {@render children?.()}
</main>