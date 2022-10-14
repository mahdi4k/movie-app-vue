<template>
    <div>
        <div class="flex justify-center w-[100%] h-[80px]" v-if="loading">
            <img src="../assets/loading.svg" alt="">
        </div>
        <div v-else class="relative container mt-20 mx-auto p-6">
            <div class="relative bg-[#E5E5E5] rounded-md pl-20 pr-20 py-8  container mx-auto p-6">
                <div class="flex items-center">
                    <router-link to="/">
                        <button class="text-white bg-[#549DF2] py-2 px-5 flex items-center rounded-3xl">
                            <img class="mr-2" src="../assets/back.svg" alt="">
                            <p>Back</p>
                        </button>
                    </router-link>
                    <div class="ml-10">
                        <p class="font-bold text-[18px]">{{movieInfo.title}}</p>
                        <p class="text-[18px]">{{movieInfo.tagline}}</p>
                    </div>

                </div>
            </div>

            <div class="flex mt-24">
                <img class="w-[45%] h-[700px] p-1 rounded-3xl " :src="moviePoster" alt="">
                <div class="flex w-[100%] mt-10 space-y-7 pl-20 pr-10 flex-col">
                    <div class="flex w-[100%] justify-between">
                        <p class="font-bold">Budget</p>
                        <p>${{formatPrice(movieInfo.budget)}}</p>
                    </div>
                    <div class="flex w-[100%] justify-between">
                        <p class="font-bold">Revenue</p>
                        <p>${{formatPrice(movieInfo.revenue)}}</p>
                    </div>
                    <div class="flex w-[100%] justify-between">
                        <p class="font-bold">Release Date</p>
                        <p>{{movieInfo.release_date}}</p>
                    </div>
                    <div class="flex w-[100%] justify-between">
                        <p class="font-bold">Runtime</p>
                        <p>{{timeConvert(movieInfo.runtime)}}</p>
                    </div>
                    <div class="flex w-[100%] justify-between">
                        <p class="font-bold">Score</p>
                        <div>
                            <star-rating v-bind:increment="0.1" v-bind:max-rating="5" :rating="movieInfo.vote_average/2"
                                inactive-color="#ccc" text-class="hidden" read-only active-color="#F0C20C"
                                v-bind:star-size="30">
                            </star-rating>
                            <p class="text-right mt-2 text-xs">{{movieInfo.vote_count}} vote</p>
                        </div>
                    </div>
                    <div class="flex w-[100%] justify-between">
                        <p class="font-bold">Genres</p>
                        <div class="flex">
                            <p class="genres-movie" v-for="item in movieInfo.genres" :key="item.id">
                                {{item.name}}
                            </p>
                        </div>
                    </div>
                    <div class="flex w-[100%] justify-between">
                        <p class="font-bold">IMDB Link</p>
                        <a class="underline text-blue-400 hover:text-blue-600" target="_blank"
                            :href="'https://www.imdb.com/title/'+movieInfo.imdb_id">Link</a>
                    </div>
                    <div class="flex w-[100%] justify-between">
                        <p class="font-bold">Homepage Link</p>
                        <a class="underline text-blue-400 hover:text-blue-600" target="_blank"
                            :href="movieInfo.homepage">Link</a>
                    </div>
                </div>
            </div>
            <div class="mt-16">
                <p>{{movieInfo.overview}}</p>
            </div>
            <div class="my-32">
                <p class="text-[18px] font-bold ml-1">Credit:</p>
                <div class="flex mt-3">
                    <p class="credit-movie" v-for="item in movieCredit" :key="item.id">
                        {{item.name}}
                    </p>
                    <span class="ml-1">
                        and {{movieCreditCount}} more.
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { HTTP } from '../http-common';
import StarRating from 'vue-star-rating'


export default {
    components: {
        StarRating
    },
    data() {
        return {
            movieInfo: {},
            movieCredit: [],
            moviePoster: '',
            movieCreditCount: '',
            loading: false,
        }
    },
    mounted() {
        this.getMovieInfo()
    },
    methods: {
        getMovieInfo() {
            this.loading = true
            HTTP.get(`/movie/${this.$route.params.id}`)
                .then(response => {
                    this.movieInfo = response.data;
                    this.moviePoster = `https://image.tmdb.org/t/p/original/${this.movieInfo.poster_path}`
                    this.getMovieCredit(this.movieInfo.id)
                    this.loading = false
                })
                .catch(e => {
                    console.log(e);
                })
        },
        getMovieCredit(id) {
            HTTP.get(`/movie/${id}/credits`)
                .then(response => {
                    let cast = response.data.cast
                    this.movieCredit = cast.slice(Math.max(cast.length - 10, 1))
                    this.movieCreditCount = cast.length

                })
                .catch(e => {
                    console.log(e);
                })
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "’")
        },
        timeConvert(n) {
            var num = n;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            return rhours + "h " + rminutes + "m";
        }
    }
}
</script>
<style>
.genres-movie::after,
.credit-movie::after {
    content: " , ";

}

.genres-movie:last-of-type::after,
.credit-movie:last-of-type::after {
    display: none;
    margin-right: 3px;
}
</style>