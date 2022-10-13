<template>
    <div>
        <div class="mt-32 flex flex-col md:flex-row  flex-wrap">
            <div class="flex justify-center w-[100%] h-[80px]" v-if="loading">
                <img src="../assets/loading.svg" alt="">
            </div>
            <MovieBox v-for="data in movieList" :key="data.id" :genre-list="genreList" :movie-data="data"
                class="w-1/3" />
        </div>
        
    </div>
</template>

<script>
import MovieBox from '@/components/MovieBox.vue'
import { HTTP } from '../http-common';

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
        this.getMoveList()
        this.getGenreList()
    },
    methods: {
        getMoveList(pageNumber) {
            this.loading = true
            let page = pageNumber ? `?page=${pageNumber}` : '';
            this.scrollToTop();
            HTTP.get(`/discover/movie${page}`)
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
                this.getMoveList(pervPage)
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPage) {
                let nextPage = Number(this.currentPage) + 1
                this.startResultNumber = this.startResultNumber + this.totalRow
                this.endResultNumber = this.endResultNumber + this.totalRow
                this.getMoveList(nextPage)
            }
        }
    }
}
</script>

<style>

</style>