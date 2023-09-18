<template>
  <div class="detail" v-if="game">
    <div class="container">
      <div class="detail_wrap">
        <div class="detail_info">
          <h1 class="detail_title">
            {{ game.name }}
          </h1>
          <div class="detail_rating">
            ★ {{ game.rating }}
          </div>
          <a :href="game.website" target="_blank" class="detail_link">
            {{ game.website }}
          </a>
        </div>
        <div class="detail_images">
          <img :src="game.background_image" :alt="game.name" class="detail_img">
        </div>
      </div>
      <p class="detail_description" v-html="game.description">
      </p>
    </div>
  </div>
</template>
<script>
import api from "../api"

export default {
  name: 'Detail',
  data() {
    return {
      game: null,
      loading: false
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.loading = true
      api.get(`/games/${this.$route.params.slug}`).then(res => {
        this.game = res.data
      })
      this.loading = false
    },
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding: 60px 0;

  &_title {
    font-size: 48px;
    margin-bottom: 12px;
  }

  &_rating {
      display: inline-block;
      font-weight: 900;   
      font-size: 18px; 
      margin-bottom: 12px;
  }

  &_wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  &_img {
    width: 100%;
  }
  &_link {
    display: block;
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
  &_description {
    margin-top: 40px;
    line-height: 1.5em;
  }
}

@media screen and (max-width: 768px) {
  .detail {
    &_wrap {
      grid-template-columns: 1fr;
    }
    &_title {
      font-size: 32px;
    }
  }
}
</style>