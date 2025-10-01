<!-- <script lang="ts">
  let team = "";
  let model = "";
  let date = "";
  let comment = "";
  let file: File | null = null;

  function handleSubmit(e) {
    e.preventDefault();
    // Right now we’ll just log the submission
    date = Date();
    console.log({ team, model, date, comment });
    alert("Submission received!");
  }

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      file = target.files[0];
    }
  }

  let { data } = $props();
</script>

<section class="submit">
  <h1>Submit Your Entry</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Team name:
      <input type="text" bind:value={team} required />
    </label>

    <label>
      Model name:
      <input type="text" bind:value={model} required />
    </label>

    <label>
      Comment:
      <textarea bind:value={comment} rows="4"></textarea>
    </label>

    <label>
      Upload PDF:
      <input type="file" name="file" accept="application/pdf" on:change={handleFileChange}/>
    </label>

    <button type="submit">Submit</button>
  </form>

  <ul>    
    {#each data.instruments as instrument}
    <li>{instrument.name}</li>
    {/each}  
  </ul>
</section> -->


<!-- <script>
  // optional: you can control iframe styles or dimensions
</script>

<h1>Submit Your Model</h1>

<div class="form-container">
  <iframe 
    src="https://forms.gle/6STveugNwMPZ1Dh7A" 
    width="100%" 
    height="800"
    frameborder="0" 
    marginheight="0" 
    marginwidth="0">
    Loading…
  </iframe>
</div>

<style>
  .form-container {
    max-width: 800px;
    margin: 0 auto;
  }
</style> -->


<!-- <script lang="ts">
  let team = '';
  let model = '';
  let file: File | null = null;
  function onFile(e) { file = e.target.files?.[0] ?? null; }
</script> -->



<script lang="ts">
  import { onMount } from 'svelte';
  import LeaderboardTable from '$lib/components/LeaderboardTable.svelte';
  import { SUPABASE_ANON_KEY, type LeaderboardRow } from '$lib/types';
  
  let rows: LeaderboardRow[] = [];
  let team = "";
  let model = "";
  let file: File | null = null;
  function onFile(e) { file = e.target.files?.[0] ?? null; }

  async function submitForm(e: Event) {
    try {
      const payload = {
        team,
        model
      };

      const res = await fetch(
        'https://ctwfyjhvheylawtxrvdq.supabase.co/functions/v1/submit-leaderboard',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      console.log('Submit response:', json);

      // optionally refresh leaderboard after submit
      rows = [...rows, ...json.data];
      team = "";
      model = "";
      file = null;
    } catch (err) {
      console.error('Failed to submit:', err);
    }
  }
</script>

<form on:submit={submitForm}>
  <label>Team <input name="team" bind:value={team} /></label>
  <label>Model <input name="model" bind:value={model} /></label>
  <label>PDF <input type="file" name="file" accept="application/pdf" on:change={onFile} /></label>

  <button type="submit">Submit</button>
</form> 