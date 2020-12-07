
<template>
    <article class="box w-100 shadow-lg p-3 border" v-if="currentTutorial">
        <header>
            <h1 class="text-center"> Tutorial </h1>
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
                        <input type="text" id="titleInput" class="form-control" required v-model="currentTutorial.title">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="descriptionInput" class="font-weight-bold"> * Description </label>
                        <input type="text" id="descriptionInput" class="form-control" required v-model="currentTutorial.description">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label class="font-weight-bold"> Status:  </label>
                        <input type="text" class="form-control" :value="currentTutorial.published ? 'Published': 'Pending'" readonly tabindex="-1">
                    </div>
                </div>
            </div>

            <hr>

            <div class="row">
                <div class="col-lg-2 col-md-3" v-if="currentTutorial.published">
                    <button type="button" class="btn btn-primary w-100" @click="updatePublished(false);">
                        Unpublish
                    </button>
                </div>
                <div class="col-lg-2 col-md-3" v-if="!currentTutorial.published">
                    <button type="button" class="btn btn-primary w-100" @click="updatePublished(true);">
                        Publish
                    </button>
                </div>
                <div class="col-lg-2 col-md-3">
                    <button type="button" class="btn btn-danger w-100" @click="deleteTutorial();">
                        Delete
                    </button>
                </div>
                <div class="col-lg-2 col-md-3">
                    <button type="button" class="btn btn-success w-100" @click="updateTutorial();">
                        Update
                    </button>
                </div>
            </div>
        </div>

        <div v-if="message">
            <header class="bg-info text-white p-2 shadow">
                <h4 class="text-center"> {{ message }} </h4>
            </header>
        </div>
    </article>

    <section v-else>
        <p class="font-weight-bold"> Please click on a Tutorial ... </p>
    </section>
</template>

<script lang="ts">
    import Tutorial from '@/models/tutorial';
    import { Component, Vue } from 'vue-property-decorator';
    import service from '../services/tutorial.service';

    @Component
    export default class AddTutorial extends Vue {

        private currentTutorial: Tutorial = {
            id: -1,
            title: '',
            description: '',
            published: false
        };

        private wasSubmitted = false;
        private errorMessage = '';
        private message = '';

        public getTutorial(id: string): void {
            service.findById(id).then(response => {
                this.currentTutorial = response.data;
                this.errorMessage = '';
                this.message = '';
            }).catch (error => {
                this.errorMessage = error.message || 'Error!';
                this.message = '';
            });
        }

        public updatePublished(status: boolean): void {
            if (this.currentTutorial.title === '') {
                alert('Please inform the title!');
                return;
            }

            if (this.currentTutorial.description === '') {
                alert('Please inform the description!');
                return;
            }

            const id = this.currentTutorial.id;
            if (!id) {
                alert('Invalid id!');
                return;
            }

            this.currentTutorial.published = status;
            service.update(id, this.currentTutorial).then(() => this.$router.push({ name: 'tutorials' }))
            .catch(error => this.errorMessage = error.message);
        }

        public updateTutorial(): void {
            if (this.currentTutorial.title === '') {
                alert('Please inform the title!');
                return;
            }

            if (this.currentTutorial.description === '') {
                alert('Please inform the description!');
                return;
            }

            const id = this.currentTutorial.id;
            if (!id) {
                alert('Invalid id!');
                return;
            }

            service.update(id, this.currentTutorial).then(() => this.$router.push({ name: 'tutorials' }))
            .catch(error => this.errorMessage = error.message);
        }

        public deleteTutorial(): void {
            const id = this.currentTutorial.id;
            if (!id) {
                alert('Invalid id!');
                return;
            }

            service.deleteById(id).then(() => this.$router.push({ name: 'tutorials' }))
            .catch(error => this.errorMessage = error.message);
        }

        mounted() {
            const id = this.$route.params.id;
            if (!id) {
                this.$router.push({ name: 'tutorials' });
                return;
            }

            this.getTutorial(id);
        }
    }
</script>
