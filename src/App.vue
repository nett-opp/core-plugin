<script setup lang="ts">
console.log("env", import.meta.env);
console.log("WP_DATA", (window as any).WP_DATA || {});
</script>

<template>
    <div class="plugin">
        <img src="@/assets/nett-opp-it-logo.png" alt="" />
        <h1>Core Plugin</h1>
        <p>Open console (F12) for more info...</p>
    </div>
</template>

<style lang="scss" scoped>
.plugin {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    img {
        width: 500px;
    }
    h1 {
        color: $primary-text-color;
        font-size: 2em;
    }
    p {
        color: $secondary-text-color;
        font-size: 1em;
    }
}
</style>
