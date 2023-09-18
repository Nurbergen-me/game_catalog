<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header_nav">
          <div class="header_logo">
            Games
          </div>
          <div class="header_search">
            <input v-model="search" type="text" placeholder="search">
          </div>
          <div class="header_space"></div>
        </div>
      </div>
    </header>
    <section class="catalog" id="catalog">
      <div class="container">
        <h1 class="catalog_title">
          New and trending
        </h1>
        <div class="catalog_desc">
          Based on player counts and release date
        </div>
        <div class="catalog_filters">
          <button 
            class="catalog_filter" 
            @click="sortListBy('released')" 
            :class="{'active': sortBy === 'released'}"
          >
            <span>
              {{ sortDesc ? '↓' : '↑' }}
            </span>
            Release date
          </button>
          <button 
            class="catalog_filter" 
            @click="sortListBy('rating')" 
            :class="{'active': sortBy === 'rating'}"
          >
            <span>
              {{ sortDesc ? '↓' : '↑' }}
            </span>
            Rating
          </button>
        </div>
        <div class="catalog_wrap">
          <Card v-for="game in games" :game="game" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Card from '../components/Card.vue'
import api from "../api"

export default {
  name: 'Home',
  components: {
    Card
  },
  data() {
    return {
      games: [],
      search: '',
      page: 1,
      sortBy: '',
      sortDesc: true,
      loading: false,
      delaySearch: null,
    }
  },
  mounted() {
    this.getResults()
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        console.log("bottom");
        this.loadMore()
      }
    })
  },
  watch: {
    'search'(newVal,oldVal) {
      clearTimeout(this.delaySearch)
      this.delaySearch = setTimeout(() => {
        this.page = 1
        this.games.splice(0)
        console.log(this.search)
        this.getResults()
      }, 1000);
    }
  },
  methods: {
    getResults() {
      this.loading = true
      api.get(`/games?page=${this.page}&search=${this.search}&ordering=${(this.sortDesc ? '-' : '') + this.sortBy}`).then(res => {
        this.games.push(...res.data.results)
      })
      this.loading = false
    },
    loadMore() {
      if (!this.loading) {
        this.page++
        this.getResults()
      }
    },
    sortListBy(sort) {
      if (sort !== this.sortBy) {
          this.sortBy = sort
          this.sortDesc = true
      } else {
          this.sortDesc = !this.sortDesc
      }
      this.page = 1
      this.games.splice(0)
      this.getResults()
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  &_nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
  }
  &_logo {
    font-weight: 900;
    font-size: 28px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  &_search {
    width: 60%;

    input {
      height: 44px;
      width: 100%;
      border-radius: 24px;
      font-size: 14px;
      padding: 0 12px 0 38px;
      line-height: 14px;
      border: none;
    }
  }
  &_space {
    width: 10%;
  }
}
.catalog {
  padding-top: 24px;
  padding-bottom: 60px;

  &_desc {
    margin-bottom: 24px;
  }

  &_wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    margin-top: 24px;
  }
  &_filters {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
  }
  &_filter {
    width: auto;
    // min-width: 150px;
    padding: 10px 16px;
    background-color: #2b2b2b;
    border-radius: 8px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    opacity: 0.5;
    cursor: pointer;

    span {
      display: none;
    }

    &.active {
      opacity: 1;
      font-weight: 700;

      span {
        display: inline;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .catalog {
    &_wrap {
      grid-template-columns: 1fr 1fr;
    }
  }
}

@media screen and (max-width: 768px) {
  .header {
    &_nav {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }
    &_search {
      width: 100%;
    }
    &_space {
      display: none;
    }
  }
  .catalog {
    &_wrap {
      grid-template-columns: 1fr;
    }
  }
}
</style>
