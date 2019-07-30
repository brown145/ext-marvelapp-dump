<article>
  <section>
    <AppHeader name={name} />
    <AppBody images={images} />
  </section>
  <section id="footer">
    <AppFooter />
  </section>
</article>

<script>
  export let name;

  import { onMount } from 'svelte';

  import 'sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';

  import browser from '../../utils/browser';
  import { activeTabQuery } from '../../utils/messaging';

  import AppHeader from './Header.svelte';
  import AppBody from './Body.svelte';
  import AppFooter from './Footer.svelte';

  let images = [];

  const updateImages = newImages =>
    images = newImages;

  onMount(async () => {
    browser.tabs.query(activeTabQuery, function(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {type: 'getImages'}, updateImages);
    });
  });
</script>

<style>
  article {
      width: 600px;
  }

  section {
    padding: 0px 5px;
  }

  #footer {
    background-color: #ddd;
    border-top: 1px solid #333;
    color: #666;
    margin-top: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
    text-align: right;
  }
</style>
