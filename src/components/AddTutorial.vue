
<template>
    <article class="box w-100 shadow-lg p-3 border">
        <header>
            <h1 class="text-center"> New Tutorial </h1>
        </header>

        <hr>

         <div class="p-2" v-if="!wasSubmitted">
            <div class="row" v-if="errorMessage">
                <div class="col-12">
                    <header class="bg-danger text-white p-2 shadow">
                        <h2 class="text-center"> {{ errorMessage }} </h2>
                    </header>

                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="titleInput" class="font-weight-bold"> * Title </label>
                        <input type="text" id="titleInput" class="form-control" required v-model="tutorial.title">
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="form-group">
                        <label for="descriptionInput" class="font-weight-bold"> * Description </label>
                        <input type="text" id="descriptionInput" class="form-control" required v-model="tutorial.description">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button type="submit" class="btn btn-success float-right" @click="saveTutorial();">
                        Submit
                    </button>
                </div>
            </div>
        </div>

        <div v-else>
            <header class="bg-success text-white p-2 shadow">
                <h4 class="text-center"> You submitted successfully! </h4>
            </header>

            <hr>

            <div class="row">
                <div class="col-12">
                    <button type="button" class="btn btn-primary float-right" @click="newTutorial();">
                        Add New Tutorial
                    </button>
                </div>
            </div>
        </div>
    </article>
</template>

<script lang="ts">
    import Tutorial from '@/models/tutorial';
    import { Component, Vue } from 'vue-property-decorator';
    import service from '../services/tutorial.service';

    @Component
    export default class AddTutorial extends Vue {

        private tutorial: Tutorial = {
            title: '',
            description: '',
            published: false
        };

        private wasSubmitted = false;
        private errorMessage = '';

        public saveTutorial(): void {
            if (this.tutorial.title === '') {
                alert('Please inform the title!');
                return;
            }

            if (this.tutorial.description === '') {
                alert('Please inform the description!');
                return;
            }

            service.create(this.tutorial).then(response => {
                this.tutorial.id = response.data.id;
                this.wasSubmitted = true;
            }).catch(error =>  this.errorMessage = error.message);
        }

        public newTutorial(): void {
            this.wasSubmitted = false;
            this.tutorial = {
                title: '', description: '', published: false
            };
        }
    }
</script>