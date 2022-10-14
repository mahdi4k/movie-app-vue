<template>
    <div>
        <div class="mt-32 flex flex-col md:flex-row  flex-wrap">
            <div class="flex justify-center w-[100%] h-[80px]" v-if="loading">
                <img src="../assets/loading.svg" alt="">
            </div>
            <MovieBox v-for="data in movieList" :key="data.id" :genre-list="genreList" :movie-data="data"
                class="w-1/3" />
        </div>
        <div class="flex flex-col items-center justify-center mt-20 mb-16">
            <div class="flex items-center justify-center divide-slate-600 divide-x">
                <p @click="prevPage" :class="currentPage > 1 ?'!text-blue-500 cursor-pointer' : ''"
                    class="mr-5 text-slate-500 font-bold">Previous Page</p>
                <p @click="nextPage" :class="currentPage < totalPage ?'!text-blue-500 cursor-pointer' : ''"
                    class="pl-5  text-slate-500 font-bold">Next Page</p>
            </div>
            <div>
                <p class="text-neutral-500 mt-6">Showing results {{startResultNumber}}-{{endResultNumber}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import MovieBox from '@/components/MovieBox.vue'
import { HTTP } from '../http-common';
import { bus } from '../main';

export default {
    components: { MovieBox },
    data() {
        return {
            movieList: [],
            genreList: [],
            currentPage: Number,
            totalPage: Number,
            totalRow: 20,
            startResultNumber: 1,
            endResultNumber: 20,
            loading: false,
        }
    },
    mounted() {
        this.getMovieList()
        this.getGenreList()
        bus.$on('date', (data) => {
            this.getMovieList('',data)
        })
    },
    methods: {
        getMovieList(pageNumber,filter) {
            this.loading = true
            let page = pageNumber ? `page=${pageNumber}` : '';
            let filterDate = filter ? `&release_date.gte=${filter.startDate}&release_date.lte=${filter.endDate}` : ''
            this.scrollToTop();
            HTTP.get(`/discover/movie?${page}${filterDate}`)
                .then(response => {
                    this.loading = false;
                    this.movieList = response.data.results;
                    this.currentPage = response.data.page;
                    this.totalPage = response.data.total_pages;
                })
                .catch(e => {
                    console.log(e);
                })
        },
        getGenreList() {
            HTTP.get(`/genre/movie/list`)
                .then(response => {
                    this.genreList = response.data.genres
                })
                .catch(e => {
                    console.log(e);
                })
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        prevPage() {
            if (this.currentPage > 1) {
                let pervPage = Number(this.currentPage) - 1
                this.startResultNumber = Number(this.startResultNumber) - Number(this.totalRow)
                this.endResultNumber = Number(this.endResultNumber) - Number(this.totalRow)
                this.getMovieList(pervPage)
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPage) {
                let nextPage = Number(this.currentPage) + 1
                this.startResultNumber = this.startResultNumber + this.totalRow
                this.endResultNumber = this.endResultNumber + this.totalRow
                this.getMovieList(nextPage)
            }
        }
    }
}
</script>

<style>

</style>