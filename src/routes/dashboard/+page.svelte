<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="lg:col-span-3">
  <Card.Root>
    <Card.Header>
      <Card.Title>Welcome to Your Dashboard</Card.Title>
      <Card.Description>
        This is your main dashboard overview. Select an option from the sidebar to view specific sections.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <p>Here you can add overview statistics, recent activity, or quick access links.</p>
    </Card.Content>
    <Card.Footer>
      <Button>Get Started</Button>
    </Card.Footer>
  </Card.Root>
</div>
