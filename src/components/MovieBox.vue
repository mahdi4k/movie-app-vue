<template>
    <router-link :to="movieLink">
        <div class="mb-10">
            <div class="flex m-5 mx-auto h-[285px] 2xl:w-[408px] border rounded-lg border-[#C4C4C4] bg-[#F1F1F1]">
                <img class="w-[45%] p-1 rounded-tl-lg rounded-bl-lg " :src="movieInfo.Image" alt="">
                <div class="flex flex-col ml-4 mt-3">
                    <p class="font-bold min-h-[48px] max-w-[80%]">{{movieInfo.Title}}</p>
                    <div class="flex mt-28 items-center">
                        <img src="../assets/calender.svg" alt="">
                        <p>{{movieInfo.ReleaseDate}}</p>
                    </div>
                    <div class="flex flex-wrap pb-4 mt-4">
                        <p class="genre-item flex items-center" v-for="tag in movieInfo.tags" :key="tag.id">
                            {{tag.name}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['movie-data', 'genre-list'],
    data() {
        return {
            movieInfo: {
                Image: `https://image.tmdb.org/t/p/original/${this.movieData.poster_path}`,
                Title: this.movieData.title,
                ReleaseDate: this.movieData.release_date,
                tags: this.genreList.filter(el => (this.movieData.genre_ids.includes(el.id)))
            },
            movieLink:`/movie/${this.movieData.id}`
        }
    },

}
</script>

<style>
.genre-item::after {
    content: "";
    width: 5px;
    height: 5px;
    background-color: black;
    border-radius: 50px;
    display: flex;
    margin-left: 5px;
    margin-right: 9px;
}

.genre-item:last-of-type::after {
    display: none;
}
</style>