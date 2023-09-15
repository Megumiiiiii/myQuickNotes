<script setup>
import { useDarkMode } from "@vuepress/theme-default/lib/client/composables/index.js";

import { useI18NStr } from "../composables/useI18N";
import "add-to-calendar-button";

const darkMode = useDarkMode();
const get_i18n_str = useI18NStr();
</script>

<template>
  <a href="https://github.com/twilson63/permaweb-cookbook" target="_blank">
    <div class="topbar">
      <p>
        <span>{{ get_i18n_str("cookbook-source") }}</span>
      </p>
    </div>
  </a>
</template>

<style lang="scss" scoped>
@import "../styles/bootstrap.scss";

a {
  text-decoration: none !important;
  opacity: 1 !important;
}

.topbar {
  position: relative;
  z-index: 12;
  background: var(--c-topbar-bg);
  color: var(--c-text);
  text-align: center;
  padding: 8px;

  @include media-breakpoint-down(md) {
    padding: 3px 10px;
    padding-right: 3px;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.35rem;
    margin: 0;

    span {
      margin-right: 12px;
      line-height: 1.3;
      text-align: left;

      @include media-breakpoint-down(md) {
        font-size: 10px;
        margin: 0;
      }
    }

    .action {
      color: var(--c-accent-rose);
      white-space: nowrap;
      margin-left: 15px;
    }
  }

  &.hackathon {
    padding: 16px;

    background: linear-gradient(267.74deg,#5aaefd 2.41%,#e291ff 100.11%);
    background-size: 250% 250%;
    animation: gradient 15s ease infinite;

    @include media-breakpoint-down(md) {
      padding: 10px;
    }

    span {
      color: black;
      font-family: var(--font-family-alt);
      font-weight: 500;
      letter-spacing: -0.38px;

      @include media-breakpoint-down(md) {
        font-size: 13px;
      }
    }
  }
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>
