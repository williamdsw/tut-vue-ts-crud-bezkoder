
<template>
    <article class="mx-auto my-5">
        <header class="text-center">
            <h1 class="display-1"> 404 </h1>
            <hr>
            <h6 class="display-4"> 
                Oooops... the link you're looking for could not be found!
            </h6>
        </header>
    </article>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class NotFound extends Vue {}
</script>
