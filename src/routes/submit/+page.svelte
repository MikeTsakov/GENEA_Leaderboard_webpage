<script lang="ts">
  import { PUBLIC_SUPABASE_ANON_KEY } from '$lib/types';
  
  let team = "";
  let model = "";
  let file: File | null = null;
  function onFile(e) { file = e.target.files?.[0] ?? null; }

  async function submitForm() {
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
            Authorization: `Bearer ${PUBLIC_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      console.log('Submit response:', json);
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