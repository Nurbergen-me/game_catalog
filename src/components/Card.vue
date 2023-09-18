<template>
  <router-link :to="{name: 'detail', params: {'slug': game.slug}}" class="card">
    <div class="card_header">
        <img :src="game.background_image" :alt="game.name">
    </div>
    <div class="card_body">
        <h3 class="card_title">
            {{ game.name }}
        </h3>
        <span class="card_rating"> 
            Rating: ★ {{ game.rating }}
        </span>
        <div class="card_date">
            {{ formatDate(game.updated) }}
        </div>
    </div>
  </router-link>
</template>

<script>
export default {
    name: 'Card',
    props: ['game'],
    

    methods: {
        formatDate(date){
            let formatted = new Date(date)
            return formatted.toLocaleDateString('ru-RU')
        },
    }
}
</script>

<style lang="scss" scoped>
.card {
    background-color: #202020;
    border-radius: 12px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.07);
    overflow: hidden;
    transition: 0.5s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.04);
    }

    &_header {
        aspect-ratio: 16 / 9;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &_body {
        padding: 16px;
    }
    &_title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 12px;
    }
    &_rating {
        display: inline-block;
        font-weight: 900;    
        margin-bottom: 8px;
    }
    &_date {
        opacity: 0.5;
        font-size: 14px;
    }
}
</style>