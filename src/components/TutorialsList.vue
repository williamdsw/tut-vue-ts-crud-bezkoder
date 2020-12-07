
<template>
    <article class="box w-100 shadow-lg p-3 border">
        <header>
            <h1 class="text-center"> Tutorials </h1>
        </header>

        <hr>

        <section v-if="serverResponse.message">
            <header class="text-white p-2 shadow" :class="`bg-${serverResponse.colorClass}`">
                <h3 class="text-center"> {{ serverResponse.message }} </h3>
            </header>

            <hr>
        </section>

        <section class="row">
            <div class="col-12">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Search by title" v-model="title">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-secondary" @click="search();">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <hr>

        <section class="row" v-if="tutorialsCount !== 0">
            <div class="col-md-8">
                <ul class="list-group">
                    <li class="list-group-item" :class="{ active: index == currentIndex }"
                        v-for="(tutorial, index) in tutorials" :key="index"
                        @click="setActiveTutorial(tutorial, index);">
                        {{ tutorial.title }}
                    </li>
                </ul>

                <button class="btn btn-sm btn-danger m-3" @click="removeAllTutorials();">
                    Remove All
                </button>
            </div>
            <div class="col-md-4">
                <div v-if="currentTutorial.id !== -1">
                    <p class="font-weight-bold"> {{ currentTutorial.title }} </p>
                    <p class="font-italic"> {{ currentTutorial.description }} </p>
                    <p :class="{ 'text-success': currentTutorial.published, 'text-secondary': !currentTutorial.published }"> 
                        {{ currentTutorial.published ? 'Published': 'Pending' }} 
                    </p>
                    <a class="badge badge-warning p-2" :href="'/tutorials/' + currentTutorial.id"> 
                        Edit 
                    </a>
                </div>
                <div v-else>
                    <p class="font-weight-bold"> Please click on a tutorial... </p>
                </div>
            </div>
        </section>

        <section v-else-if="tutorialsCount === 0">
            <header>
                <h3 class="text-center text-primary">
                    Nothing was found!
                </h3>
            </header>
        </section>
    </article>
</template>

<script lang="ts">
    import ServerResponse from '@/models/ServerResponse';
    import Tutorial from '@/models/tutorial';
    import { Component, Vue} from 'vue-property-decorator';
    import service from '../services/tutorial.service';

    @Component
    export default class TutorialsList extends Vue {

        private tutorials: Tutorial[] = [];
        private currentTutorial: Tutorial;
        private currentIndex = -1;
        private title = '';
        private serverResponse: ServerResponse = { message: '' }
        private tutorialsCount = 0;

        constructor() {
            super();
            this.currentTutorial = { title: '', description: '', id: -1, published: false  };
        }

        public retrieveTutorials(): void {
            service.findAll().then((response => {
                this.tutorials = response.data;
                this.tutorialsCount = this.tutorials.length;
            })).catch(error => {
                this.tutorials = [];
                this.tutorialsCount = 0;
                this.serverResponse.message = error.message || 'Error!';
                this.serverResponse.colorClass = 'danger';
            });
        }

        public refreshList(): void {
            this.retrieveTutorials();
            this.currentTutorial = { id: -1, title: '', description: '', published: false };
            this.currentIndex = -1;
        }

        public setActiveTutorial(tutorial: Tutorial, index: number): void {
            this.currentTutorial = tutorial;
            this.currentIndex = index;
        }

        public removeAllTutorials(): void {
            service.deleteAll().then(response => {
                this.serverResponse = response.data;
                this.serverResponse.colorClass = 'success';
                this.refreshList();
            }).catch(error => {
                this.tutorials = [];
                this.tutorialsCount = 0;
                this.serverResponse.message = error.message || 'Error!';
                this.serverResponse.colorClass = 'danger';
            });
        }

        public search(): void {
            service.findByTitle(this.title).then(response => {
                this.tutorials = response.data;
                this.tutorialsCount = this.tutorials.length;
            })
            .catch(error => {
                this.tutorials = [];
                this.tutorialsCount = 0;
                this.serverResponse.message = error.message || 'Error!';
                this.serverResponse.colorClass = 'danger';
            });
        }

        mounted() {
            this.retrieveTutorials();
        }
    }
</script>