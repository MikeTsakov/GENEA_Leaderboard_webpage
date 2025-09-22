<script lang="ts">
  import { onMount } from 'svelte';

  interface LeaderboardRow {
    model: string
    team: string
    val_f1: number
    val_mse: number
    submitted: Date
  }

  let rows: LeaderboardRow[] = []
  let q = '';

  onMount(async () => {
    const res = await fetch('./data/results.json');
    rows = await res.json();
  });

  $: filtered = rows
    .filter(r =>
      [r.model, r.team].some(v => (v || '').toLowerCase().includes(q.toLowerCase()))
    )
    .sort((a, b) => (b.val_f1 ?? 0) - (a.val_f1 ?? 0));
</script>

<main class="leaderboard">
  <h1 class="h1">GENEA Leaderboard</h1>
  <input placeholder="Search..." bind:value={q} />

  <table>
    <thead>
      <tr>
        <th>#</th><th>Model</th><th>Team</th><th>Val F1</th><th>Val MSE</th><th>Submitted</th>
      </tr>
    </thead>
    <tbody>
      {#each filtered as r, i}
      <tr>
        <td class="rank">{i + 1}</td>
        <td class="model">{r.model}</td>
        <td class="team">{r.team}</td>
        <td class="score">{r.val_f1}</td>
        <td class="score">{r.val_mse}</td>
        <td class="date">{r.submitted}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</main>