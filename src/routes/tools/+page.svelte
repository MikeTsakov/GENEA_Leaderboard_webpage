<script lang="ts">
  import { onMount } from 'svelte';
  import { resolve } from '$app/paths';
  import { PUBLIC_SUPABASE_ANON_KEY, type LeaderboardRow } from '$lib/types';

  let rows: LeaderboardRow[] = [];

  onMount(async () => {
    try {
      const res = await fetch(
        'https://ctwfyjhvheylawtxrvdq.supabase.co/functions/v1/get-leaderboard',
        {
          headers: {
            Authorization: `Bearer ${PUBLIC_SUPABASE_ANON_KEY}`
          }
        }
      );
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      console.log('Leaderboard raw data:', json);
      rows = (json.data ?? []).map((row: LeaderboardRow) => ({
        ...row,
        submitted: new Date(row.submitted).toLocaleString(),
      }));
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  });
</script>

<main class="subcontainer">
  <div class="home-split-ver">
    <!-- Left column: Text content -->
    <div class="home-text card">
      <h1 class="h1">BVHView</h1>
      <p class="lead">
        Welcome to the <strong>GENEA Leaderboard</strong> project!  
        This platform provides a unified evaluation hub for gesture generation and animation research.
        Here you can explore state-of-the-art models, compare team results, and discover available datasets
        to help you get started.
      </p>
      <a href="{resolve('/BVHView/bvhview.html' as any)}" target="_blank" class="links">BVH View</a>
      <p>
        Whether you're a researcher or a developer, our mission is to make gesture evaluation
        more open, transparent, and comparable across projects.
      </p>
    </div>

    <div class="home-text card">
      <h1 class="h1">Blender</h1>
      <p class="lead">
        Welcome to the <strong>GENEA Leaderboard</strong> project!  
        This platform provides a unified evaluation hub for gesture generation and animation research.
        Here you can explore state-of-the-art models, compare team results, and discover available datasets
        to help you get started.
      </p>
      <a href="https://github.com/TeoNikolov/genea_visualizer/tree/dev-2025" target="_blank" class="links">Blender</a>
      <p>
        Whether you're a researcher or a developer, our mission is to make gesture evaluation
        more open, transparent, and comparable across projects.
      </p>
    </div>
  </div>
</main>