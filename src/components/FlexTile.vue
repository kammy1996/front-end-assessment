<template>
    <div class="flex-tile">
        <div>
            <div>
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .flex-tile {
        width: 100%;
        box-sizing: border-box;
    }

    .flex-tile>div {
        margin: .5em;
        padding: .5em;
        height: 250px;
    }

    .flex-tile>div>div {
        overflow-y: auto;
        height: 100%;
    }
</style>

<style>
    .flex-tile h3 {
        margin-top: .25em;
    }
</style>