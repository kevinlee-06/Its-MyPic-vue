<template>
  <AppBarComponent @update:searchQuery="updateSearchQuery" />

  <v-container class="fill-height" fluid>
    <v-responsive class="align-start fill-height mx-auto">
      <v-row class="text-center justify-center">
        <v-col v-for="(card, index) in showedCards" :key="card.segment_id" cols="auto">
          <CardComponent :frame_start="card.frame_start" :episode="card.episode" :text="card.text" />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>

  <FooterComponent />
</template>

<script setup lang="ts">
const cardsDataLoader = () => import('../assets/data/data.json')
type CardData = {
  segment_id: number;
  frame_start: number;
  frame_end: number;
  episode: string;
  text: string;
};

const updateSearchQuery = (query: string) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  filterCards(query);
};

import { ref, onMounted, onUnmounted } from "vue";

let cardsData: CardData[] = [];
const showedCards = ref<CardData[]>([]);
const filteredCards = ref(cardsData);
let currentIndex = 0;

const loadNextChunk = () => {
  const PreferChunkSize = 20;
  const cardsPerRow = Math.floor((window.innerWidth - 8) / 304);
  const rowsToLoad = Math.max(4, Math.floor(PreferChunkSize / cardsPerRow));
  const end = currentIndex + cardsPerRow * rowsToLoad;
  showedCards.value.push(...filteredCards.value.slice(currentIndex, end));
  // console.log(cardsPerRow, rowsToLoad);
  currentIndex = end;
};

const handleScroll = () => {
  if (1.3 * window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadNextChunk();
  }
};

onMounted(() => {
  cardsDataLoader().then((module) => {
    cardsData = module.default;
    filteredCards.value = cardsData;
    loadNextChunk();
  });
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// @ts-ignore
import { ConverterFactory } from 'opencc-js/core'; // primary code
// @ts-ignore
import cn from 'opencc-js/from/cn'; // dictionary
// @ts-ignore
import tw from 'opencc-js/to/tw'; // dictionary

const converter = ConverterFactory(cn, tw);

const filterCards = (query: string) => {
  if (query === "") {
    filteredCards.value = cardsData;
  } else {
    const temp: string = converter(query.toLowerCase().replace("你", "妳"));
    filteredCards.value = cardsData.filter((card) =>
      card.text.toLowerCase().replace("你", "妳").includes(temp)
    );
  }
  currentIndex = 0;
  showedCards.value = [];
  loadNextChunk();
};
</script>
