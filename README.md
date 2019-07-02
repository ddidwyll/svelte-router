# Svelte 3 simple router

Installation
```Bash
npm i -D svelte3-router
```

Example use
```Html
<pre>$router: {JSON.stringify($router, null, 2)}</pre>

<button on:click={() => router.go({ branch: 'order' })}>
  branch_order
</button>
<button on:click={() => router.go({ branch: 'fabric' })}>
  branch_fabric
</button>

<button on:click={() => router.go({ action: 'index' })}>
  action_index
</button>
<button on:click={() => router.go({ action: 'view' })}>
  action_view
</button>

<button on:click={() => router.go({ page: 1 })}>
  page_1
</button>
<button on:click={() => router.go({ page: null })}>
  page_null
</button>

<button on:click={() => router.go({ id: 1 })}>
  id_1
</Button>
<button on:click={() => router.go({ id: null })}>
  id_null
</Button>

<input
  on:input={e => router.go({ query: e.target.value })}
  value={$router.query}
  placeholder="query" />
<button on:click={() => router.go({ query: null })}>
  reset_search
</button>

<a href="/order/view?id=123">order_123</a>
<a href="/order/index?search=123">orders_search</a>
<a href="/order/index?search=(a:1, b:2)">orders_search</a>

<script>
  import router form 'svelte-router'
</script>
```
Then click some buttons. Look at url bar and $router object. Try to type "(a: 1, b: txt) qwerty" or something else in search input and look at result.
