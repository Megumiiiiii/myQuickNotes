<script setup>
import Home from "@theme/Home.vue";
import Topbar from "../components/Topbar.vue";
import Navbar from "../components/Navbar.vue";
import Page from "../components/Page.vue";
import Sidebar from "../components/Sidebar.vue";
import Onboarding from "../components/Onboarding.vue";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from "@vuepress/theme-default/lib/client/composables/index.js";
import { useI18NStr } from "../composables/useI18N";

const page = usePageData();
const frontmatter = usePageFrontmatter();
const themeLocale = useThemeLocaleData();

const get_i18n_str = useI18NStr();

// onboardig
const shouldShowOnboarding = computed(
  () => frontmatter.value.onboarding === true
);

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
);

// sidebar
const sidebarItems = useSidebarItems();
const isSidebarOpen = ref(false);
const toggleSidebar = (to) => {
  isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
};
const touchStart = { x: 0, y: 0 };
const onTouchStart = (e) => {
  touchStart.x = e.changedTouches[0].clientX;
  touchStart.y = e.changedTouches[0].clientY;
};
const onTouchEnd = (e) => {
  const dx = e.changedTouches[0].clientX - touchStart.x;
  const dy = e.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }
  }
};

// classes
const containerClass = computed(() => [
  {
    "no-navbar": !shouldShowNavbar.value,
    "no-sidebar": !sidebarItems.value.length,
    "sidebar-open": isSidebarOpen.value,
  },
  frontmatter.value.pageClass,
]);

// close sidebar after navigation
let unregisterRouterHook;
onMounted(() => {
  const router = useRouter();
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false);
  });
});
onUnmounted(() => {
  unregisterRouterHook();
});

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise();
const onBeforeEnter = scrollPromise.resolve;
const onBeforeLeave = scrollPromise.pending;
</script>

<template>
  <Topbar />
  <Navbar
    v-if="shouldShowNavbar"
    class="fixed"
    :fixed="true"
    @toggle-sidebar="toggleSidebar"
  >
    <template #before>
      <slot name="navbar-before" />
    </template>
    <template #after>
      <slot name="navbar-after" />
    </template>
  </Navbar>
  <div
    class="cookbook-theme-container container-xxl"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Onboarding v-if="shouldShowOnboarding" />

    <div class="row">
      <div class="col-12">
        <h2
          id="documentation"
          class="header"
          style="border: none; padding-top: 30px; margin: 20px 0 25px"
        >
          {{ get_i18n_str("documentation", "Documentation") }}
        </h2>
      </div>

      <div class="col-md-3">
        <Sidebar @close-sidebar="toggleSidebar(false)">
          <template #top>
            <slot name="sidebar-top" />
          </template>
          <template #bottom>
            <slot name="sidebar-bottom" />
          </template>
        </Sidebar>
      </div>

      <div class="col-12 col-md-9">
        <slot name="page">
          <Home v-if="frontmatter.home" />

          <Transition
            v-else
            name="fade-slide-y"
            mode="out-in"
            @before-enter="onBeforeEnter"
            @before-leave="onBeforeLeave"
          >
            <Page :key="page.path">
              <template #top>
                <slot name="page-top" />
              </template>
              <template #content-top>
                <slot name="page-content-top" />
              </template>
              <template #content-bottom>
                <slot name="page-content-bottom" />
              </template>
              <template #bottom>
                <slot name="page-bottom" />
              </template>
            </Page>
          </Transition>
        </slot>
      </div>
    </div>

    <p class="footer-text">
      <span>{{
        frontmatter.locale === "id" ? "Dibuat dengan " : "Built with "
      }}</span>
      <span class="heart">&#x1f499;&#65039;</span>
      <span>{{
        frontmatter.locale === "id"
          ? " dari komunitas Arweave. Pelajari lebih lanjut di "
          : " by the Arweave community. Learn more at "
      }}</span>
      <a target="_blank" href="https://arweave.org">Arweave.org</a>
      <div id="header" align="center">
          <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzNmZTIxZmE3ZmY3MzRiMDcwNDJhYTQ5ZmNlY2YxMWE1OWIyYmVkNSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/mVBlqOD4ra9jQiI3cC/giphy.gif" height="125" width="420"/>
      </div>
    </p>
  </div>
</template>

<style lang="scss">
@import "../styles/bootstrap.scss";

.cookbook-theme-container {
  @include media-breakpoint-up(md) {
    padding-left: var(--bs-gutter-x);
    padding-right: var(--bs-gutter-x);
  }

  .footer-text {
    margin: var(--bs-gutter-x) 0 calc(var(--bs-gutter-x) * 0.5);
    text-align: center;
    color: var(--c-text);

    *:not(.heart):not(a) {
      opacity: 0.3;
    }
  }
}
</style>
