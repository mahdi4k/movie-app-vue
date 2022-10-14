<template>

  <div class="relative container mt-20 mx-auto p-6">
    <SearchBar/>
    <MovieList/>
  </div>  
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'
import MovieList from '@/components/MovieList.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    MovieList
  }
}
</script>
