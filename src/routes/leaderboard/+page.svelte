<script lang="ts">
  import { onMount } from 'svelte';
  import LeaderboardTable from '$lib/components/LeaderboardTable.svelte';
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

<main class="leaderboard">
  <h2>Leaderboard</h2>
  <LeaderboardTable rows={rows} />
</main>