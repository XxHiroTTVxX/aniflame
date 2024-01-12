<script lang="ts" setup>
  import "~/assets/css/main.css";
  import "~/assets/css/header.css";
  import "~/assets/css/pages.css";

</script>
<template>
    <header class="header-area header-sticky">
    <div class="container">
      <div class="row">
        <div class="col-12">
            <Header />
        </div>
      </div>
    </div>
  </header>
  <slot />

  <footer>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <nav class="footer-nav" aria-label="Footer">
            <div class="nav-item">
              <a class="nav-link" href=https://dsc.gg/rubynetwork>Discord</a>
            </div>
            <div class="nav-item">
              <a class="nav-link" href="/dmca">DMCA</a>
            </div>
            <div class="nav-item">
              <a class="nav-link" href="/privacy">Privacy</a>
            </div>
            <div class="nav-item">
              <a class="nav-link" href="/terms">Terms</a>
            </div>
            <div class="nav-item">
              <a class="nav-link" href="/about">About</a>
            </div>
          </nav>
  
          <p class="footer-text">
            Copyright &copy; 2023 <a href="https://github.com/VaultGearStudios"
              >Vault Gear Studios</a
            >
            and <a href="https://rubynetwork.tech">Ruby Network</a>. All rights
            reserved
  
            <br />
  
            This site does not store any files on its server. All contents are
            provided by non-affiliated third parties.
  
            <br />
  
            <a href="https://www.gnu.org/licenses/">
              <img
                src="/assets/images/GPLv3-Red.svg"
                alt="Free as in Freedom"
                class="img-fluid foss-software"
              />
            </a>
          </p>
        </div>
      </div>
    </div>
    <p>Contact us: <a href="mailto:support@example.com">support@example.com</a></p>
  </footer>
</template>