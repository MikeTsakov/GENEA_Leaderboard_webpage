<script lang="ts">
  import { onMount } from 'svelte';
  import LeaderboardTable from '$lib/components/LeaderboardTable.svelte';
  import { PUBLIC_SUPABASE_ANON_KEY, type LeaderboardRow } from '$lib/types';

  let rows: LeaderboardRow[] = [];
  let topRows: LeaderboardRow[] = [];

  const columnsToShow: (keyof LeaderboardRow)[] = ['id', 'model', 'team', 'val_f1'];

  // onMount(async () => {
  //   const res = await fetch('./data/results.json');
  //   rows = await res.json();

  //   // show only top 5 for homepage
  //   topRows = rows.slice(0, 5);
  // });

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
      rows = json.data ?? [];
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  });
</script>

<section class="home">
  <h2>What is GENEA</h2>
  <p style="font-size: 2em; padding-bottom:30px">
    Welcome to the GENEA Leaderboard project! This project is ...
  </p>

  <main class="leaderboard">
    <h2>Leaderboard</h2>
    <LeaderboardTable rows={rows} columns={columnsToShow} />
    <p><a href="/leaderboard">See full leaderboard →</a></p>
  </main>
  <!-- <ul>
    {#each rows as row}
      <li>{row.model} ({row.team}) - {row.val_f1}</li>
    {/each}
  </ul> -->
</section>