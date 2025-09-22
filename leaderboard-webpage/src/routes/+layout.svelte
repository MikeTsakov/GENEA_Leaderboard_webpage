<nav class="navbar">
  <button class="nav-item">Home</button>
  <button class="nav-item">Leaderboard</button>
  <div class="nav-item dropdown">
    <button class="dropbtn">Datasets ▼</button>
    <div class="dropdown-content">
      <a href="#">Talking with Hands</a>
      <a href="#">SMPL-X</a>
      <a href="#">Nymeria</a>
    </div>
  </div>
  <div class="nav-item dropdown">
    <button class="dropbtn">Visualizers ▼</button>
    <div class="dropdown-content">
      <a href="#">BVH View</a>
      <a href="#">Blender</a>
    </div>
  </div>
  <button class="nav-item">Submit</button>
</nav>

<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  
  let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
