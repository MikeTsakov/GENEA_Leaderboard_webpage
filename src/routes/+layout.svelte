<nav class="navbar">
  <button class="nav-item">Home</button>
  <button class="nav-item">Leaderboard</button>
  <div class="nav-item dropdown">
    <button class="dropbtn">Datasets ▼</button>
    <div class="dropdown-content">
      <a href="https://github.com/facebookresearch/TalkingWithHands32M" target="_blank">Talking with Hands</a>
      <a href="https://smpl-x.is.tue.mpg.de/index.html" target="_blank">SMPL-X</a>
      <a href="https://www.projectaria.com/datasets/nymeria/" target="_blank">Nymeria</a>
    </div>
  </div>
  <div class="nav-item dropdown">
    <button class="dropbtn">Visualizers ▼</button>
    <div class="dropdown-content">
      <!-- <button onclick={() => window.open('/visualizer/index.html', '_blank')}>BVH View</button> -->
      <a href="{resolve('/BVHView/bvhview.html' as any)}" target="_blank">BVH View</a>
      <a href="https://github.com/TeoNikolov/genea_visualizer/tree/dev-2025" target="_blank">Blender</a>
    </div>
  </div>
  <button class="nav-item">Submit</button>
</nav>

<script lang="ts">
  import '../app.css';
  import {resolve} from '$app/paths';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
